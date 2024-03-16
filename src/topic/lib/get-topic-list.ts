import { CurrentVersion, TopicList } from "@topic/lib/types";
import { LegacyListMatch, NewListMatch } from "@topic/match";
import MakeError from "@topic/lib/make-error";

const host = window.location.host;

export default function GetTopicList() {
  const currentVersion: CurrentVersion = (() => {
    if (NewListMatch() && !LegacyListMatch()) return "new";
    if (LegacyListMatch() && !NewListMatch()) return "legacy";
    return null;
  })();

  const isNewVersion = currentVersion === "new";

  try {
    if (isNewVersion) {
      const getNewItems = GetNewItems();
      console.debug("getNewItems", getNewItems);
      return getNewItems;
    } else {
      const getLegacyItems = GetLegacyItems();
      console.debug("getLegacyItems", getLegacyItems);
      return getLegacyItems;
    }
  } catch (error) {
    MakeError(error);
  }
}

const GetLegacyItems = (): TopicList[] => {
  const selector = "div#showTopics div.content1118";
  const items = Array.from(document.querySelectorAll(selector));
  const result: TopicList[] = items
    .filter((item: Element) => {
      const titleClass = "oneRight";
      // test if any child node element has class 'oneRight' then return true.
      const hasTitleClass = Array.from(item.children).some((child) =>
        child.classList.contains(titleClass),
      );
      return hasTitleClass;
    })
    .map((item: Element) => {
      const titleSelector = "h3 a";
      const titleElement = item.querySelector(titleSelector);
      const title = titleElement?.textContent?.trim() || "";
      const detailElement = item.querySelector("p.clearfix");
      const author = detailElement?.children[0].textContent?.trim() || "";
      const replyCount = detailElement?.children[1].textContent?.trim() || "";
      const url = titleElement?.getAttribute("href") || "";
      return { title, author, replyCount, url };
    });
  return result;
};

const GetNewItems = (): TopicList[] => {
  const selector = "div.dataCon ul.dataBody li.dataBody_topic";
  const items = Array.from(document.querySelectorAll(selector));
  const result: TopicList[] = items.map((item: Element) => {
    // const titleSelector = "div.topicli_title";
    // const titleElement = item.querySelector(titleSelector);
    // const title = titleElement?.textContent?.trim() || "";
    const authorSelector = "span.author";
    const authorElement = item.querySelector(authorSelector);
    const author = authorElement?.textContent?.trim() || "";
    const replyCountSelector = "div.topic_interactive div.comment span";
    const replyCountElement = item.querySelector(replyCountSelector);
    const replyCount = replyCountElement?.textContent?.trim() || "";
    const urlSelector = "a.topicli_link";
    const urlElement = item.querySelector(urlSelector);
    const url = urlElement?.getAttribute("href") || "";
    const title = urlElement?.textContent?.trim() || "";
    return { title, author, replyCount, url };
  });
  return result;
};
