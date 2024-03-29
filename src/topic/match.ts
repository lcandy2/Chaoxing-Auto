import * as Config from "@topic/config";

const href = window.location.href;

export const Match = () => {
  return NewMatch() || LegacyMatch();
};

// New Topic Match
export const NewMatch = () => {
  return NewListMatch() || NewDetailMatch();
};

// Legacy Topic Match
export const LegacyMatch = () => {
  return LegacyListMatch() || LegacyDetailMatch();
};

// Topic List Match
export const ListMatch = () => {
  return NewListMatch() || LegacyListMatch();
};

// Topic Detail Match
export const DetailMatch = () => {
  return NewDetailMatch() || LegacyDetailMatch();
};

// New Topic List Match
export const NewListMatch = () => {
  const newListPath = Config.NEW_LIST.href;
  const newListMatch = href.includes(newListPath);
  return newListMatch;
};

// Legacy Topic List Match
export const LegacyListMatch = () => {
  const legacyListPath = Config.LEGACY_LIST.href;
  const legacyListMoocPath = Config.LEGACY_LIST_MOOC.href;
  const legacyListMatch =
    href.includes(legacyListPath) || href.includes(legacyListMoocPath);
  return legacyListMatch;
};

// New Topic Detail Match
export const NewDetailMatch = () => {
  const newDetailPath = Config.NEW_DETAIL.href;
  const newDetailMatch = href.includes(newDetailPath);
  return newDetailMatch;
};

// Legacy Topic Detail Match
export const LegacyDetailMatch = () => {
  const legacyDetailPath = Config.LEGACY_DETAIL.href;
  const legacyDetailMoocPath = Config.LEGACY_DETAIL_MOOC.href;
  const legacyDetailMatch =
    href.includes(legacyDetailPath) || href.includes(legacyDetailMoocPath);
  return legacyDetailMatch;
};
