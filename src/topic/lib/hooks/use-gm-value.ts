import { useState, useEffect } from 'react';
import {GM_addValueChangeListener, GM_getValue, GM_removeValueChangeListener, GM_setValue} from "$";

export default function useGMValue(key, defaultValue) {
  const [value, setValue] = useState(() => GM_getValue(key, defaultValue));

  useEffect(() => {
    const listenerId = GM_addValueChangeListener(key, (_, __, newValue) => {
      setValue(newValue);
    });

    return () => {
      GM_removeValueChangeListener(listenerId);
    };
  }, [key]);

  const setGMValue = (newValue) => {
    GM_setValue(key, newValue);
    setValue(newValue);
  };

  return [value, setGMValue];
}

import {atom, useAtom} from 'jotai';

// ... 其他代码

export function useGMValueWithAtom(key, defaultValue) {
  const [value, setGMValue] = useGMValue(key, defaultValue);
  const valueAtom = atom(defaultValue);

  useEffect(() => {
    const listenerId = GM_addValueChangeListener(key, (_, __, newValue) => {
      setGMValue(newValue);
      useAtom(valueAtom);
    });

    return () => {
      GM_removeValueChangeListener(listenerId);
    };
  }, [key, valueAtom]);

  return [valueAtom, setGMValue];
}
