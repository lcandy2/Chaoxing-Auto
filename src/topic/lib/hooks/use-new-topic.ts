import { CurrentStatus } from "@topic/lib/types";
import RunningNewTopic from "@topic/lib/running-new-topic";

export const handleRunningNewTopic = async ({
  setCurrentStatus,
}: {
  setCurrentStatus: (status: CurrentStatus) => void;
}) => {
  const result = await RunningNewTopic();
  if (result) {
    setCurrentStatus("success");
  } else {
    setCurrentStatus("failed");
  }
};
