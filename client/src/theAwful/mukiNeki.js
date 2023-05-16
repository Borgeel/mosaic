import { configureStore } from "@reduxjs/toolkit";
import createStranka from "./bake";

export default configureStore({
  reducer: {
    stranka: createStranka,
  },
});
