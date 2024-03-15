import { useState, useEffect } from "react";
import {
  GM_addValueChangeListener,
  GM_getValue,
  GM_removeValueChangeListener,
  GM_setValue,
} from "$";

export default function useGMValue(key: string, defaultValue: any) {
  const [value, setValue] = useState<any>(() => GM_getValue(key, defaultValue));

  useEffect(() => {
    const listenerId = GM_addValueChangeListener(
      key,
      (_, __, newValue: any) => {
        setValue(newValue);
      },
    );

    return () => {
      GM_removeValueChangeListener(listenerId);
    };
  }, [key]);

  const setGMValue = (newValue: any) => {
    GM_setValue(key, newValue);
    setValue(newValue);
  };

  return [value, setGMValue];
}
