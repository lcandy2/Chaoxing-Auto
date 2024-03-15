import {
  Breakpoint,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText, DialogProps,
  DialogTitle,
  Icon,
  IconButton
} from "@mui/material";
import Draggable, {DraggableProps} from "react-draggable";
import React, {useState} from "react";

interface DraggableFloatingDialogProps {
  title: string;
  canBeClosed?: boolean;
  handleClose?: () => void;
  actions?: React.ReactNode;
  draggableProps?: Partial<DraggableProps>;
  dialogProps?: Partial<DialogProps>;
  maxWidth?: Breakpoint;
}

export default function DraggableFloatingDialog({
                                                  title,
                                                  canBeClosed = true,
                                                  handleClose,
                                                  actions,
                                                  draggableProps,
                                                  dialogProps,
                                                  maxWidth,
                                                  children
                                                }: DraggableFloatingDialogProps & { children?: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  const nodeRef = React.useRef(null);

  const handleDialogClose = () => {
    setOpen(false);
    if (handleClose) {
      handleClose();
    }
  }

  return (
      open && (<Draggable
          handle="#draggable-dialog-title"
          cancel={'[class*="MuiDialogContent-root"]'}
          nodeRef={nodeRef}
          {...draggableProps}
      >
        <div
            className={"floating-overlay"}
            ref={nodeRef}>
          <Dialog
              open={true}
              hideBackdrop
              disableEnforceFocus
              disableAutoFocus
              disableScrollLock
              disablePortal
              maxWidth={maxWidth || "xs"}
              aria-labelledby="draggable-dialog-title"
              container={() => document.querySelector('.floating-overlay') as HTMLElement}
              {...dialogProps}
          >
            <DialogTitle style={{cursor: 'move'}} id="draggable-dialog-title">
              {title}
            </DialogTitle>

            {canBeClosed && (
                <IconButton
                    aria-label="close"
                    onClick={handleDialogClose}
                    sx={{
                      position: 'absolute',
                      right: 8,
                      top: 8,
                      color: (theme) => theme.palette.grey[500],
                    }}
                >
                  <Icon>close</Icon>
                </IconButton>
            )}
            <DialogContent dividers sx={{p: 0}}>
              <DialogContentText component={'div'}>
                {children}
              </DialogContentText>
            </DialogContent>
            {actions && (
                <DialogActions>
                  {actions}
                </DialogActions>
            )}
          </Dialog>
        </div>
      </Draggable>)
  )
}
