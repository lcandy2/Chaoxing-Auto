import { useStatusStore } from "@topic/lib/store";

export const PostMessageSuccess = (index: number) => {
  const message = {
    type: "cxauto_action_frame",
    status: "success",
    index: index,
  };
  console.debug("PostMessageSuccess", message);
  window.parent.postMessage(message, "*");
};

export const ReceiveMessage = () => {
  window.addEventListener("message", (event) => {
    console.debug("ReceiveMessage", event.data);
    if (event.data.type === "cxauto_action_frame") {
      const status = useStatusStore.getState().actionFrameStatus.status;
      const index = useStatusStore.getState().actionFrameStatus.index;
      if (
        event.data.status === "success" &&
        status === "running" &&
        index === event.data.index
      ) {
        useStatusStore.getState().setActionFrameStatusStatus("success");
      }
    }
  });
};
