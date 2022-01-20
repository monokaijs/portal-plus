import { getData, setData } from "./StorageService";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { IAuthenticationResponse, ILoginData } from "../types";
import ApiService from "./ApiService";

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
    this.loginData = loginData;
    await setData("loginData", loginData);
  }

  static setAPAuthCode(authCode: string) {
    this.authCode = authCode;
  }

  static async refreshAuthData() {
    const loginData = await this.getLoginData();
    const currentTime = new Date().getTime();

    // google token is expired, now try to renew the token
    try {
      let idToken = loginData.idToken;
      if (loginData.googleTokenExpireTime < currentTime) {
        const signInState = await GoogleSignin.signInSilently();
        if (!signInState.idToken) throw "Failed to renew token";
      }
      return await this.signIn(loginData.campus);
    } catch (e) {
      return false;
    }

  }

  static async signIn(selectedCampus: string) {
    const {idToken, accessToken} = await GoogleSignin.getTokens();
    const googleTokenExpireTime = await AuthService.getGoogleTokenExpireTime();
    const authData : IAuthenticationResponse = await ApiService.loginByGoogleToken(idToken || "", selectedCampus);
    ApiService.currentCampus = selectedCampus;
    const rollNumber = authData.data[0].Rollnumber || "";
    const studentInfo : any = await ApiService.getStudentInfo(rollNumber, selectedCampus);
    await AuthService.setLoginData({
      campus: selectedCampus,
      googleTokenExpireTime,
      idToken: idToken || "",
      accessToken: accessToken || "",
      userInfo: studentInfo
    });
    console.log('new auth data', authData);
    await AuthService.setLoginStatus(true);
    this.setAPAuthCode(authData.data[0].AuthenKey);
  }

  static async signOut() {
    await GoogleSignin.signOut();
    await this.setLoginStatus(false);
    await this.setLoginData({
      campus: "",
      accessToken: "",
      idToken: "",
      googleTokenExpireTime: 0,
      userInfo: {},
    });
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
