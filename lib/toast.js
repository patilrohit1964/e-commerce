import { toast } from "sonner";

export const showToast = (type, message) => {
  const commonOptions = {
    position: "top-right",
    style: { backgroundColor: "gray", color: "white" },
  };

  switch (type) {
    case "success":
      return toast.success(message, commonOptions);
    case "info":
      return toast.info(message, commonOptions);
    case "error":
      return toast.error(message, commonOptions);
    default:
      console.warn("Toast type not recognized:", type);
      return;
  }
};
