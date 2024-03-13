import {LEGACY_DETAIL, LEGACY_DETAIL_MOOC, NEW_DETAIL} from "../config.js";

export default function IsPageDetail() {
  const href = window.location.href;
  const legacyDetailPath = LEGACY_DETAIL.pathname;
  const legacyDetailMoocPath = LEGACY_DETAIL_MOOC.pathname;
  const newDetailPath = NEW_DETAIL.pathname;
  return href.includes(legacyDetailPath) || href.includes(newDetailPath) || href.includes(legacyDetailMoocPath);
}
