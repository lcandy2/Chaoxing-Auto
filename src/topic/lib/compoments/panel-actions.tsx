import {Button, CircularProgress, Icon, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import {DetailMatch, ListMatch} from "@topic/match";
import {useLogStore, useStatusStore} from "@topic/lib/store";
import RunningTopicReply from "@topic/lib/running-topic-reply";
import {HashStart, HashSuccess} from "@topic/lib/get-hash";
import GetTopicList from "@topic/lib/get-topic-list";

export default function PanelActions() {
  const {currentPage, setCurrentPage} = useStatusStore()
  const {topicDetail, setTopicDetail} = useStatusStore()
  const {topicList, setTopicList} = useStatusStore()
  const {currentStatus, setCurrentStatus} = useStatusStore()
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const {addLogItem} = useLogStore()

  useEffect(() => {
    if (DetailMatch()) {
      setCurrentPage("detail");
      if (HashStart()) {
        window.history.replaceState({}, "", "#");
        setCurrentStatus("triggered");
      }
    } else if (ListMatch()) {
      setCurrentPage("list");
    }
    if (HashSuccess()) {
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
        {currentStatus === "success" && <><Icon color="success">done</Icon><Typography variant="body2">已完成</Typography></>}
        {currentStatus === "failed" && <><Icon color="error">error</Icon><Typography variant="body2">错误</Typography></>}
        {currentPage === "detail" && <Button autoFocus={currentStatus !== "success"} disabled={isButtonDisabled} onClick={handleRunningButtonClick}>{(currentStatus === "success" || currentStatus === "failed") && "再次"}回复讨论</Button>}
        {currentPage === "list" && <Button autoFocus disabled>暂不支持</Button>}
      </>)
}
