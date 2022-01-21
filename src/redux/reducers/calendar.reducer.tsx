import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAppProgram, IProgram, ISemester } from "../../types";
import { setData } from "../../services/StorageService";
import { loadAppData } from "@redux/reducers/app.reducer";
import { refreshAuthData } from "@redux/reducers/auth.reducer";

export const setCurrentProgram = createAsyncThunk("app/saveCurrentProgram", async (currentProgram: IProgram, thunkAPI) => {
  const castedProgram : IAppProgram = {
    id: currentProgram.ProgramId,
    name: currentProgram.ProgramName
  };
  await setData("currentProgram", castedProgram);
  return castedProgram;
});

const calendarSlice = createSlice({
  name: "account",
  initialState: {
    currentProgram: {
      id: "-1",
      name: "",
    },
    semesters: [] as ISemester[],
    currentSemester: {
      CampusID: 0,
      EndDate: "",
      SemesterName: "",
      StartDate: "",
      TermID: 0,
    },
  },
  reducers: {
    setSemestersList(state, action: PayloadAction<ISemester[]>) {
      state.semesters = action.payload;
      const currentTime = new Date().getTime();
      const semesters: ISemester[] = action.payload;
      const currentSemester = semesters.find(x => currentTime > new Date(x.StartDate).getTime() && currentTime < new Date(x.EndDate).getTime());
      if (currentSemester) {
        state.currentSemester = currentSemester;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setCurrentProgram.fulfilled, (state, action) => {
      state.currentProgram = action.payload;
    });
    builder.addCase(loadAppData.fulfilled, (state, action) => {
      state.currentProgram = action.payload.currentProgram;
    });
    builder.addCase(refreshAuthData.fulfilled, (state, action) => {
      state.semesters = action.payload.allSemesters;
      state.currentSemester = action.payload.currentSemester;
    });
  }
});

export const { setSemestersList } = calendarSlice.actions;
export default calendarSlice.reducer;
