import { useLogStore } from "@topic/lib/store";
import { CurrentVersion } from "@topic/lib/types";
import { LegacyMatch, NewMatch } from "@topic/match";

const currentVersion: CurrentVersion = (() => {
  if (NewMatch() && !LegacyMatch()) return "new";
  if (LegacyMatch() && !NewMatch()) return "legacy";
  return null;
})();

export default function MakeError(message: any) {
  const addLogItem = useLogStore.getState().addLogItem;

  let version;
  addLogItem(`----- 执行失败 -----`);
  addLogItem(message.toString());
  addLogItem(`-v=${currentVersion}`);
  console.error(message, currentVersion);
}
