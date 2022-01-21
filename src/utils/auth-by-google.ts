import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { IAuthenticationResponse, ISemester } from "../types";
import ApiService from "../services/ApiService";
import AuthService from "../services/AuthService";
import { getData, setData } from "../services/StorageService";
import { getCurrentSemester } from "@utils/get-current-semester";

export const signInWithGoogle = async () => {
  const selectedCampus = ApiService.currentCampus;
  const { idToken, accessToken } = await GoogleSignin.getTokens();
  const googleTokenExpireTime = await AuthService.getGoogleTokenExpireTime();
  const authData: IAuthenticationResponse = await ApiService.loginByGoogleToken(idToken || "", selectedCampus);
  AuthService.setAPAuthCode(authData.data[0].AuthenKey);

  const allSemesters = await ApiService.getSemesters();
  await setData("all-semesters", allSemesters);
  const currentSemester = await getCurrentSemester();

  const rollNumber = authData.data[0].Rollnumber || "";
  const studentInfo: any = await ApiService.getStudentInfo(rollNumber, selectedCampus);
  const loginData = {
    campus: selectedCampus,
    googleTokenExpireTime,
    idToken: idToken || "",
    accessToken: accessToken || "",
    programId: '-1',
  };
  await AuthService.setLoginData(loginData);
  await AuthService.setLoginStatus(true);

  return {
    loginData,
    userInfo: studentInfo,
    allSemesters,
    isLoggedIn: true,
    currentSemester,
  };
}
