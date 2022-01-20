import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfoResponse } from "../../types";
import { setData } from "../../services/StorageService";

const appSlice = createSlice({
  name: "account",
  initialState: {
    appReady: false,
    isLoggedIn: false,
    authModalShown: false
  },
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      setData("isLoggedIn", action.payload).then(() => {
        console.log("login state = ", action.payload);
      });
      state.isLoggedIn = action.payload;
    },
    setAuthModalShown(state, action: PayloadAction<boolean>) {
      state.authModalShown = action.payload;
    },
    setAppReady(state, action: PayloadAction<boolean>) {
      state.appReady = action.payload;
    },
  },
});

export const { setLoginStatus, setAppReady, setAuthModalShown } = appSlice.actions;
export default appSlice.reducer;
