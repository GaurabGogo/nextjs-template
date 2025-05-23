import { useState } from "react";

const usePasswordVisible = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return { isPasswordVisible, togglePasswordVisibility };
};

export default usePasswordVisible;
