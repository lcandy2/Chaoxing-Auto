const hash = window.location.hash;

export const HashStart = () => {
  const text = "cxauto_start";
  return hash.includes(text);
}

export const HashSuccess = () => {
  const text = "cxauto_success";
  return hash.includes(text);
}
