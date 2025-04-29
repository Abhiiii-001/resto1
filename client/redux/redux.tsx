"use client"
import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/redux/states/globalSlice";
import authReducer from "@/redux/states/authSlice"
import orderReducer from "@/redux/states/orderSlice"
import { authApi } from "@/redux/api/auth";
import { restaurantApi } from "./api/restaurant";
import { categoryApi } from "./api/category";
import { productApi } from "./api/products";
import { employeeApi } from "./api/employee";
import { orderApi } from "./api/order";
import { dashboardApi } from "./api/dashboard";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global" , "auth","order"],
};
const rootReducer = combineReducers({
  global: globalReducer,
  auth: authReducer,
  order: orderReducer,
  [authApi.reducerPath]: authApi.reducer,
  [restaurantApi.reducerPath]: restaurantApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [employeeApi.reducerPath]:employeeApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(authApi.middleware)
      .concat(restaurantApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(employeeApi.middleware)
      .concat(orderApi.middleware)
      .concat(dashboardApi.middleware)
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }
 const persistor = persistStore(storeRef.current);
 persistorRef = persistor;

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

let persistorRef: ReturnType<typeof persistStore> | null = null;

export function getPersistor() {
  return persistorRef;
}

