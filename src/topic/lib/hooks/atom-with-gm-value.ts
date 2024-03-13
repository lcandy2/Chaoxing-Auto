import { GM_getValue, GM_setValue } from '$';
import {atom, Getter, Setter} from 'jotai';

export default function atomWithGMValue(key: string, defaultValue: any) {
  const read = (get: Getter) => GM_getValue(key, defaultValue);
  const write = (get: Getter, set: Setter, update: any) => {
    GM_setValue(key, update);
    set(atom(read, write), update);
  };

  return atom(read, write);
}
