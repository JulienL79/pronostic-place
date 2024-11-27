import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../features/dataSlice";

export const store = configureStore({
  reducer: {
    datas: dataReducer,
  },
});

export default store;