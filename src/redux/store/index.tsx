import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from "@redux/reducers/calendar.reducer";
import appReducer from "@redux/reducers/app.reducer";
import authReducer from "@redux/reducers/auth.reducer";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    app: appReducer,
    auth: authReducer
  }
});
export type RootState = ReturnType<typeof store.getState>
