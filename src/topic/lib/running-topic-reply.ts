import {LegacyDetailMatch, NewDetailMatch} from "@topic/match";
import {useContext} from "react";
import {TopicDetail} from "@topic/lib/get-topic-detail";

const newDetailMatch = NewDetailMatch();
const legacyDetailMatch = LegacyDetailMatch();

const {addLogItem} = useContext(TopicContext);
export default function RunningTopicReply() {

  try {
    if (contextToReply.length <= 0) {
      throw new Error('未获取到讨论回复');
    }

    let buttonToReply;
    let textAreaToReply;
    let buttonToSubmit;

    if (newDetailMatch && !legacyDetailMatch) {
      const replyBtn = document.querySelector('div.topicDetail_detail div.replyBtn');
      const replyEdit = document.querySelector('div.topicDetail_editContainer div.replyEdit textarea');
      const addReply = document.querySelector('div.replyEditBtnGroup div.addReply');

      if (replyBtn && replyEdit && addReply) {
        buttonToReply = replyBtn;
        textAreaToReply = replyEdit;
        buttonToSubmit = addReply;
      } else {
        throw new Error('找不到新版讨论回复按钮');
      }
    } else if (legacyDetailMatch && !newDetailMatch) {
      const replyBtn = document.querySelector('div.oneDiv p.clearfix a.tl1');
      const replyEdit = document.querySelector('div.plDiv div.hfpl textarea');
      const addReply = document.querySelector('div.plDiv div.hfpl input.grenBtn');

      if (replyBtn && replyEdit && addReply) {
        buttonToReply = replyBtn;
        textAreaToReply = replyEdit;
        buttonToSubmit = addReply;
      } else {
        throw new Error('找不到旧版讨论回复按钮');
      }
    }

    if (buttonToReply && textAreaToReply && buttonToSubmit) {
      buttonToReply.click();
      textAreaToReply.click();
      textAreaToReply.focus();
      for (let i = 0; i < contextToReply.length; i++) {
        textAreaToReply.value = contextToReply[i];
        buttonToSubmit.click();
      }
    }
  } catch (error) {
    console.error(error);
  }
}

const getRandomReplies = (topicDetail: TopicDetail, count: number): string[] => {
  if (!topicDetail.replies || topicDetail.replies.length === 0) {
    return [];
  }

  const contents = topicDetail.replies.map(reply => reply.content || '');
  const randomContents: string[] = [];

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
}

const ActionButtonToReply = async () => {
  const contextToReply = getRandomReplies(topicDetail, count);
  try {
    let buttonToReply;

    if (newDetailMatch && !legacyDetailMatch) {
      const replyBtn = document.querySelector('div.topicDetail_detail div.replyBtn');

      if (replyBtn) {
        buttonToReply = replyBtn;
      } else {
        throw new Error('Cannot Find New Button to Reply');
      }
    } else if (legacyDetailMatch && !newDetailMatch) {
      const replyBtn = document.querySelector('div.oneDiv p.clearfix a.tl1');

      if (replyBtn) {
        buttonToReply = replyBtn;
      } else {
        throw new Error('Cannot Find Legacy Button to Reply');
      }
    }

    if (buttonToReply) {
      buttonToReply.click();
      addLogItem(`Clicked Button to Reply, waiting...`);
      await StandBy();
    }
  } catch (error) {
    console.error(error);
    addLogItem(`回复讨论失败：${error}`);
  }
}

const ActionTextAreaToReply = async () => {
  try {
    let textAreaToReply;

    if (newDetailMatch && !legacyDetailMatch) {
      const replyEdit = document.querySelector('div.topicDetail_editContainer div.replyEdit textarea');

      if (replyEdit) {
        textAreaToReply = replyEdit;
      } else {
        throw new Error('Cannot Find New Textarea');
      }
    } else if (legacyDetailMatch && !newDetailMatch) {
      const replyEdit = document.querySelector('div.plDiv div.hfpl textarea');

      if (replyEdit) {
        textAreaToReply = replyEdit;
      } else {
        throw new Error('Cannot Find Legacy Textarea');
      }
    }

    if (textAreaToReply) {
      textAreaToReply.click();
      textAreaToReply.focus();
      addLogItem(`Find Textarea, waiting to reply...`);
      await StandBy();
    }
  } catch (error) {
    console.error(error);
    addLogItem(`回复讨论失败：${error}`);
  }
}

const ActionButtonToSubmit = async () => {
  const {topicDetail, count} = useContext(TopicContext);
  const contextToReply = getRandomReplies(topicDetail, count);

  try {
    let buttonToSubmit;

    if (newDetailMatch && !legacyDetailMatch) {
      const addReply = document.querySelector('div.replyEditBtnGroup div.addReply');

      if (addReply) {
        buttonToSubmit = addReply;
      } else {
        throw new Error('Cannot find new submit button.');
      }
    } else if (legacyDetailMatch && !newDetailMatch) {
      const addReply = document.querySelector('div.plDiv div.hfpl input.grenBtn');

      if (addReply) {
        buttonToSubmit = addReply;
      } else {
        throw new Error('Cannot find legacy submit button.');
      }
    }

    if (buttonToSubmit) {
      for (let i = 0; i < contextToReply.length; i++) {
        buttonToSubmit.value = contextToReply[i];
        StandBy(0.5);
        addLogItem(`Reply ${contextToReply[i]} filled, waiting to submit...`);
        buttonToSubmit.click();
        if (i === contextToReply.length - 1) {
          continue;
        }
        StandBy(1);
        addLogItem(`Reply submitted, waiting for next...`);
      }
      addLogItem(`All Done!`);
    }
  } catch (error) {
    console.error(error);
    addLogItem(`回复讨论失败：${error}`);
  }
}

const Standby = async (times: number = 1) => {

  return new Promise(resolve => setTimeout(resolve, standbyTime * times));
}
