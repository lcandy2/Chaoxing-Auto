import { Button, CircularProgress, Icon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GetTopicDetail, { observeReplies } from "@topic/lib/get-topic-detail";
import { DetailMatch, ListMatch, NewMatch } from "@topic/match";
import { useLogStore, useStatusStore } from "@topic/lib/store";
import {
  AppendHashSuccess,
  GetHashActionTrigger,
  GetHashActionReplyIndex,
  GetHashStart,
  GetHashSuccess,
} from "@topic/lib/hash";
import GetTopicList from "@topic/lib/get-topic-list";
import useTopicDetailReply, {
  handleRunningTopicDetailStart,
} from "@topic/lib/hooks/use-topic-detail-reply";
import RunningTopicListReply from "@topic/lib/running-topic-list-reply";
import { PostMessageSuccess } from "@topic/lib/window-message";
import useCurrentStatus from "@topic/lib/hooks/use-current-status";

export default function PanelActions() {
  const { currentPage, setCurrentPage } = useStatusStore();
  const { topicDetail, setTopicDetail } = useStatusStore();
  const { topicList, setTopicList } = useStatusStore();
  const { currentStatus, setCurrentStatus } = useStatusStore();
  const { isInActionFrame, setIsInActionFrame } = useStatusStore();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { addLogItem } = useLogStore();
  const {
    actionFrameStatus,
    setActionFrameStatus,
    setActionFrameStatusStatus,
  } = useStatusStore();
  const actionFrameStatusStatus = actionFrameStatus.status;

  useEffect(() => {
    const hashSuccess = GetHashSuccess();
    if (
      hashSuccess === true ||
      hashSuccess === "singleReply" ||
      hashSuccess === "newTopic"
    ) {
      setCurrentStatus("success");
    } else if (hashSuccess === "multiReply") {
      setActionFrameStatusStatus("finished");
    }
    if (GetHashActionTrigger()) {
      setIsInActionFrame(true);
    }
    if (DetailMatch()) {
      setCurrentPage("detail");
    } else if (ListMatch()) {
      setCurrentPage("list");
    }
  }, []);

  useEffect(() => {
    const handleGetTopicDetail = async () => {
      const topicDetail = await GetTopicDetail();
      if (topicDetail) {
        if (
          topicDetail.replies &&
          topicDetail.replies[0] &&
          topicDetail.replies[0].content &&
          topicDetail.replies[0].content === "NEED_OBSERVE"
        ) {
          console.debug("NEED_OBSERVE");
          let stopObserving: (() => void) | undefined;

          stopObserving = observeReplies(async () => {
            console.log("Replies changed");
            if (stopObserving) {
              stopObserving();
            }
            const topicDetail = await GetTopicDetail();
            if (topicDetail) {
              console.debug("topicDetail", topicDetail);
              setTopicDetail(topicDetail);
              if (!currentStatus) setCurrentStatus("idle");
            }
          });
        } else {
          setTopicDetail(topicDetail);
          if (!currentStatus) setCurrentStatus("idle");
        }
      }
    };

    if (currentPage === "list" || currentPage === "detail") {
      let page: string;
      switch (currentPage) {
        case "detail":
          page = "讨论详情";
          handleGetTopicDetail();
          break;
        case "list":
          page = "讨论列表";
          const topicList = GetTopicList();
          if (topicList) {
            setTopicList(topicList);
            if (!actionFrameStatusStatus && !currentStatus)
              setActionFrameStatusStatus("idle");
          }
          break;
        default:
          page = "未知页面";
          break;
      }
      addLogItem(`检测到当前为 [${page}]`);
    }
  }, [currentPage]);

  useTopicDetailReply({
    topicDetail,
  });
  const handleRunningTopicDetailReplyButtonClick =
    handleRunningTopicDetailStart({ setCurrentStatus });

  useCurrentStatus({
    setCurrentStatus,
    currentStatus,
    setIsButtonDisabled,
    setIsInActionFrame,
    actionFrameStatusStatus,
  });

  useEffect(() => {
    if (topicList.length) {
      addLogItem(`获取到发起的讨论：共 ${topicList.length} 条`);
    }
  }, [topicList]);

  useEffect(() => {
    if (isInActionFrame && currentStatus === "success") {
      console.debug("PostMessageSuccess");
      PostMessageSuccess(GetHashActionReplyIndex() || 0);
    }
  }, [isInActionFrame, currentStatus]);

  const handleRunningTopicListReplyButtonClick = async () => {
    setActionFrameStatusStatus("triggered");
  };

  const handleRunningNewTopicButtonClick = async () => {
    setCurrentStatus("triggered");
  };

  useEffect(() => {
    const status = actionFrameStatusStatus;
    status &&
      console.debug(
        "PanelActions useEffect actionFrameStatus",
        actionFrameStatus,
      );
    const handleRunningTopicListReply = async () => {
      if (status) {
        const result = await RunningTopicListReply(status);
        if (result) {
          setActionFrameStatusStatus("finished");
        }
      }
    };
    if (
      status === "triggered" ||
      status === "waitingToStart" ||
      status === "waitingToNext" ||
      status === "failed" ||
      status === "success"
    ) {
      handleRunningTopicListReply();
      setCurrentStatus("running");
    } else if (status === "finished") {
      setCurrentStatus("success");
    } else if (status === "idle") {
      setCurrentStatus("idle");
    }
  }, [actionFrameStatusStatus]);

  return (
    <>
      {isButtonDisabled && <CircularProgress size="2em" />}
      {currentStatus === "success" && currentPage === "detail" && (
        <>
          <Icon color="success">done</Icon>
          <Typography variant="body2">已完成</Typography>
        </>
      )}
      {currentStatus === "failed" && (
        <>
          <Icon color="error">error</Icon>
          <Typography variant="body2">错误</Typography>
        </>
      )}
      {currentPage === "detail" && !isInActionFrame && (
        <Button
          autoFocus={currentStatus !== "success"}
          disabled={isButtonDisabled}
          onClick={handleRunningTopicDetailReplyButtonClick}
        >
          {(currentStatus === "success" || currentStatus === "failed") &&
            "再次"}
          回复讨论
        </Button>
      )}
      {currentPage === "list" && (
        <>
          <Button
            autoFocus
            disabled={isButtonDisabled}
            onClick={handleRunningNewTopicButtonClick}
          >
            {currentStatus === "success" &&
              actionFrameStatusStatus !== "finished" && (
                <Icon color="success">done</Icon>
              )}
            发起讨论
          </Button>

          <Button
            autoFocus={
              currentStatus !== "success" ||
              actionFrameStatusStatus !== "finished"
            }
            disabled={isButtonDisabled}
            onClick={handleRunningTopicListReplyButtonClick}
          >
            {actionFrameStatusStatus === "finished" && (
              <Icon color="success">done</Icon>
            )}
            {actionFrameStatusStatus === "finished"
              ? "再次批量回复"
              : "批量回复讨论"}
          </Button>
        </>
      )}
    </>
  );
}
