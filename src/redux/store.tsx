import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";
import unosReducer from "./unoSlice";
import grupaNalogaReducer from "./grupaSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [],
};

const persistedReducerUser = persistReducer(persistConfig, userReducer);
const persistedReducerUnos = persistReducer(persistConfig, unosReducer);
const persistedReducerGrupa = persistReducer(persistConfig, grupaNalogaReducer);

const store = configureStore({
  reducer: {
    user: persistedReducerUser,
    unosNaloga: persistedReducerUnos,
    grupaNaloga: persistedReducerGrupa,
  },
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
