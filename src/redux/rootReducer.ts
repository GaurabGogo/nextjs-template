import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import themeReducer from "./features/theme/themeSlice";
import currentUserReducer from "./features/user/user-slice";
import sidebarReducer from "./features/sidebar/sidebar-slice";
import { authApi } from "./services/auth/authApi";

// Configuration for Redux Persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["theme"],
};

// Root reducer (excluding RTK Query APIs from persistence)
const rootReducer = combineReducers({
  theme: themeReducer,
  currentUser: currentUserReducer,
  sidebar: sidebarReducer,
  [authApi.reducerPath]: authApi.reducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
