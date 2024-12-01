import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth.reducer";
import taskReducer from './reducers';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer
  },
});
