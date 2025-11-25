import { combineReducers, configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import localStorage from "redux-persist/es/storage";

const authPersistConfig = {
  key: "auth",
  storage: localStorage,
};

const cartPersistConfig = {
  key: "cart",
  storage: localStorage,
};


const rootReducer = combineReducers({
  authStore: persistReducer(authPersistConfig, authReducer),
  cartStore: persistReducer(cartPersistConfig, cartReducer),
});


const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistReducers = rootReducer;


export const store = configureStore({
  reducer: persistReducers,
  middleware: (getDifaultMiddleware) =>
    getDifaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
