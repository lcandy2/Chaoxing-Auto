// GM storage object with zustand
import { GM_deleteValue, GM_getValue, GM_setValue } from "$";
import { StateStorage } from "zustand/middleware";

const GMStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    // console.debug(name, "has been retrieved");
    return (await GM_getValue(name)) || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    // console.debug(name, "with value", value, "has been saved");
    await GM_setValue(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    // console.debug(name, "has been deleted");
    await GM_deleteValue(name);
  },
};

export default GMStorage;
