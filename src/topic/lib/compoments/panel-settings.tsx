import {List, ListItem} from "@mui/material";
import NumberInput from "@topic/lib/compoments/number-input";
import {useAtom} from "jotai";
import {countAtom, standbyTimeAtom} from "@topic/lib/atom";

export default function Settings() {
  const [count, setCount] = useAtom(countAtom);
  const [standbyTime, setStandbyTime] = useAtom(standbyTimeAtom);

  // useEffect(() => {
  //   GM_setValue("topic_replyCountTimes", count);
  // }, [count]);
  // useEffect(() => {
  //   GM_setValue("topic_replyStandbyTime", standbyTime);
  // }, [standbyTime]);

  return <List
      sx={{}}
  >
    <ListItem sx={{pt: 3}}>
      <NumberInput
          label="评论数量"
          min={1}
          max={10}
          initialValue={count}
          onChange={setCount}
          size="small"
          style={{width: 130}}
      />
    </ListItem>
    <ListItem sx={{pt: 3}}>
      <NumberInput
          label="间隔时间（ms）"
          min={100}
          max={10000}
          initialValue={standbyTime}
          step={100}
          onChange={setStandbyTime}
          size="small"
          style={{width: 200}}
      />
    </ListItem>
    <ListItem sx={{pt: 3}}>
    </ListItem>
  </List>;
}
