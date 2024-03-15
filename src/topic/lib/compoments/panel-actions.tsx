import {Button, CircularProgress} from "@mui/material";
import {useEffect, useState} from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import {DetailMatch, ListMatch} from "@topic/match";
import {useLogStore, useStatusStore} from "@topic/lib/store";
import RunningTopicReply from "@topic/lib/running-topic-reply";
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import {HashStart, HashSuccess} from "@topic/lib/get-hash";

export default function PanelActions() {
  const {running, setRunning} = useStatusStore()
  const {currentPage, setCurrentPage} = useStatusStore()
  const {topicDetail, setTopicDetail} = useStatusStore()
  const {currentStatus, setCurrentStatus} = useStatusStore()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const {addLogItem} = useLogStore()

  useEffect(() => {
    if (DetailMatch()) {
      setCurrentPage("detail");
    } else if (ListMatch()) {
      setCurrentPage("list");
    }
    if (HashSuccess()) {
      setCurrentStatus("success");
    }
    if (HashStart()) {
      window.history.replaceState(null, null, "#");
      setCurrentStatus("triggered");
    }
  }, []);

  useEffect(() => {
    if (currentPage === "list" || currentPage === "detail") {
      let page: string;
      switch (currentPage) {
        case "detail":
          page = "讨论详情";
          break;
        case "list":
          page = "讨论列表";
          break;
        default:
          page = "未知页面";
          break;
      }
      addLogItem(`检测到当前为 [${page}]`);

      const topicDetail = GetTopicDetail();
      setTopicDetail(topicDetail);
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
    const handleRunningTopicReply = async () => {
      const result = await RunningTopicReply();
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
        {currentStatus === "success" && <CheckIcon color="success"/>}
        {currentStatus === "failed" && <ErrorIcon color="error"/>}
        {currentPage === "detail" && <Button autofocus disabled={isButtonDisabled} onClick={handleRunningButtonClick}>回复讨论</Button>}
        {currentPage === "list" && <Button disabled>暂不支持</Button>}
      </>)
}
