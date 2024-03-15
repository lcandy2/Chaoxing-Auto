import {CurrentVersion, TopicList} from "@topic/lib/types";
import {LegacyListMatch, NewListMatch} from "@topic/match";

export default function GetTopicList() {
  const currentVersion: CurrentVersion = (() => {
    if (NewListMatch() && !LegacyListMatch()) return 'new';
    if (LegacyListMatch() && !NewListMatch()) return 'legacy';
    return null;
  })();

  const isNewVersion = currentVersion === 'new';
}

// const getLegacyItems = () => {
//   const selector = "div#showTopics div.content1118";
//   const items = Array.from(document.querySelectorAll(selector));
//   const result: TopicList = items.map((item) => {
//     const titleSelector = "h3 a";
//   const titleElement = item.querySelector(titleSelector);
//     const title = titleElement?.textContent;
//     const lement = item.querySelector("p.clearfix");
//     const replyCount = item.querySelector("span")?.textContent;
//     const url = titleElement?.getAttribute("href");
//     return [{title, author, replyCount, url}];
//   });
// }
