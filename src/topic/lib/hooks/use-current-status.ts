import { useEffect } from "react";
import RunningTopicDetailReply from "@topic/lib/running-topic-detail-reply";
import {
  AppendHashSuccess,
  GetHashAction,
  GetHashStart,
} from "@topic/lib/hash";
import { CurrentStatus, TopicDetail } from "@topic/lib/types";
import { useLogStore } from "@topic/lib/store";
import { handleRunningTopicReply } from "@topic/lib/hooks/use-topic-detail-reply";
import { DetailMatch, ListMatch } from "@topic/match";

export default function useCurrentStatus({
  setCurrentStatus,
  currentStatus,
  setIsButtonDisabled,
  setIsInActionFrame,
}: {
  setCurrentStatus: (status: CurrentStatus) => void;
  currentStatus: CurrentStatus;
  setIsButtonDisabled: (state: boolean) => void;
  setIsInActionFrame: (state: boolean) => void;
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
        handleRunningTopicReply({ setCurrentStatus });
        break;
      case "success":
        setIsButtonDisabled(false);
        AppendHashSuccess();
        addLogItem("All done!");
        break;
      case "idle":
        setIsButtonDisabled(false);
        const hashAction = GetHashAction();
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
