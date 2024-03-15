import "./lib/css/floating-overlay.css";
import Draggable from "react-draggable";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, Icon,
  IconButton,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import PanelActions from "@topic/lib/compoments/panel-actions";
import TabPanel from "@topic/lib/compoments/tab-panel";
import "@topic/lib/css/mui-icon-fonts.css";
import DraggableFloatingDialog from "@topic/lib/compoments/draggable-floating-dialog";

export default function App() {
  const [open, setOpen] = useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = () => {
    setOpen(false);
  }

  return (
      open && (
          <DraggableFloatingDialog title="学习通自动化" actions={<PanelActions/>}>
            <TabPanel/>
          </DraggableFloatingDialog>
      )
  );
}
