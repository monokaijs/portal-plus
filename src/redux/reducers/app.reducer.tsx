import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppProgram, IAuthenticationResponse, ILoginData, ISemester, IUserInfoResponse } from "../../types";
import { getData, setData } from "../../services/StorageService";
import AuthService from "../../services/AuthService";
import { defaultAccountInfo } from "@config/default-data";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ApiService from "../../services/ApiService";
import { appSignIn, refreshAuthData } from "@redux/reducers/auth.reducer";
import { getCurrentSemester } from "@utils/get-current-semester";

export const loadAppData = createAsyncThunk("app/loadAppData", async (_, thunkAPI) => {
  const isLoggedIn = await AuthService.getLoginStatus();
  const loginData = await AuthService.getLoginData();
  const userInfo = await AuthService.getUserInfo();
  const currentProgram = await getData("currentProgram", {
    id: "-1",
    name: "",
  }) as IAppProgram;
  if (isLoggedIn) {
    ApiService.currentCampus = loginData.campus;
    thunkAPI.dispatch(refreshAuthData());
  }
  return {
    isLoggedIn,
    loginData,
    userInfo,
    currentProgram,
  };
});

const appSlice = createSlice({
  name: "app",
  initialState: {
    appReady: false,
    authModalShown: false,
    programPickerModalShown: false,
    userInfo: defaultAccountInfo,
  },
  reducers: {
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
      console.log("App data loaded");
      state.userInfo = action.payload.userInfo;
      state.appReady = true;
    });
    builder.addCase(appSignIn.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
    });
    builder.addCase(refreshAuthData.fulfilled, (state, action) => {
      state.userInfo = action.payload.userInfo;
    });
  },
});

export const {
  setAppReady,
  setAuthModalShown,
  setProgramPickerShown,
} = appSlice.actions;
export default appSlice.reducer;
