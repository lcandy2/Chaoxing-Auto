import {List, ListItem, ListItemText} from "@mui/material";
import {Provider, useAtom} from "jotai";
import {logItemsAtom, topicStore} from "@topic/lib/atoms";
import {useLogStore} from "@topic/lib/store";

// const LogList = ({param: {logItems}}) => {
//   return (
//       <List
//           dense
//           sx={{}}
//       >
//         {logItems.map((item, index) => (
//             <ListItem key={index}>
//               <ListItemText primary={item}
//                             sx={{typography: 'overline', lineHeight: 'normal', px: 0, my: 0}}
//                             disableTypography/>
//             </ListItem>
//         ))}
//       </List>
//   )
// }

// export default function Status() {
//   const [logItems] = useAtom(logItemsAtom);
//   return (
//       <Provider store={topicStore}>
//       <LogList param={{logItems}}/>
//       </Provider>
//   )
// }

export default function Status() {
  const {logItems} = useLogStore();
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
