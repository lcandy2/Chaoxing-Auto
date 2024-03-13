import {List, ListItem, ListItemText} from "@mui/material";
import {Provider, useAtom} from "jotai";
import {logItemsAtom, topicStore} from "@topic/lib/atom";

const LogList = () => {
  const [logItems] = useAtom(logItemsAtom);

  return (
      <List
          dense
          sx={{}}
      >
        {logItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemText primary={item}
                            sx={{typography: 'overline', lineHeight: 'normal', px: 0, my: 0}}
                            disableTypography/>
            </ListItem>
        ))}
      </List>
  )
}

export default function Status() {
  return (
        <Provider store={topicStore}>
          <LogList />
        </Provider>
  )
}
