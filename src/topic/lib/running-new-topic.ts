import {
  useLogStore,
  useSettingsStore,
  useStatusStore,
} from "@topic/lib/store";
import { TopicList } from "@topic/lib/types";
import MakeError from "@topic/lib/make-error";
import Standby from "@topic/lib/standby";
import { LegacyMatch, NewMatch } from "@topic/match";
import {
  LEGACY_LIST_ACTION_NEW_TOPIC_BUTTON,
  LEGACY_LIST_ACTION_NEW_TOPIC_SUBMIT,
  LEGACY_LIST_ACTION_NEW_TOPIC_TITLE_INPUT,
  NEW_DETAIL_ACTION_BUTTON_TO_SUBMIT,
  NEW_LIST_ACTION_NEW_TOPIC_BUTTON,
  NEW_LIST_ACTION_NEW_TOPIC_SUBMIT,
  NEW_LIST_ACTION_NEW_TOPIC_TITLE_INPUT,
} from "@topic/config";
import { GetHashActionNewTopicTitle } from "@topic/lib/hash";

export default async function RunningNewTopic() {
  const { newTopicCountTimes } = useSettingsStore.getState();
  const { topicList } = useStatusStore.getState();
  // const contextToCreateTopic: string[] = getRandomTitle(topicList, newTopicCountTimes);

  let elem1;
  let elem2;
  let elem3;

  if (NewMatch()) {
    elem1 = NEW_LIST_ACTION_NEW_TOPIC_BUTTON;
    elem2 = NEW_LIST_ACTION_NEW_TOPIC_TITLE_INPUT;
    elem3 = NEW_LIST_ACTION_NEW_TOPIC_SUBMIT;
  } else {
    elem1 = LEGACY_LIST_ACTION_NEW_TOPIC_BUTTON;
    elem2 = LEGACY_LIST_ACTION_NEW_TOPIC_TITLE_INPUT;
    elem3 = LEGACY_LIST_ACTION_NEW_TOPIC_SUBMIT;
  }

  const actionClickNewTopicButton = await ActionClickNewTopicButton(elem1);
  if (actionClickNewTopicButton) {
    let title = GetHashActionNewTopicTitle();

    if (title === "") {
      title = "如何学好该课程？";
    }
    const actionInputNewTopicTitle = await ActionInputNewTopicTitle(
      elem2,
      title,
    );
    if (actionInputNewTopicTitle) {
      const actionClickNewTopicSubmit = await ActionClickNewTopicSubmit(elem3);
      if (actionClickNewTopicSubmit) {
        return true;
      }
    }
  }
  return false;
}

const addLogItem = useLogStore.getState().addLogItem;

export const getRandomTitle = (topicList: TopicList[], count: number) => {
  const randomTitleList: string[] = [];

  const titleList: string[] = topicList
    .map((item) => item.title)
    .filter((title): title is string => title !== undefined);

  if (titleList.length <= 0) {
    for (let i = 0; i < count; i++) {
      randomTitleList.push("如何学好该课程？");
    }
    return randomTitleList;
  }

  let avoidDuplicates = true;

  if (titleList.length <= count) {
    avoidDuplicates = false;
  }

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * titleList.length);
    let randomTitle = titleList[randomIndex];
    if (avoidDuplicates) {
      titleList.splice(randomIndex, 1);
    }
    randomTitleList.push(randomTitle);
  }

  return randomTitleList;
};

const ActionClickNewTopicButton = async (selector: string) => {
  try {
    const element = document.querySelector(selector) as HTMLElement;
    console.log(element, selector);

    if (!element) throw new Error("无法找到发表讨论的按钮。");

    element.click();
    addLogItem(`已点击进行回复的按钮，即将继续...`);
    await Standby(0.3);

    return true;
  } catch (error) {
    MakeError(error);
    return false;
  }
};

const ActionInputNewTopicTitle = async (selector: string, title: string) => {
  try {
    const element = document.querySelector(selector) as HTMLInputElement;
    if (!element) throw new Error("无法找到输入标题的输入框。");

    element.click();
    element.focus();
    element.value = title;
    addLogItem(`已输入标题：${title}，即将继续...`);
    await Standby(1);

    return true;
  } catch (error) {
    MakeError(error);
    return false;
  }
};

const ActionClickNewTopicSubmit = async (selector: string) => {
  try {
    const element = document.querySelector(selector) as HTMLElement;
    if (!element) throw new Error("无法找到发表讨论的按钮。");

    addLogItem(`已点击发表讨论的按钮，即将继续...`);

    if (LegacyMatch()) {
      window.alert = () => {
        return false;
      };
    }

    element.click();
    await Standby(1);

    return true;
  } catch (error) {
    MakeError(error);
    return false;
  }
};
