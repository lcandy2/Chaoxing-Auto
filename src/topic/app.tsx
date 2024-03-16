import "./lib/css/floating-overlay.css";
import PanelActions from "@topic/lib/compoments/panel-actions";
import TabPanel from "@topic/lib/compoments/tab-panel";
import "@topic/lib/css/mui-icon-fonts.css";
import DraggableFloatingDialog from "@topic/lib/compoments/draggable-floating-dialog";
import { useStatusStore } from "@topic/lib/store";
import React, { useState } from "react";

export default function App() {
  const [open, setOpen] = useState(true);
  const nodeRef = React.useRef(null);
  const {
    isInActionFrame,
    actionFrameStatus,
    setCurrentStatus,
    setCurrentPage,
  } = useStatusStore();
  const actionSrc = actionFrameStatus.src;

  const handleClose = () => {
    setOpen(false);
    setCurrentStatus(null);
    setCurrentPage(null);
  };

  return (
    open && (
      <>
        <DraggableFloatingDialog
          title="学习通自动化"
          actions={<PanelActions />}
          canBeClosed={!isInActionFrame}
          handleClose={handleClose}
        >
          <TabPanel />
        </DraggableFloatingDialog>
        {actionSrc && (
          <DraggableFloatingDialog
            title="--执行讨论回复中--"
            canBeClosed={false}
            draggableProps={{ positionOffset: { x: "300px", y: "30px" } }}
            maxWidth="sm"
          >
            <iframe
              id="cxauto_action"
              src={actionSrc}
              width="600"
              height="460"
            />
            <div id="cxauto_action" />
          </DraggableFloatingDialog>
        )}
      </>
    )
  );
}
