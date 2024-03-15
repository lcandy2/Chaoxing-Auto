import {Button, CircularProgress, Icon, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import {DetailMatch, ListMatch} from "@topic/match";
import {useLogStore, useStatusStore} from "@topic/lib/store";
import RunningTopicDetailReply from "@topic/lib/running-topic-detail-reply";
import {GetHashAction, GetHashStart, GetHashSuccess} from "@topic/lib/hash";
import GetTopicList from "@topic/lib/get-topic-list";

export default function PanelActions() {
  const {currentPage, setCurrentPage} = useStatusStore()
  const {topicDetail, setTopicDetail} = useStatusStore()
  const {topicList, setTopicList} = useStatusStore()
  const {currentStatus, setCurrentStatus} = useStatusStore()
  const {isInActionFrame, setIsInActionFrame} = useStatusStore()
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
  const {addLogItem} = useLogStore()
  const [runningListIndex, setRunningListIndex] = useState<number | null>(null)

  useEffect(() => {
    const hashSuccess = GetHashSuccess();
    const hashAction = GetHashAction();
    const hashStart = GetHashStart() || hashAction;
    if (DetailMatch()) {
      setCurrentPage("detail");
      if (hashAction) setIsInActionFrame(true);
      if (hashStart) {
        console.log("HashStart");
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
          }
          break;
        case "list":
          page = "讨论列表";
          const topicList = GetTopicList();
          if (topicList) {
            setTopicList(topicList);
          }
          break;
        default:
          page = "未知页面";
          break;
      }
      addLogItem(`检测到当前为 [${page}]`);

    }
  }, [currentPage]);

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
    if (topicList.length) {
      addLogItem(`获取到发起的讨论：共 ${topicList.length} 条`);
    }
  }, [topicList]);

  useEffect(() => {
    const handleRunningTopicReply = async () => {
      const result = await RunningTopicDetailReply();
      if (result) {
        setCurrentStatus("success");
      } else {
        setCurrentStatus("failed");
      }
    }

    switch (currentStatus) {
      case "running":
        setIsButtonDisabled(true);
        break;
      case "triggered":
        setIsButtonDisabled(true);
        setCurrentStatus("running");
        handleRunningTopicReply();
        break;
      default:
        setIsButtonDisabled(false);
        break;
    }
  }, [currentStatus]);

  const handleRunningButtonClick = async () => {
    setCurrentStatus("triggered");
  }

  return (
      <>
        {isButtonDisabled && <CircularProgress size="2em"/>}
        {currentStatus === "success" && <><Icon color="success">done</Icon><Typography
            variant="body2">已完成</Typography></>}
        {currentStatus === "failed" && <><Icon color="error">error</Icon><Typography
            variant="body2">错误</Typography></>}
        {(currentPage === "detail" && !isInActionFrame) &&
            <Button autoFocus={currentStatus !== "success"} disabled={isButtonDisabled}
                    onClick={handleRunningButtonClick}>{(currentStatus === "success" || currentStatus === "failed") && "再次"}回复讨论</Button>}
        {currentPage === "list" && <Button autoFocus disabled>暂不支持</Button>}
      </>)
}
