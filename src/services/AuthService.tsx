import { getData, setData } from "./StorageService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { ILoginData, IUserInfo } from "../types";
import { defaultAccountInfo } from "@config/default-data";

class AuthService {
  static authCode = "";
  static googleAuthValidated = false;
  static googleTokenExpireTime = 0;
  static loginData = {};

  static async getLoginStatus(): Promise<boolean> {
    return !!await getData("isLoggedIn", false);
  }

  static async setLoginStatus(status: boolean) {
    return await setData("isLoggedIn", status);
  }

  static async getLoginData(): Promise<ILoginData> {
    const data: any = await getData("loginData", {});
    return data;
  }

  static async setLoginData(loginData: ILoginData) {
    console.log("login - data", loginData);
    this.loginData = loginData;
    await setData("loginData", loginData);
  }

  static setAPAuthCode(authCode: string) {
    this.authCode = authCode;
  }

  static async setUserInfo(userInfo: IUserInfo): Promise<any> {
    console.log("set-user-info", userInfo);
    return await setData("userInfo", userInfo);
  }

  static async getUserInfo(): Promise<IUserInfo> {
    return await getData("userInfo", defaultAccountInfo) as IUserInfo;
  }

  static async getGoogleTokenExpireTime() {
    const { accessToken } = await GoogleSignin.getTokens();
    const { data } = await axios("https://www.googleapis.com/oauth2/v1/tokeninfo", {
      method: "GET",
      params: {
        access_token: accessToken,
      },
    });
    return new Date().getTime() + (data["expires_in"] * 1000);
  }
}

export default AuthService;
