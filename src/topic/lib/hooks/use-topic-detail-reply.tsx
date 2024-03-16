import { useEffect } from "react";
import RunningTopicDetailReply from "@topic/lib/running-topic-detail-reply";
import {
  AppendHashSuccess,
  GetHashAction,
  GetHashStart,
} from "@topic/lib/hash";
import { CurrentStatus, TopicDetail } from "@topic/lib/types";
import { useLogStore } from "@topic/lib/store";
import { DetailMatch, ListMatch } from "@topic/match";

export default function useTopicDetailReply({
  topicDetail,
}: {
  topicDetail: TopicDetail;
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

export const handleRunningTopicReply = async ({
  setCurrentStatus,
}: {
  setCurrentStatus: (status: CurrentStatus) => void;
}) => {
  const result = await RunningTopicDetailReply();
  if (result) {
    setCurrentStatus("success");
  } else {
    setCurrentStatus("failed");
  }
};
