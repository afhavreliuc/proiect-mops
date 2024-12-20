import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  // add more here
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }), // should be fixed maybe?
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
