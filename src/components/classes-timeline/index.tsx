import React, { useEffect, useState } from "react";
import { FlatList, Linking, TouchableOpacity, View } from "react-native";
import Text from "@components/common/Text";
import Icon from "react-native-vector-icons/Ionicons";
import { useTheme } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import ApiService from "../../services/ApiService";
import moment from "moment";
import { IActivityRecord } from "../../types";
import { Colors as DefaultAppColors } from "@config/styling";

// @ts-ignore
const ClassesTimelineItem = ({ isFirst, isLast, item, index }) => {
  const {colors: Colors} = useTheme();
  const isActive = index === 1;
  const textColor = isActive ? "#FFFFFF" : Colors.text;
  const getRoundColor = () => {
    if (item.AttendanceStatus === "N") {
      return isActive ? "#FFFFFF" : Colors.primary
    } else if (item.AttendanceStatus === "P") {
      return DefaultAppColors.success
    } else return DefaultAppColors.failed
  }
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: isActive ? Colors.primary : "white",
        borderRadius: 10,
        zIndex: 999 - index
      }}>
      <View
        style={{
          flex: 0,
          width: 60,
          alignItems: "center",
          justifyContent: "center",
        }}>
        <View
          style={{
            width: 14,
            height: 14,
            borderRadius: 10,
            borderWidth: 3,
            borderColor: getRoundColor(),
            position: "relative",
          }}>
          {!isLast && (
            <View
              style={{
                height: 62,
                borderLeftWidth: 2,
                borderStyle: "dashed",
                borderLeftColor: Colors.primary,
                opacity: 0.5,
                position: "absolute",
                left: 3,
                top: 16,
              }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          paddingVertical: 16,
        }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            opacity: isActive ? 0.8 : 0.6,
          }}>
          <Icon name={"time"} color={textColor} />
          <Text
            style={{ marginRight: 10, marginLeft: 2, color: textColor }}
            numberOfLines={1}>
            {item.SlotTime.replace("(", "").replace(")", "")}
          </Text>
          <Icon name={"people-circle"} color={textColor} />
          <Text
            style={{ marginRight: 2, marginLeft: 2, color: textColor }}
            numberOfLines={1}>
            {item.GroupName}
          </Text>
        </View>
        <Text
          type={"h4"}
          style={{ marginTop: 4, color: textColor, lineHeight: 26 }}
          numberOfLines={1}
        >
          {item.SubjectCode}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          paddingHorizontal: 16,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          Linking.openURL(`https://meet.google.com/${item.MeetURL}`).then(r => {

          });
        }}
      >
        <Icon name={"videocam"} size={16} color={!isActive ? "#00000066" : "#FFFFFF"}/>
      </TouchableOpacity>
    </View>
  );
};

const ClassesTimeline = () => {
  const {app, auth, calendar} = useSelector((state: RootState) => state);
  const [calendarLoaded, setCalendarLoaded] = useState(false);
  const [todayActivities, setTodayActivities] = useState([] as IActivityRecord[]);

  const loadCalendar = async () => {
    const currentProgramId = calendar.currentProgram.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    ApiService.getStudentActivities(app.userInfo.rollNumber, currentProgramId, calendar.currentSemester.SemesterName).then(acts => {
      const activities = acts.filter(act => {
        return moment(act.Date, 'l').toDate().getTime() === today.getTime()
      });
      setTodayActivities(activities);
    })
  };

  useEffect(() => {
    console.log("app ready", app.appReady)
    if (app.appReady && auth.isLoggedIn && calendar.currentProgram.id !== '' && !calendarLoaded) {
      loadCalendar().then(() => {

      });
    }
  }, [app, auth, calendar]);
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
      {/*<FlatList*/}
      {/*  data={data.reverse()}*/}
      {/*  inverted*/}
      {/*  renderItem={({ item, index, separators }) => {*/}
      {/*    return (*/}
      {/*      <ClassesTimelineItem*/}
      {/*        item={item}*/}
      {/*        index={index}*/}
      {/*        isFirst={index === 0}*/}
      {/*        isLast={index === data.length - 1}*/}
      {/*      />*/}
      {/*    );*/}
      {/*  }}*/}
      {/*/>*/}
    </View>
  );
};

export default ClassesTimeline;
