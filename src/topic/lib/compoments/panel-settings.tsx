import { List, ListItem } from "@mui/material";
import NumberInput from "@topic/lib/compoments/number-input";
import { useSettingsStore } from "@topic/lib/store";

export default function Settings() {
  const { standbyTime, setStandbyTime } = useSettingsStore();
  const { replyCountTimes, setReplyCountTimes } = useSettingsStore();
  const { newTopicCountTimes, setNewTopicCountTimes } = useSettingsStore();
  const hasHydrated = useSettingsStore((state) => state._hasHydrated);

  if (!hasHydrated) {
    return <p>Loading...</p>;
  }

  return (
    <List sx={{}}>
      <ListItem sx={{ pt: 3 }}>
        <NumberInput
          label="评论数量"
          min={1}
          max={10}
          value={replyCountTimes}
          onChange={setReplyCountTimes}
          size="small"
          style={{ width: 130 }}
        />
      </ListItem>
      {/*<ListItem sx={{ pt: 3 }}>*/}
      {/*  <NumberInput*/}
      {/*    label="发起讨论数量"*/}
      {/*    min={1}*/}
      {/*    max={10}*/}
      {/*    value={newTopicCountTimes}*/}
      {/*    onChange={setNewTopicCountTimes}*/}
      {/*    size="small"*/}
      {/*    style={{ width: 130 }}*/}
      {/*  />*/}
      {/*</ListItem>*/}
      <ListItem sx={{ pt: 3 }}>
        <NumberInput
          label="间隔时间（ms）"
          min={100}
          max={10000}
          value={standbyTime}
          step={100}
          onChange={setStandbyTime}
          size="small"
          style={{ width: 200 }}
        />
      </ListItem>
      <ListItem sx={{ pt: 3 }}></ListItem>
    </List>
  );
}
