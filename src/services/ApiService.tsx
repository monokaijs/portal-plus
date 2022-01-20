import axios from "axios";
import { XMLParser } from 'fast-xml-parser';
import { IAuthenticationResponse, IUserInfoResponse } from "../types";
import AuthService from "./AuthService";

class ApiService {
  static currentCampus = '';
  static baseUrl = "https://ap.greenwich.edu.vn/mApi.asmx";
  static xmlParser = new XMLParser();

  static sendRequest(endpoint: string, data: Object) {
    return new Promise(async (resolve, reject) => {
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
      }).catch(reject);
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
    return new Promise((resolve, reject) => {
      this.sendRequest("GetAllProgram", {
        CampusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }

  static async getStudentActivities(rollNumber: string, programId: number, semesterName: string, campusCode: string = this.currentCampus) {
    console.log(rollNumber, programId, semesterName, campusCode);
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      this.sendRequest("GetSemester", {
        campusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }

  static async getStudentInfo(rollNumber: string, campusCode: string = this.currentCampus) {
    return new Promise((resolve, reject) => {
      this.sendRequest("GetStudentById", {
        rollNumber: rollNumber,
        CampusCode: campusCode
      }).then((data: any) => {
        const userInfo:IUserInfoResponse = data[0];
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
