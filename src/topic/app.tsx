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

export default function App() {
  const [open, setOpen] = useState(true);
  const nodeRef = React.useRef(null);

  const handleClose = () => {
    setOpen(false);
  }

  return (
      open && (
          <Draggable
              handle="#draggable-dialog-title"
              cancel={'[class*="MuiDialogContent-root"]'}
              nodeRef={nodeRef}
          >
            <div
                className={"floating-overlay"}
                ref={nodeRef}>
              <Dialog
                  open={open}
                  hideBackdrop
                  disableEnforceFocus
                  disableAutoFocus
                  disableScrollLock
                  disablePortal
                  maxWidth={"xs"}
                  aria-labelledby="draggable-dialog-title"
                  container={() => document.querySelector('.floating-overlay') as HTMLElement}
              >
                <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
                  学习通自动化
                </DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                >
                  <Icon>close</Icon>
                </IconButton>
                <DialogContent dividers sx={{p: 0}}>
                  <DialogContentText component={'div'}>
                    <TabPanel/>
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <PanelActions/>
                </DialogActions>
              </Dialog>
            </div>
          </Draggable>

      )
  );
}
