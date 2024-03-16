import {
  useLogStore,
  useSettingsStore,
  useStatusStore,
} from "@topic/lib/store";
import {
  AppendHashActionTrigger,
  AppendHashActionReplyIndex,
  AppendHashStart,
  AppendHashActionNewTopicTitle,
} from "@topic/lib/hash";
import MakeError from "@topic/lib/make-error";
import { ReceiveMessage } from "@topic/lib/window-message";
import Standby from "@topic/lib/standby";
import { ActionFrameStatusStatus } from "@topic/lib/types";
import { getRandomTitle } from "@topic/lib/running-new-topic";

const setActionFrameStatusStatus =
  useStatusStore.getState().setActionFrameStatusStatus;
const setActionFrameStatusIndex =
  useStatusStore.getState().setActionFrameStatusIndex;
const setActionFrameStatusTotal =
  useStatusStore.getState().setActionFrameStatusTotal;
const setActionFrameStatusSrc =
  useStatusStore.getState().setActionFrameStatusSrc;
const addLogItem = useLogStore.getState().addLogItem;

export default async function RunningMultiNewTopic(
  status: ActionFrameStatusStatus,
) {
  const { actionFrameStatus } = useStatusStore.getState();
  const actionFrameStatusTotal = actionFrameStatus.total;
  const { titleList } = useStatusStore.getState();
  const { newTopicCountTimes } = useSettingsStore.getState();
  console.debug("RunningTopicListReply Status", status);
  if (status === "triggered") {
    const init = InitRunningTopicListReply();
    if (init) {
      addLogItem("开始：批量发起讨论");
      await Standby(0.3);
      setActionFrameStatusStatus("waitingToStart");
    }
  }
  const index = actionFrameStatus.index || 0;
  try {
    if (status === "waitingToStart") {
      const title = titleList[index];
      const href = window.location.href;
      const src = AppendHashActionNewTopicTitle(title, href).toString();
      if (src) {
        const srcHashed = AppendHashActionTrigger(src).toString();
        const srcIndexed = AppendHashActionReplyIndex(
          index,
          srcHashed,
        ).toString();
        setActionFrameStatusSrc(srcIndexed);
        addLogItem(`正在创建新讨论：${titleList[index]}`);
        await Standby(0.5);
        ReceiveMessage();
        setActionFrameStatusStatus("running");
      } else {
        MakeError("未知错误");
        setActionFrameStatusStatus("failed");
      }
    }
    if (status === "failed") {
      setActionFrameStatusStatus("waitingToNext");
    }
    if (status === "success") {
      const title = titleList[index];
      addLogItem(`已回复讨论：${title}`);
      await Standby(1);
      setActionFrameStatusStatus("waitingToNext");
    }
    const total = actionFrameStatusTotal || 0;
    if (status === "waitingToNext") {
      const result = await PrepareNextRunningTopicListReply(index, total);
      return result;
    }
  } catch (error) {
    MakeError(error);
    setActionFrameStatusStatus("failed");
  }
  return false;
}

export const InitRunningTopicListReply = () => {
  const { newTopicCountTimes } = useSettingsStore.getState();
  const { topicList, setTitleList } = useStatusStore.getState();
  const total = newTopicCountTimes;
  const titleList = getRandomTitle(topicList, total);
  setTitleList(titleList);
  setActionFrameStatusIndex(0);
  setActionFrameStatusTotal(total);
  setActionFrameStatusSrc("");
  return true;
};

export const PrepareNextRunningTopicListReply = async (
  index: number,
  total: number,
) => {
  addLogItem("等待继续...");
  setActionFrameStatusSrc("");
  await Standby(0.5);
  if (index === total - 1) {
    return true;
  } else {
    setActionFrameStatusIndex(index + 1);
    setActionFrameStatusStatus("waitingToStart");
    return false;
  }
};
