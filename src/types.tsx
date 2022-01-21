import { StyleProp, TextProps, TextStyle, TextStyleAndroid, ViewStyle } from "react-native";

export interface ILoginData {
  campus: string,
  googleTokenExpireTime: number,
  accessToken: string,
  idToken: string,
  programId: string
}

export interface IAuthenticationResponse {
  data: [{
    AuthenKey: string,
    Email?: string,
    Rollnumber?: string,
    StudentName?: string
    TypeAcc?: string,
  }],
  error_message?: string,
  message?: string,
  status?: Number,
  status_string?: string,
  summary_data?: string
}

export interface ITextComponent extends TextProps {
  children?: any,
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "content",
  style?: TextStyle
}

export interface IBlockProps {
  type?: string,
  style?: ViewStyle,
  children?: any,
  strong?: boolean,
  noMarginTop?: boolean,
  noMarginBottom?: boolean,
  noMarginLeft?: boolean,
  noMarginRight?: boolean,
  numberOfLines?: Number
}

export interface IUserInfo {
  fullName: string,
  address: string,
  campusId: number,
  dateOfBirth: string,
  major: string,
  currentTermNo: number,
  dateOfIssue: string,
  email: string,
  enrollDate: string,
  firstName: string,
  lastName: string,
  gender: boolean,
  homePhone: string,
  idCard: string,
  studentCode: string,
  parentName: string,
  parentPhone: string,
  parentJob: string,
  parentEmail: string,
  parentAddress: string,
  placeOfIssue: string,
  placeOfWork: string,
  progress: boolean,
  rollNumber: string,
  statusCode: string,
}

export interface IUserInfoResponse {
  Fullname: string,
  Address: string
  CampusID: number,
  DateOfBirth: string,
  Nganh: string,
  CurrentTermNo: number,
  DateOfIssue: string,
  Email: string,
  EnrolDate: string,
  FirstName: string,
  LastName: string,
  Gender: boolean,
  HomePhone: string,
  IDCard: string,
  StudentCode: string,
  ParentName: string,
  ParentPhone: string,
  ParentJob: string,
  ParentEmail: string,
  ParentAddress: string,
  PlaceOfIssue: string,
  PlaceOfWork: string,
  Progress: boolean,
  RollNumber: string,
  StatusCode: string,
}

export interface ISemester {
  CampusID: number,
  EndDate: string,
  SemesterName: string,
  StartDate: string,
  TermID: number
}

export interface IProgram {
  ProgramId: string,
  ProgramName: string,
}

export interface IAppProgram {
  id: string;
  name: string;
}

export interface IActivityRecord {
  AttendanceStatus: string,
  Date: string,
  GroupName: string,
  Lecturer: string,
  MeetURL: string,
  RoomNo: string,
  SessionNo: string,
  Slot: string,
  SlotTime: string,
  SubjectCode: string
}
