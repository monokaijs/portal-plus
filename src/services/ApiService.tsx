import axios from "axios";
import { XMLParser } from 'fast-xml-parser';

class ApiService {
  static baseUrl = "https://ap.greenwich.edu.vn/mApi.asmx";
  static authCode = "";
  static xmlParser = new XMLParser()

  static sendRequest(endpoint: String, data: Object) {
    return new Promise((resolve, reject) => {
      axios(this.baseUrl + "/" + endpoint, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
        params: {
          ...data,
          Authen: this.authCode,
        },
      }).then(response => {
        console.log(response.headers, response.headers['content-type']);
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

  static async loginByGoogleToken(googleToken: String, campusCode: String = "APHL") {
    return new Promise((resolve, reject) => {
      this.sendRequest("AuthenticationByGoogleAccessToken", {
        CampusCode: campusCode,
        token: googleToken,
      }).then((authData: any) => {
        const token = authData.data[0].AuthenKey;
        this.authCode = token;
        return resolve(token);
      }).catch(reject);
    });
  }

  static async getSubjects(campusCode: String = "APHL") {
    return new Promise((resolve, reject) => {
      this.sendRequest("GetSubjets", {
        campusCode: campusCode
      }).then(() => null);
    });
  }

  static async getSemesters(campusCode: String = "APHL") {
    return new Promise((resolve, reject) => {
      this.sendRequest("GetSemester", {
        campusCode: campusCode
      })
    })
  }

  static async getStudentInfo(rollNumber: String, campusCode: String = "APHL") {
    return new Promise((resolve, reject) => {
      this.sendRequest("GetStudentById", {
        rollNumber: rollNumber,
        CampusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }

  static async getStudentPicture(rollNumber: String, campusCode: String = "APHL") {
    return new Promise((resolve, reject) => {
      this.sendRequest("RetriveImage", {
        rollNumber: rollNumber,
        CampusCode: campusCode
      }).then(resolve).catch(reject);
    })
  }
}

export default ApiService;
