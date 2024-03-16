import { useEffect } from "react";
import RunningTopicDetailReply from "@topic/lib/running-topic-detail-reply";
import { AppendHashSuccess } from "@topic/lib/hash";
import { CurrentStatus, TopicDetail } from "@topic/lib/types";
import { useLogStore } from "@topic/lib/store";

export default function useTopicDetailReply({
  topicDetail,
  setCurrentStatus,
  currentStatus,
  setIsButtonDisabled,
}: {
  topicDetail: TopicDetail;
  setCurrentStatus: (status: CurrentStatus) => void;
  currentStatus: CurrentStatus;
  setIsButtonDisabled: (state: boolean) => void;
}) {
  const { addLogItem } = useLogStore();

  useEffect(() => {
    if (topicDetail) {
      if (topicDetail.title) {
        addLogItem(`获取到讨论标题：${topicDetail.title}`);
      }
      if (topicDetail.content) {
        addLogItem(`获取到讨论内容：${topicDetail.content}`);
      }
      if (topicDetail.replies) {
        addLogItem(`获取到讨论回复：共 ${topicDetail.replies.length} 条`);
      }
    }
  }, [topicDetail]);

  useEffect(() => {
    const handleRunningTopicReply = async () => {
      const result = await RunningTopicDetailReply();
      if (result) {
        setCurrentStatus("success");
      } else {
        setCurrentStatus("failed");
      }
    };

    switch (currentStatus) {
      case "running":
        setIsButtonDisabled(true);
        break;
      case "triggered":
        setIsButtonDisabled(true);
        setCurrentStatus("running");
        handleRunningTopicReply();
        break;
      case "success":
        setIsButtonDisabled(false);
        AppendHashSuccess();
        addLogItem("All done!");
        break;
      case "idle":
        setIsButtonDisabled(false);
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

export const handleRunningTopicDetailStart = ({
  setCurrentStatus,
}: {
  setCurrentStatus: (status: CurrentStatus) => void;
}) => {
  const handleRunningTopicDetailReplyButtonClick = async () => {
    setCurrentStatus("triggered");
  };
  return handleRunningTopicDetailReplyButtonClick;
};
