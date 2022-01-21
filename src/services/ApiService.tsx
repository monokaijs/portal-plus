import axios from "axios";
import { XMLParser } from 'fast-xml-parser';
import { IActivityRecord, IAuthenticationResponse, IProgram, ISemester, IUserInfo, IUserInfoResponse } from "../types";
import AuthService from "./AuthService";

class ApiService {
  static currentCampus = '';
  static baseUrl = "https://ap.greenwich.edu.vn/mApi.asmx";
  static xmlParser = new XMLParser();

  static sendRequest(endpoint: string, data: Object) {
    return new Promise<any>(async (resolve, reject) => {
      console.log("authcode - ", AuthService.authCode);
      axios(this.baseUrl + "/" + endpoint, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        params: {
          ...data,
          Authen: AuthService.authCode,
        },
      }).then(response => {
        // console.log(response.data);
        if (
          response.headers['content-type'] &&
          response.headers['content-type'].includes("text/xml")
        ) {
          let obj = this.xmlParser.parse(response.data);
          if (obj.string) {
            return resolve(JSON.parse(obj.string));
          } else {
            return resolve(obj.base64Binary);
          }
        }
        return resolve(response.data)
      }).catch(err => {
        reject(err)
      });
    });
  }

  static async loginByGoogleToken(googleToken: string, campusCode: string = this.currentCampus) : Promise<IAuthenticationResponse> {
    return new Promise((resolve, reject) => {
      this.sendRequest("AuthenticationByGoogleAccessToken", {
        CampusCode: campusCode,
        token: googleToken,
      }).then((response: any) => {
        const authData: IAuthenticationResponse = response;
        const token: string = authData.data[0].AuthenKey;
        AuthService.setAPAuthCode(token);
        return resolve(response);
      }).catch(reject);
    });
  }

  static async getSubjects(campusCode: string = this.currentCampus) {
    return new Promise((resolve, reject) => {
      this.sendRequest("GetSubjets", {
        campusCode: campusCode
      }).then(resolve).catch(reject);
    });
  }

  static async getAllPrograms(campusCode: string = this.currentCampus) {
    return new Promise<IProgram[]>((resolve, reject) => {
      this.sendRequest("GetAllProgram", {
        CampusCode: campusCode
      }).then(response => {
        const data : IProgram[] = response.data;
        resolve(data);
      }).catch(reject);
    })
  }

  static async getStudentActivities(rollNumber: string, programId: string, semesterName: string, campusCode: string = this.currentCampus) {
    return new Promise<IActivityRecord[]>((resolve, reject) => {
      this.sendRequest("GetActivityStudent", {
        StudentCode: rollNumber,
        CampusCode: campusCode,
        Semester: semesterName,
        ProgramId: programId
      }).then(resolve).catch(reject);
    })
  }

  // static async getPrograms()

  static async getSemesters(campusCode: string = this.currentCampus) {
    return new Promise<ISemester[]>((resolve, reject) => {
      this.sendRequest("GetSemester", {
        campusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }

  static getStudentInfo(rollNumber: string, campusCode: string = this.currentCampus) {
    return new Promise<IUserInfo>((resolve, reject) => {
      this.sendRequest("GetStudentById", {
        rollNumber: rollNumber,
        CampusCode: campusCode
      }).then((data: any) => {
        const userInfoResponse:IUserInfoResponse = data[0];
        const userInfo: IUserInfo = {
          fullName: userInfoResponse.Fullname || "",
          address: userInfoResponse.Address || "",
          campusId: userInfoResponse.CampusID || 0,
          dateOfBirth: userInfoResponse.DateOfBirth || "",
          major: userInfoResponse.Nganh || "",
          currentTermNo: userInfoResponse.CurrentTermNo || 0,
          dateOfIssue: userInfoResponse.DateOfIssue || "",
          email: userInfoResponse.Email || "",
          enrollDate: userInfoResponse.EnrolDate || "",
          firstName: userInfoResponse.FirstName || "",
          lastName: userInfoResponse.LastName || "",
          gender: userInfoResponse.Gender || false,
          homePhone: userInfoResponse.HomePhone || "",
          idCard: userInfoResponse.IDCard || "",
          studentCode: userInfoResponse.StudentCode || "",
          parentName: userInfoResponse.ParentName || "",
          parentPhone: userInfoResponse.ParentPhone || "",
          parentJob: userInfoResponse.ParentJob || "",
          parentEmail: userInfoResponse.ParentEmail || "",
          parentAddress: userInfoResponse.ParentAddress || "",
          placeOfIssue: userInfoResponse.PlaceOfIssue || "",
          placeOfWork: userInfoResponse.PlaceOfWork || "",
          progress: userInfoResponse.Progress || false,
          rollNumber: userInfoResponse.RollNumber || "",
          statusCode: userInfoResponse.StatusCode || "",
        };
        resolve(userInfo);
      }).catch(reject);
    })
  }

  static async getStudentPicture(rollNumber: string, campusCode: string = this.currentCampus) {
    return new Promise((resolve, reject) => {
      this.sendRequest("RetriveImage", {
        rollNumber: rollNumber,
        CampusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }
}

export default ApiService;
