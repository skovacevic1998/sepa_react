import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import userReducer from "./userSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // No need to blacklist any actions
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
