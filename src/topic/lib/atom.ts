import atomWithGMValue from "@topic/lib/hooks/atom-with-gm-value";
import {atom, createStore} from "jotai/index";
import {TopicDetail} from "@topic/lib/get-topic-detail";
import {useAtom} from "jotai";

export const topicStore = createStore()

export const countAtom = atomWithGMValue("topic_replyCountTimes", 1);
export const standbyTimeAtom = atomWithGMValue("topic_replyStandbyTime", 200);
export const runningAtom = atom<boolean>(false);
export const currentPageAtom = atom<string>("");
export const topicDetailAtom = atom<TopicDetail>({});

export const logItemsAtom = atom<string[]>([]);
export const addLogItem = (item: string) => {
  topicStore.set(logItemsAtom, (prev) => [...prev, item]);
  console.log(item);
}
export const useAddLogItem = () => {
  const [, setLogItems] = useAtom(logItemsAtom);
  const addLogItem = (item: string) => {
    setLogItems((prevItems) => [...prevItems, item]);
  }
  return addLogItem;
}
