import {Button, CircularProgress} from "@mui/material";
import {useAtom} from "jotai";
import IsPageDetail from "@topic/lib/detail-detect";
import {useEffect} from "react";
import GetTopicDetail from "@topic/lib/get-topic-detail";
import {addLogItem, currentPageAtom, runningAtom, topicDetailAtom} from "@topic/lib/atom";

export default function PanelActions() {
  const [running, setRunning] = useAtom(runningAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [topicDetail, setTopicDetail] = useAtom(topicDetailAtom);

  useEffect(() => {
    if (IsPageDetail()) {
      setCurrentPage("detail");
    } else {
      setCurrentPage("list");
    }
  }, []);


  useEffect(() => {
    if (currentPage !== null) {
      const page = currentPage === "detail" ? "讨论详情" : "讨论列表";
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
