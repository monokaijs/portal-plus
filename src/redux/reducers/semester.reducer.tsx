import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISemester } from "../../types";

const semesterSlice = createSlice({
  name: "account",
  initialState: {
    semesters: [{}],
    currentSemester: {
      CampusID: 0,
      EndDate: '',
      SemesterName: '',
      StartDate: '',
      TermID: 0
    }
  },
  reducers: {
    setSemestersList(state, action: PayloadAction<ISemester[]>) {
      state.semesters = action.payload;
      const currentTime = new Date().getTime();
      const semesters: ISemester[] = action.payload;
      const currentSemester = semesters.find(x => currentTime > new Date(x.StartDate).getTime() && currentTime < new Date(x.EndDate).getTime())
      if (currentSemester) {
        state.currentSemester = currentSemester;
      }
    },
  },
});

export const { setSemestersList } = semesterSlice.actions;
export default semesterSlice.reducer;
