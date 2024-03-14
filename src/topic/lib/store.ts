import {create} from "zustand";
import {combine} from "zustand/middleware";

export const useLogStore = create(combine(
    {
      logItems: <Array<string>>[]
    }, (set) => ({
      addLogItem: (item: string) => {
        set((state) => ({logItems: [...state.logItems, item]}));
      }
    })
));
