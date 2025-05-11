import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialStateTypes {
  isSidebarCollapsed: boolean;
}

const initialState: initialStateTypes = {
  isSidebarCollapsed: false,
};

export const sidebarSlice = createSlice({
  name: "studioSidebar",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed } = sidebarSlice.actions;
export default sidebarSlice.reducer;
