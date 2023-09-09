import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slice";
import unosReducer from "./slice";
import grupaNalogaReducer from "./slice";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "persist/PERSIST",
          "persist/REHYDRATE",
          "persist/PURGE",
        ],
      },
    }),
});

export const persistor = persistStore(store);

export default store;

export type RootState = ReturnType<typeof store.getState>;
