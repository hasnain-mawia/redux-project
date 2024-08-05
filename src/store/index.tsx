import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./cartSlice";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, CartReducer);

const store = configureStore({
    reducer: persistedReducer
});

  const persistor = persistStore(store);

  export { store, persistor }