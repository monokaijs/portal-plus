import { configureStore } from '@reduxjs/toolkit';
import semesterReducer from "@redux/reducers/semester.reducer";
import appReducer from "@redux/reducers/app.reducer";
import authReducer from "@redux/reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    semester: semesterReducer,
    app: appReducer,
    auth: authReducer
  }
});
export type RootState = ReturnType<typeof store.getState>
