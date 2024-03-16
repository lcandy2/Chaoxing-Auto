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
