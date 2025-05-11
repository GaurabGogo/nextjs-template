// hooks/useToasts.js

import { toast } from "react-toastify";

const useToasts = () => {
  const showSuccess = (message: string) => {
    toast.success(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        color: "#fff",
      },
    });
  };

  const showError = (message: string) => {
    toast.error(message, {
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      style: {
        color: "#fff",
      },
    });
  };

  return { showSuccess, showError };
};

export default useToasts;
