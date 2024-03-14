import atomWithGMValue from "@topic/lib/hooks/atom-with-gm-value";
import {atom, createStore} from "jotai/index";
import {useAtom} from "jotai";
import {CurrentPageType, TopicDetail} from "@topic/lib/types";

export const topicStore = createStore()

export const countAtom = atomWithGMValue("topic_replyCountTimes", 1);
export const standbyTimeAtom = atomWithGMValue("topic_replyStandbyTime", 200);
export const runningAtom = atom<boolean>(false);
export const currentPageAtom = atom<CurrentPageType>(false);
export const topicDetailAtom = atom<TopicDetail>({});

// export const logItemsAtom = atom<string[]>([]);
export const logItemsAtom = atom<string[]>([]);

export const addLogItem = (item: string) => {
  topicStore.set(logItemsAtom, (prev) => [...prev, item]);
  console.log(item);
}
export const useAddLogItem = () => {
  const [, setLogItems] = useAtom(logItemsAtom);
  const addLogItem = (item: string) => {
    setLogItems((prevItems) => {
      const newItems = [...prevItems, item];
      return newItems;
    });
  }
  return addLogItem;
}
