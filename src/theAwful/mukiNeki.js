import { configureStore } from "@reduxjs/toolkit";
import { createStranka } from "./theAwfulSlice";

export const predaja = configureStore({
  reducer: {
    stranka: createStranka,
  },
});
