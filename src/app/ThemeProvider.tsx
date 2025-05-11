"use client";

import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "../redux/features/theme/themeSlice";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      dispatch(setTheme(savedTheme));
    }
  }, [dispatch]);

  return <div data-theme={theme}>{children}</div>;
};

export default ThemeProvider;
