import {Button, CircularProgress} from "@mui/material";
import {useEffect} from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import {DetailMatch, ListMatch} from "@topic/match";
import {useLogStore, useStatusStore} from "@topic/lib/store";

export default function PanelActions() {
  const {running, setRunning} = useStatusStore()
  const {currentPage, setCurrentPage} = useStatusStore()
  const {topicDetail, setTopicDetail} = useStatusStore()
  const {addLogItem} = useLogStore()

  useEffect(() => {
    if (DetailMatch()) {
      setCurrentPage("detail");
    } else if (ListMatch()) {
      setCurrentPage("list");
    }
    console.log("1")
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

  return <>
    {running && <CircularProgress size="2em"/>}
    <Button autofocus disabled={running}>开始</Button>
  </>;
}
