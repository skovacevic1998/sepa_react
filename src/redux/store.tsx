import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import userReducer from "./userSlice";
import unosReducer from "./unoSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [], // No need to blacklist any actions
};

const persistedReducerUser = persistReducer(persistConfig, userReducer);
const persistedReducerUnos = persistReducer(persistConfig, unosReducer);

const store = configureStore({
  reducer: {
    user: persistedReducerUser,
    unosNaloga: persistedReducerUnos,
  },
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
