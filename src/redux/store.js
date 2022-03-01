import { configureStore } from "@reduxjs/toolkit";

import defaultSidebarSlice from "redux/slices/defaultSidebarSlice";
import messageBoxSlice from "redux/slices/messageBoxSlice";
import dialogSlice from "redux/slices/dialogSlice";
import circleLoadingSlice from "redux/slices/circleLoadingSlice";

const store = configureStore({
  reducer: {
    defaultSidebar: defaultSidebarSlice.reducer,
    messageBox: messageBoxSlice.reducer,
    dialog: dialogSlice.reducer,
    circleLoading: circleLoadingSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
