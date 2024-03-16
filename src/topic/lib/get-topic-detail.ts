import { LegacyDetailMatch, NewDetailMatch } from "@topic/match";
import { Reply, TopicDetail } from "@topic/lib/types";
import { useLogStore } from "@topic/lib/store";
import Standby from "@topic/lib/standby";

export default async function GetTopicDetail() {
  const newDetailMatch = NewDetailMatch();
  const legacyDetailMatch = LegacyDetailMatch();
  const addLogItem = useLogStore.getState().addLogItem;

  const detail: TopicDetail = {
    title: undefined,
    content: undefined,
    replies: undefined,
  };

  if (newDetailMatch && !legacyDetailMatch) {
    try {
      const topicDetail_detail = document.querySelector(".topicDetail_detail");
      const topicDetail_replyList = document.querySelector(
        ".topicDetail_replyList",
      );

      if (!topicDetail_detail || !topicDetail_replyList) {
        return;
      }

      const title = getNewTitle(topicDetail_detail);
      const content = getNewContent(topicDetail_detail);
      const replies = await getNewReply(topicDetail_replyList);

      detail.title = title;
      detail.content = content;
      detail.replies = replies;
    } catch (error) {
      console.error(error);
      addLogItem(`获取讨论详情失败：${error}`);
    }
  } else if (legacyDetailMatch && !newDetailMatch) {
    try {
      const divs = document.querySelectorAll("div");
      let targetDiv;

      for (let i = 0; i < divs.length; i++) {
        if (divs[i].className.match(/content\d{4}/)) {
          targetDiv = divs[i];
          break;
        }
      }

      if (!targetDiv) {
        return;
      }

      const title = getLegacyTitle(targetDiv);
      const content = getContent(targetDiv);
      const replies = getReplies(targetDiv);

      detail.title = title;
      detail.content = content;
      detail.replies = replies;
    } catch (error) {
      console.error(error);
      addLogItem(`获取讨论详情失败：${error}`);
    }
  }

  return detail;
}

const getNewTitle = (element: Element) => {
  const topicDetail_title = element.querySelector(".topicDetail_title");
  const title = topicDetail_title
    ? topicDetail_title.textContent?.trim()
    : undefined;
  return title;
};

export const observeReplies = (callback: () => void) => {
  const element = document.querySelector(".topicDetail_replyList");

  if (!element) {
    console.error("Element not found");
    return;
  }

  // 如果子节点数量已经大于1，直接执行回调函数
  if (element.children.length > 1) {
    callback();
    return;
  }

  const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        callback();
      }
    }
  });

  const config = { attributes: false, childList: true, subtree: true };
  observer.observe(element, config);

  return () => observer.disconnect();
};

const getNewContent = (element: Element) => {
  const topicDetail_main = element.querySelector(".topicDetail_main");
  if (!topicDetail_main) return undefined;
  const children = Array.from(topicDetail_main.children);
  const content = children
    .filter((child: Element) => !child.classList.contains("topicDetail_info"))
    .map((child: Element) => child.textContent?.trim())
    .join(" ");
  return content;
};

const getNewReply = async (element: Element): Promise<Reply[]> => {
  const replyCountElem = document.querySelector(".classReplyCount span");
  const replyCountNum: number = Number(replyCountElem?.textContent || 0);
  const getReplies = () => {
    Standby(0.5);
    const replyItems = Array.from(
      element.querySelectorAll(".topicDetail_replyItem"),
    ) as Element[];
    const replies: Reply[] = replyItems.map((replyItem: Element) => {
      const authorElement = replyItem.querySelector(".author");
      const replyContent = replyItem.querySelector(".replyContent");
      const author = authorElement ? authorElement.textContent?.trim() : "";
      const content = replyContent ? replyContent.textContent?.trim() : "";
      return { author, content };
    });
    return replies;
  };
  let replies = getReplies();
  if (replyCountNum === 0 || replies.length > 0) {
    return replies;
  } else {
    return [{ content: "NEED_OBSERVE" }];
  }
};

const getLegacyTitle = (element: HTMLElement) => {
  const oneDiv = element.querySelector(".oneDiv");
  let h3Content;

  if (oneDiv) {
    let h3 = oneDiv.querySelector("h3");
    if (h3) {
      let em = h3.querySelector("em");
      if (em) {
        em.remove();
      }
      h3Content = h3.textContent?.trim();
    }
  }

  return h3Content;
};

const getContent = (element: Element) => {
  const topicContent = element.querySelector("#topicContent");
  const content = topicContent ? topicContent.textContent?.trim() : undefined;
  return content;
};

const getReplies = (element: Element) => {
  let topicReplys;

  let replies: Reply[] = [];

  if (element && element.children.length > 1) {
    topicReplys = element.children[1];

    let divs = topicReplys.querySelectorAll("div");

    for (let i = 0; i < divs.length; i++) {
      if (divs[i].parentElement !== topicReplys) {
        continue;
      }
      let reply: Reply = {};
      let span = divs[i].querySelector("p > span.name");
      let h3 = divs[i].querySelector("h3");

      if (span) {
        reply.author = span.textContent?.trim();
      }

      if (h3) {
        reply.content = h3.textContent?.trim();
      }

      if (reply.content) {
        replies.push(reply);
      }
    }
  }

  return replies;
};
