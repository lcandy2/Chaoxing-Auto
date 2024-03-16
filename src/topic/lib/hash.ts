import { SuccessType } from "@topic/lib/types";

const hash = window.location.hash;

const HashStart = "cxauto_start";
const HashSuccess = "cxauto_success_";
const HashActionTrigger = "cxauto_action_trigger";
const HashActionReplyIndex = "cxauto_action_reply_index_";

const appendHash = (text: string) => {
  if (hash.includes(text)) return;
  window.history.replaceState(null, "", `${hash}#${text}`);
};

export const GetHashStart = () => {
  const text = HashStart;
  // console.debug("GetHashStart", hash, hash.includes(text));
  return hash.includes(text);
};

export const GetHashSuccess = () => {
  const text = HashSuccess;
  const type = hash.match(new RegExp(`${text}(\\w+)`));
  if (type) {
    return type[1];
  }
  return hash.includes(text.slice(0, -1));
};

export const GetHashActionTrigger = () => {
  const text = HashActionTrigger;
  // console.debug("GetHashSuccess", hash, hash.includes(text));
  return hash.includes(text);
};

export const GetHashActionReplyIndex = () => {
  const text = HashActionReplyIndex;
  const index = hash.match(new RegExp(`${text}(\\d+)`));
  if (index) {
    return parseInt(index[1]);
  }
  return 0;
};

export const AppendHashStart = (url?: string) => {
  const text = HashStart;
  if (url) {
    return `${url}#${text}`;
  } else {
    appendHash(text);
    return true;
  }
};

export const AppendHashSuccess = (type?: SuccessType, url?: string) => {
  const text = HashSuccess + type;
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};

export const AppendHashActionTrigger = (url?: string) => {
  const text = HashActionTrigger;
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};

export const AppendHashActionReplyIndex = (index: number, url?: string) => {
  const text = `${HashActionReplyIndex}${index}`;
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};

export const AppendHashActionType = (type: string, url?: string) => {};
