import { useEffect } from "react";
import RunningTopicDetailReply from "@topic/lib/running-topic-detail-reply";
import {
  AppendHashSuccess,
  GetHashActionTrigger,
  GetHashStart,
} from "@topic/lib/hash";
import {
  ActionFrameStatusStatus,
  CurrentStatus,
  TopicDetail,
} from "@topic/lib/types";
import { useLogStore } from "@topic/lib/store";
import { handleRunningTopicReply } from "@topic/lib/hooks/use-topic-detail-reply";
import { DetailMatch, ListMatch } from "@topic/match";
import { handleRunningNewTopic } from "@topic/lib/hooks/use-new-topic";

export default function useCurrentStatus({
  setCurrentStatus,
  currentStatus,
  setIsButtonDisabled,
  setIsInActionFrame,
  actionFrameStatusStatus,
}: {
  setCurrentStatus: (status: CurrentStatus) => void;
  currentStatus: CurrentStatus;
  setIsButtonDisabled: (state: boolean) => void;
  setIsInActionFrame: (state: boolean) => void;
  actionFrameStatusStatus: ActionFrameStatusStatus | undefined;
}) {
  const { addLogItem } = useLogStore();

  useEffect(() => {
    switch (currentStatus) {
      case "running":
        setIsButtonDisabled(true);
        break;
      case "triggered":
        setIsButtonDisabled(true);
        setCurrentStatus("running");
        if (DetailMatch()) {
          handleRunningTopicReply({ setCurrentStatus });
        } else if (ListMatch()) {
          handleRunningNewTopic({ setCurrentStatus });
        }
        break;
      case "success":
        setIsButtonDisabled(false);
        if (DetailMatch()) {
          AppendHashSuccess("singleReply");
        } else if (actionFrameStatusStatus === "finished") {
          AppendHashSuccess("multiReply");
        } else if (ListMatch()) {
          AppendHashSuccess("newTopic");
        } else {
          AppendHashSuccess();
        }
        addLogItem("All done!");
        break;
      case "idle":
        setIsButtonDisabled(false);
        const hashAction = GetHashActionTrigger();
        const hashStart = GetHashStart() || hashAction;
        if (hashStart) {
          setCurrentStatus("triggered");
        }
        break;
      case "failed":
        setIsButtonDisabled(false);
        break;
      default:
        setIsButtonDisabled(true);
        break;
    }
  }, [currentStatus]);
}
