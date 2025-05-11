"use client";

import * as React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setTheme, themeConfig } from "@/redux/features/theme/themeSlice";
import { Radio, RadioGroup } from "@heroui/react";

export default function ThemeSelector() {
  const themes = Object.keys(themeConfig);
  const { theme } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const themeName = event.target.value;
    localStorage.setItem("theme", themeName);
    dispatch(setTheme(themeName));
  };

  return (
    <section className="p-4">
      <RadioGroup
        color="success"
        label="Select your Theme"
        value={theme}
        onChange={handleThemeChange}
      >
        {themes.map((themeItem) => (
          <Radio key={themeItem} value={themeItem}>
            <div className="text-primary">{themeItem}</div>
          </Radio>
        ))}
      </RadioGroup>
      <div className="grid grid-cols-4 gap-4 md:grid-cols-2 mt-4">
        <div className="bg-primary text-primary flex items-center justify-center text-center text-4xl font-bold h-60 ">
          bg-primary text-primary
        </div>
        <div className="bg-secondary text-secondary flex items-center justify-center text-center text-4xl font-bold h-60">
          bg-secondary text-secondary
        </div>
        <div className="bg-danger text-primary flex items-center justify-center text-center text-4xl font-bold h-60">
          bg-danger text-primary
        </div>
        <div className="bg-success text-primary flex items-center justify-center text-center text-4xl font-bold h-60 ">
          bg-success text-primary
        </div>
        <div className="border-2 border-primary text-secondary flex items-center justify-center text-center text-4xl font-bold h-60 ">
          border-primary text-secondary
        </div>
        <div className="border-2 border-secondary text-secondary flex items-center justify-center text-center text-4xl font-bold h-60 ">
          border secondary text-secondary
        </div>
      </div>
    </section>
  );
}
