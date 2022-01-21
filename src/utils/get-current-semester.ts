import { getData } from "../services/StorageService";
import { ISemester } from "../types";
import ApiService from "../services/ApiService";

export const getCurrentSemester = async () : Promise<ISemester> => {
  let allSemesters = await getData("all-semesters", []) as ISemester[];
  if (allSemesters.length > 0) allSemesters = await ApiService.getSemesters();
  const currentTime = new Date().getTime();
  let currentSemester = allSemesters.find(x => currentTime > new Date(x.StartDate).getTime() && currentTime < new Date(x.EndDate).getTime());
  if (!currentSemester) {
    allSemesters = await ApiService.getSemesters();
    currentSemester = allSemesters.find(x => currentTime > new Date(x.StartDate).getTime() && currentTime < new Date(x.EndDate).getTime());
  }
  if (!currentSemester) return Promise.reject("No current semester found.");
  return currentSemester;
}

export const getCurrentSemesterName = async () : Promise<string> => {
  const currentSemester = await getCurrentSemester();
  return currentSemester.SemesterName;
}
