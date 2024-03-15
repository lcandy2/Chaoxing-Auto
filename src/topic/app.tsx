import "./lib/css/floating-overlay.css";
import Draggable from "react-draggable";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Tab,} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {useEffect, useState} from "react";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import useGMValue from "@topic/lib/hooks/use-gm-value";
import About from "@topic/lib/compoments/panel-about";
import Settings from "@topic/lib/compoments/panel-settings";
import Status from "@topic/lib/compoments/panel-status";
import PanelActions from "@topic/lib/compoments/panel-actions";
import {CurrentTab} from "@topic/lib/types";

export default function App() {
  const [open, setOpen] = useState(true);
  // const [tab, setTab] = useGMValue("topic_replyTab", "status")
    const [tab, setTab] = useState<CurrentTab>("status");

  const handleClose = () => {
    setOpen(false);
  }

  const handleTabChange = (_: Event, newValue: CurrentTab) => {
    setTab(newValue);
  };

  return (
      open && (
          <Draggable
              handle="#draggable-dialog-title"
              cancel={'[class*="MuiDialogContent-root"]'}
          >
            <div
                className={"floating-overlay"}>
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
                  <CloseIcon/>
                </IconButton>
                <DialogContent dividers sx={{p: 0}}>
                  <DialogContentText>
                    <TabContext value={tab}>
                      <TabList onChange={handleTabChange} aria-label="lab API tabs example">
                        <Tab label="状态" value="status"/>
                        <Tab label="设定" value="settings"/>
                        <Tab label="关于" value="about"/>
                      </TabList>
                      <TabPanel value="status" sx={{
                        p: 0,
                        maxWidth: 280,
                        maxHeight: 300,
                        minWidth: 260,
                        minHeight: 200,
                        overflow: 'auto'
                      }}>
                        <Status/>
                      </TabPanel>
                      <TabPanel value="settings" sx={{
                        p: 0,
                        maxWidth: 280,
                        maxHeight: 300,
                        minWidth: 260,
                        minHeight: 200,
                        overflow: 'auto'
                      }}>
                        <Settings/>
                      </TabPanel>
                      <TabPanel value="about" sx={{
                        maxWidth: 280,
                        maxHeight: 300,
                        minWidth: 260,
                        minHeight: 200,
                        overflow: 'auto',
                      }}>
                        <About/>
                      </TabPanel>
                    </TabContext>

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
