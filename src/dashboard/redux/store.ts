import { persistStore } from "redux-persist";
import { configureStore } from "@reduxjs/toolkit";
import { persistedReducer } from "./root-reducer";
import thunk from "redux-thunk";

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export default { store, persistor };
