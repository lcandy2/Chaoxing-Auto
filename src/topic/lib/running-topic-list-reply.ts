import { useLogStore, useStatusStore } from "@topic/lib/store";
import {
  AppendHashAction,
  AppendHashActionIndex,
  AppendHashStart,
} from "@topic/lib/hash";
import MakeError from "@topic/lib/make-error";
import { ClearMessage, ReceiveMessage } from "@topic/lib/window-message";
import Standby from "@topic/lib/standby";
import { ActionFrameStatusStatus } from "@topic/lib/types";

const setActionFrameStatusStatus =
  useStatusStore.getState().setActionFrameStatusStatus;
const setActionFrameStatusIndex =
  useStatusStore.getState().setActionFrameStatusIndex;
const setActionFrameStatusTotal =
  useStatusStore.getState().setActionFrameStatusTotal;
const setActionFrameStatusSrc =
  useStatusStore.getState().setActionFrameStatusSrc;
const addLogItem = useLogStore.getState().addLogItem;

export default async function RunningTopicListReply(
  status: ActionFrameStatusStatus,
) {
  const { actionFrameStatus } = useStatusStore.getState();
  const actionFrameStatusTotal = actionFrameStatus.total;
  const { topicList } = useStatusStore.getState();
  console.debug("RunningTopicListReply Status", status);
  if (status === "triggered") {
    const init = InitRunningTopicListReply();
    if (init) {
      addLogItem("开始：批量回复讨论");
      await Standby(0.3);
      setActionFrameStatusStatus("waitingToStart");
    }
  }
  const index = actionFrameStatus.index || 0;
  try {
    if (status === "waitingToStart") {
      const src = topicList[index].url;
      if (src) {
        const srcHashed = AppendHashAction(src).toString();
        const srcIndexed = AppendHashActionIndex(index, srcHashed).toString();
        setActionFrameStatusSrc(srcIndexed);
        addLogItem(`正在回复讨论：${topicList[index].title}`);
        await Standby(0.5);
        ReceiveMessage();
        setActionFrameStatusStatus("running");
      } else {
        MakeError("未找到讨论链接");
        setActionFrameStatusStatus("failed");
      }
    }
    if (status === "failed") {
      setActionFrameStatusStatus("waitingToNext");
    }
    if (status === "success") {
      const title = topicList[index].title;
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
  const { topicList } = useStatusStore.getState();
  const total = topicList.length;
  setActionFrameStatusIndex(0);
  setActionFrameStatusTotal(topicList.length);
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
