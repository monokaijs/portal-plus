import React, { useEffect, useState } from "react";
import { FlatList, Linking, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import ApiService from "../../services/ApiService";
import moment, { Moment } from "moment";
import { IActivityRecord } from "../../types";
import ClassesTimelineItem from "@components/classes-timeline/classes-timeline-item";

interface IClassTimelineProps {
  viewDate: Moment
}


const ClassesTimeline = ({viewDate}: IClassTimelineProps) => {
  const { app, auth, calendar } = useSelector((state: RootState) => state);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [todayActivities, setTodayActivities] = useState([] as IActivityRecord[]);
  const [allActivities, setAllActivities] = useState([] as IActivityRecord[]);

  const loadCalendar = async () => {
    const currentProgramId = calendar.currentProgram.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    ApiService.getStudentActivities(app.userInfo.rollNumber, currentProgramId, calendar.currentSemester.SemesterName).then(acts => {
      setAllActivities(acts);
    });
  };

  useEffect(() => {
    console.log("app ready", app.appReady);
    if (app.appReady && auth.isLoggedIn && calendar.currentProgram.id !== "" && !calendarLoaded) {
      loadCalendar().then(() => {

      });
    }
  }, [app, auth, calendar]);

  useEffect(() => {
    if (allActivities && allActivities.filter) {
      const activities = allActivities.filter(act => {
        return moment(act.Date, "l").isSame(viewDate, "day");
      });
      setTodayActivities(activities);
    }
  }, [allActivities, viewDate]);

  return (
    <View
      style={{
        marginTop: 16,
        // flex: 1,
      }}
    >
      {todayActivities.map((item, index) => (
        <ClassesTimelineItem
          key={index}
          item={item}
          index={index}
          isFirst={index === 0}
          isLast={index === todayActivities.length - 1}
        />
      ))}
    </View>
  );
};

export default ClassesTimeline;
