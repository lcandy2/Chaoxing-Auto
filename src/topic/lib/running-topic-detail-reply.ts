import { LegacyDetailMatch, NewDetailMatch } from "@topic/match";
import {
  useLogStore,
  useSettingsStore,
  useStatusStore,
} from "@topic/lib/store";
import Standby from "@topic/lib/standby";
import { CurrentVersion, TopicDetail } from "@topic/lib/types";
import {
  LEGACY_DETAIL_ACTION_BUTTON_TO_REPLY,
  LEGACY_DETAIL_ACTION_BUTTON_TO_SUBMIT,
  LEGACY_DETAIL_ACTION_TEXTAREA,
  NEW_DETAIL_ACTION_BUTTON_TO_REPLY,
  NEW_DETAIL_ACTION_BUTTON_TO_SUBMIT,
  NEW_DETAIL_ACTION_TEXTAREA,
} from "@topic/config";
import MakeError from "@topic/lib/make-error";
import { AppendHashSuccess } from "@topic/lib/hash";

const currentVersion: CurrentVersion = (() => {
  if (NewDetailMatch() && !LegacyDetailMatch()) return "new";
  if (LegacyDetailMatch() && !NewDetailMatch()) return "legacy";
  return null;
})();

const isNewVersion = currentVersion === "new";

const addLogItem = useLogStore.getState().addLogItem;

export default async function RunningTopicDetailReply() {
  const { countTimes } = useSettingsStore.getState();
  const { topicDetail } = useStatusStore.getState();
  const contextToReply = getRandomReplies(topicDetail, countTimes);
  console.debug("currentVersion", currentVersion);

  try {
    if (contextToReply.length <= 0) {
      throw new Error("未获取到回复评论。");
    }

    const buttonToReply = isNewVersion
      ? NEW_DETAIL_ACTION_BUTTON_TO_REPLY
      : LEGACY_DETAIL_ACTION_BUTTON_TO_REPLY;
    const textAreaToReply = isNewVersion
      ? NEW_DETAIL_ACTION_TEXTAREA
      : LEGACY_DETAIL_ACTION_TEXTAREA;
    const buttonToSubmit = isNewVersion
      ? NEW_DETAIL_ACTION_BUTTON_TO_SUBMIT
      : LEGACY_DETAIL_ACTION_BUTTON_TO_SUBMIT;

    const actionButtonToReply = await ActionButtonToReply(buttonToReply);
    const actionTextAreaToReply = await ActionTextAreaToReply(textAreaToReply);
    const actionButtonToSubmit = await ActionButtonToSubmit({
      selector: buttonToSubmit,
      textarea: actionTextAreaToReply,
      contextToReply,
    });

    if (actionButtonToReply && actionTextAreaToReply && actionButtonToSubmit) {
      // AppendHashSuccess();
      return true;
    }
  } catch (error) {
    MakeError(error);
    return false;
  }
}

const getRandomReplies = (
  topicDetail: TopicDetail,
  count: number,
): string[] => {
  if (!topicDetail.replies) {
    throw new Error("topicDetail.replies is undefined");
  }

  const contents = topicDetail.replies.map((reply) => reply.content || "");
  const randomContents: string[] = [];

  if (contents.length <= count) {
    for (let i = 0; i < count; i++) {
      randomContents.push(topicDetail.content || topicDetail.title || "");
    }
    return randomContents;
  }

  let avoidDuplicates = true;

  if (contents.length <= count) {
    avoidDuplicates = false;
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * contents.length);
    randomContents.push(contents[randomIndex]);
    if (avoidDuplicates) {
      contents.splice(randomIndex, 1); // Remove the selected content from the array to avoid duplicates
    }
  }

  return randomContents;
};

const ActionButtonToReply = async (selector: string) => {
  try {
    const element = document.querySelector(selector) as HTMLElement;
    console.log(element, selector);

    if (!element) throw new Error("无法找到进行回复的按钮。");

    element.click();
    addLogItem(`已点击进行回复的按钮，即将继续...`);
    await Standby(0.1);

    return true;
  } catch (error) {
    MakeError(error);
    return false;
  }
};

const ActionTextAreaToReply = async (selector: string) => {
  try {
    const element = document.querySelector(selector) as HTMLInputElement;

    if (!element) throw new Error("无法找到用于回复的文本区域。");

    element.click();
    element.focus();
    addLogItem(`已找到用于回复的文本区域，等待回复...`);
    await Standby(0.1);

    return element;
  } catch (error) {
    MakeError(error);
  }
};

const ActionButtonToSubmit = async ({
  selector,
  textarea,
  contextToReply,
}: {
  selector: string;
  textarea: HTMLInputElement | undefined;
  contextToReply: string[];
}) => {
  try {
    const element = document.querySelector(selector) as HTMLElement;

    if (!element || !textarea) throw new Error("Required elements not found.");

    for (let i = 0; i < contextToReply.length; i++) {
      textarea.value = contextToReply[i];
      addLogItem(`Reply ${contextToReply[i]} filled, waiting to submit...`);
      if (currentVersion === "legacy") {
        // AppendHashSuccess();
        element.addEventListener("click", function (event) {
          event.preventDefault();
        });
      }
      await Standby(0.8);
      element.click();
      textarea.value = "";
      if (i === contextToReply.length - 1) {
        continue;
      }
      await Standby(1);
      addLogItem(`Reply submitted, waiting to continue...`);
    }
    return true;
  } catch (error) {
    MakeError(error);
  }
};
