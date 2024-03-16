const hash = window.location.hash;

const appendHash = (text: string) => {
  if (hash.includes(text)) return;
  window.history.replaceState(null, "", `${hash}#${text}`);
};

export const GetHashStart = () => {
  const text = "cxauto_start";
  // console.debug("GetHashStart", hash, hash.includes(text));
  return hash.includes(text);
};

export const GetHashSuccess = () => {
  const text = "cxauto_success";
  // console.debug("GetHashSuccess", hash, hash.includes(text));
  return hash.includes(text);
};

export const GetHashAction = () => {
  const text = "cxauto_action";
  // console.debug("GetHashSuccess", hash, hash.includes(text));
  return hash.includes(text);
};

export const GetHashIndex = () => {
  const text = "cxauto_index_";
  const index = hash.match(/cxauto_index_(\d+)/);
  if (index) {
    return parseInt(index[1]);
  }
  return 0;
};

export const AppendHashStart = (url?: string) => {
  const text = "cxauto_start";
  if (url) {
    return `${url}#${text}`;
  } else {
    appendHash(text);
    return true;
  }
};

export const AppendHashSuccess = (url?: string) => {
  const text = "cxauto_success";
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};

export const AppendHashAction = (url?: string) => {
  const text = "cxauto_action";
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};

export const AppendHashActionIndex = (index: number, url?: string) => {
  const text = `#cxauto_index_${index}`;
  if (url) {
    return `${url}#${text}`;
  }
  appendHash(text);
  return true;
};
