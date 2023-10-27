import { toast } from "react-toastify";

export const successToast = (message, duration = 5000) => {
  toast.success(message, { autoClose: duration });
};

export const errorToast = (message, duration = 5000) => {
  toast.error(message, { autoClose: duration });
};

export const warningToast = (message, duration = 5000) => {
  toast.warning(message, { autoClose: duration });
};
