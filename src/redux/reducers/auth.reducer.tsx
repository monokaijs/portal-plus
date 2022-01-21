import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILoginData } from "../../types";
import { setData } from "../../services/StorageService";
import AuthService from "../../services/AuthService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { signInWithGoogle } from "@utils/auth-by-google";
import { loadAppData } from "@redux/reducers/app.reducer";

export const appSignIn = createAsyncThunk(
  "app/signIn",
  async (_, thunkAPI) => {
    return await signInWithGoogle();
  },
);

export const signOut = createAsyncThunk("app/signOut", async (thunkAPI) => {
  await GoogleSignin.signOut();
  await AuthService.setLoginStatus(false);
  await setData("currentProgram", {
    id: '-1',
    name: ''
  });
  await AuthService.setLoginData({
    campus: "",
    accessToken: "",
    idToken: "",
    googleTokenExpireTime: 0,
    programId: '-1',
  });
});

export const refreshAuthData = createAsyncThunk("app/refreshAuthData", async (thunkAPI) => {
  console.log("refresh auth data now");
  const loginData = await AuthService.getLoginData();
  const currentTime = new Date().getTime();

  // google token is expired, now try to renew the token
  try {
    let idToken = loginData.idToken;
    if (loginData.googleTokenExpireTime < currentTime) {
      const signInState = await GoogleSignin.signInSilently();
      if (!signInState.idToken) return Promise.reject("Failed to renew token");
    }
    return await signInWithGoogle();
  } catch (e) {
    console.log(e);
    return Promise.reject("Failed to refresh authentication data");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    loginData: {},
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
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(loadAppData.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loginData = action.payload.loginData;
    });
    builder.addCase(appSignIn.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loginData = action.payload.loginData;
    });
    builder.addCase(signOut.fulfilled, (state, action) => {
      state.isLoggedIn = false;
      state.loginData = {};
    });
    builder.addCase(refreshAuthData.fulfilled, (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.loginData = action.payload.loginData;
    });
  },
});

export const {
  setLoginStatus,
  setLoginData,
} = authSlice.actions;
export default authSlice.reducer;
