import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginData, IUserInfoResponse } from "../../types";
import { getData, setData } from "../../services/StorageService";
import AuthService from "../../services/AuthService";
import { defaultAccountInfo } from "@config/default-data";

export const loadAppData = createAsyncThunk(
  "app/loadAppData",
  async (thunkAPI) => {
    const isLoggedIn = await AuthService.getLoginStatus();
    const loginData = await AuthService.getLoginData();
    const userInfo = await AuthService.getUserInfo();

    if (isLoggedIn) await AuthService.refreshAuthData();

    return {
      isLoggedIn,
      loginData,
      userInfo,
    }
  },
);

const appSlice = createSlice({
  name: "app",
  initialState: {
    appReady: false,
    isLoggedIn: false,
    authModalShown: false,
    programPickerModalShown: false,
    loginData: {
    },
    userInfo: defaultAccountInfo,
  },
  reducers: {
    setLoginStatus(state, action: PayloadAction<boolean>) {
      setData("isLoggedIn", action.payload).then(() => {
        console.log("login state = ", action.payload);
      });
      state.isLoggedIn = action.payload;
    },
    setLoginData(state, action: PayloadAction<ILoginData>) {
      state.loginData = action.payload;
    },
    setProgramPickerShown(state, action: PayloadAction<boolean>) {
      state.programPickerModalShown = action.payload;
    },
    setAuthModalShown(state, action: PayloadAction<boolean>) {
      state.authModalShown = action.payload;
    },
    setAppReady(state, action: PayloadAction<boolean>) {
      state.appReady = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loadAppData.fulfilled, (state, action) => {
      state.loginData = action.payload.loginData;
      state.isLoggedIn = action.payload.isLoggedIn;
      state.appReady = true;
    });
  },
});

export const {
  setLoginStatus,
  setAppReady,
  setAuthModalShown,
  setProgramPickerShown,
  setLoginData,
} = appSlice.actions;
export default appSlice.reducer;
