import { useStatusStore } from "@topic/lib/store";

export const PostMessageSuccess = () => {
  console.debug("PostMessageSuccess");
  window.parent.postMessage(
    { type: "cxauto_action_frame", status: "success" },
    "*",
  );
};

export const ReceiveMessage = () => {
  window.addEventListener("message", (event) => {
    if (event.data.type === "cxauto_action_frame") {
      const status = useStatusStore.getState().actionFrameStatus.status;
      if (event.data.status === "success" && status === "running") {
        useStatusStore.getState().setActionFrameStatusStatus("success");
      }
    }
  });
};
