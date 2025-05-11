import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUserId: null,
  currentUserRole: null,
  currentUserUsername: null,
};

// Create slice
const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUserId: (state, action) => {
      state.currentUserId = action.payload;
    },
    setCurrentUserRole: (state, action) => {
      state.currentUserRole = action.payload;
    },
    setCurrentUserUsername: (state, action) => {
      state.currentUserUsername = action.payload;
    },
    setCurrentUser: (state, action) => {
      const { id, role, username } = action.payload;
      state.currentUserId = id;
      state.currentUserRole = role;
      state.currentUserUsername = username;
    },
  },
});

// Export actions
export const {
  setCurrentUserId,
  setCurrentUserRole,
  setCurrentUserUsername,
  setCurrentUser,
} = currentUserSlice.actions;
export default currentUserSlice.reducer;
