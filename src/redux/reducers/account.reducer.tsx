import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserInfoResponse } from "../../types";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    isLoggedIn: false,
    fullName: "",
    avatarUrl: "",
    address: "",
    campusId: 0,
    dateOfBirth: "",
    major: "",
    currentTermNo: 0,
    dateOfIssue: "",
    email: "",
    enrollDate: "",
    firstName: "",
    lastName: "",
    gender: true,
    homePhone: "",
    idCard: "",
    studentCode: "",
    parentName: "",
    parentPhone: "",
    parentJob: "",
    parentEmail: "",
    parentAddress: "",
    placeOfIssue: "",
    placeOfWork: "",
    progress: false,
    rollNumber: "",
    statusCode: "",
  },
  reducers: {
    setAvatar(state, action: PayloadAction<string>) {
      state.avatarUrl = action.payload;
    },
    setStudentInfo(state, action: PayloadAction<any>) {
      const details: IUserInfoResponse = action.payload;
      state.isLoggedIn = true;
      state.fullName = details.Fullname;
      state.address = details.Address;
      state.campusId = details.CampusID;
      state.dateOfBirth = details.DateOfBirth;
      state.major = details.Nganh;
      state.currentTermNo = details.CurrentTermNo;
      state.dateOfIssue = details.DateOfIssue;
      state.email = details.Email;
      state.enrollDate = details.EnrolDate;
      state.firstName = details.FirstName;
      state.lastName = details.LastName;
      state.gender = details.Gender;
      state.homePhone = details.HomePhone;
      state.idCard = details.IDCard;
      state.studentCode = details.StudentCode;
      state.parentName = details.ParentName;
      state.parentPhone = details.ParentPhone;
      state.parentJob = details.ParentJob;
      state.parentEmail = details.ParentEmail;
      state.parentAddress = details.ParentAddress;
      state.placeOfIssue = details.PlaceOfIssue;
      state.placeOfWork = details.PlaceOfWork;
      state.progress = details.Progress;
      state.rollNumber = details.RollNumber;
      state.statusCode = details.StatusCode;
    },
  },
});

export const { setAvatar, setStudentInfo } = accountSlice.actions;
export default accountSlice.reducer;
