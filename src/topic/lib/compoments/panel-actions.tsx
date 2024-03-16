import { Button, CircularProgress, Icon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import { DetailMatch, ListMatch } from "@topic/match";
import { useLogStore, useStatusStore } from "@topic/lib/store";
import {
  AppendHashSuccess,
  GetHashAction,
  GetHashStart,
  GetHashSuccess,
} from "@topic/lib/hash";
import GetTopicList from "@topic/lib/get-topic-list";
import useTopicDetailReply, {
  handleRunningTopicDetailStart,
} from "@topic/lib/hooks/use-topic-detail-reply";
import RunningTopicListReply from "@topic/lib/running-topic-list-reply";
import { PostMessageSuccess } from "@topic/lib/window-message";

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
    const hashAction = GetHashAction();
    const hashStart = GetHashStart() || hashAction;
    if (DetailMatch()) {
      setCurrentPage("detail");
      if (hashAction) setIsInActionFrame(true);
      if (hashStart) {
        if (!hashSuccess) {
          setCurrentStatus("triggered");
        }
      }
    } else if (ListMatch()) {
      setCurrentPage("list");
    }
    if (hashSuccess) {
      setCurrentStatus("success");
    }
  }, []);

  useEffect(() => {
    if (currentPage === "list" || currentPage === "detail") {
      let page: string;
      switch (currentPage) {
        case "detail":
          page = "讨论详情";
          const topicDetail = GetTopicDetail();
          if (topicDetail) {
            setTopicDetail(topicDetail);
            if (!currentStatus) setCurrentStatus("idle");
          }
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
    setCurrentStatus,
    currentStatus,
    setIsButtonDisabled,
  });
  const handleRunningTopicDetailReplyButtonClick =
    handleRunningTopicDetailStart({ setCurrentStatus });

  useEffect(() => {
    if (topicList.length) {
      addLogItem(`获取到发起的讨论：共 ${topicList.length} 条`);
    }
  }, [topicList]);

  useEffect(() => {
    if (isInActionFrame && currentStatus === "success") {
      console.debug("PostMessageSuccess");
      PostMessageSuccess();
    }
  }, [isInActionFrame]);

  const handleRunningTopicListReplyButtonClick = async () => {
    setActionFrameStatusStatus("triggered");
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
          <Button autoFocus disabled>
            批量发起讨论
          </Button>

          <Button
            autoFocus={currentStatus !== "success"}
            disabled={isButtonDisabled}
            onClick={handleRunningTopicListReplyButtonClick}
          >
            {currentStatus === "success" && <Icon color="success">done</Icon>}
            {currentStatus === "success" || currentStatus === "failed"
              ? "再次批量回复"
              : "批量回复讨论"}
          </Button>
        </>
      )}
    </>
  );
}
