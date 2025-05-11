"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for a theme
interface ThemeConfig {
  dir: string;
}

// Define the dynamic state interface
interface ThemeState {
  theme: string;
  dir: string;
}

// Example configuration for themes
export const themeConfig: Record<string, ThemeConfig> = {
  default: { dir: "default" },
  dark: { dir: "dark" },
};

// Set the initial state dynamically based on the configuration
const defaultTheme = "default"; // Define the default theme dynamically

const initialState: ThemeState = {
  theme: defaultTheme,
  dir: themeConfig[defaultTheme]?.dir,
};

// Create the slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<string>) => {
      const selectedTheme = action.payload;
      if (themeConfig[selectedTheme]) {
        state.theme = selectedTheme;
        state.dir = themeConfig[selectedTheme].dir;
      } else {
        console.warn(
          `Theme "${selectedTheme}" is not defined in the configuration.`
        );
      }
    },
    addTheme: (
      state,
      action: PayloadAction<{ themeName: string; config: ThemeConfig }>
    ) => {
      const { themeName, config } = action.payload;
      themeConfig[themeName] = config; // Add theme dynamically
    },
  },
});

// Export actions and reducer
export const { setTheme, addTheme } = themeSlice.actions;
export default themeSlice.reducer;
