import { toast } from "sonner";

export const showToast = (type, message) => {
  const commonOptions = {
    position: "top-right",
    style: { backgroundColor: "gray", color: "white" },
  };

  switch (type) {
    case "success":
      return toast.success(message, {
        ...commonOptions,
        style: { backgroundColor: "green", color: "white" },
      });
    case "info":
      return toast.info(message);
    case "error":
      return toast.error(message, {
        ...commonOptions,
        style: { backgroundColor: "red", color: "white" },
      });
    default:
      console.warn("Toast type not recognized:", type);
      return;
  }
};
