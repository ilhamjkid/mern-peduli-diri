import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "../features/notes/noteSlice";
import userReducer from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    note: noteReducer,
  },
});
