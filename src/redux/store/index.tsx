import { configureStore } from '@reduxjs/toolkit';
import semesterReducer from "@redux/reducers/semester.reducer";
import appReducer from "@redux/reducers/app.reducer";

export const store = configureStore({
  reducer: {
    semester: semesterReducer,
    app: appReducer
  }
});
export type RootState = ReturnType<typeof store.getState>
