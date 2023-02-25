import { configureStore } from "@reduxjs/toolkit";
import createStranka from "./theAwfulSlice";

export default configureStore({
  reducer: {
    stranka: createStranka,
  },
});
