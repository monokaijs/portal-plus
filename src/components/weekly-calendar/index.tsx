import React, { useEffect, useState } from "react";
import ClassesTimeline from "@components/classes-timeline";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Text from "@components/common/Text";
import moment, { Moment } from "moment";

const deviceWidth = Dimensions.get("screen").width;
const itemSize = (deviceWidth - 32 - 16 * 6) / 7;
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const WeeklyCalendar = () => {
  const { colors } = useTheme();
  const [dates, setDates] = useState([] as Moment[]);
  const [selectedDate, setSelectedDate] = useState(moment());
  const today = moment();

  useEffect(() => {
    const days = [];
    for (let i = 0; i <= 6; i++) {
      days.push(moment().startOf("week").add(i, "day"));
    }
    setDates(days);
  }, []);

  return (
    <View>
      <View style={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        backgroundColor: colors.card,
        borderRadius: 20
      }}>
        {dates.map((date, index) => {
          const isToday = date.isSame(today, "day");
          const isSelected = selectedDate.isSame(date, "day");
          return (
            <TouchableOpacity
              key={index}
              style={{
                width: itemSize,
                height: itemSize / 3 * 4,
                alignItems: "center",
                justifyContent: "center",
                position: "relative"
              }}
              activeOpacity={.8}
              onPress={() => {
                setSelectedDate(date);
              }}
            >
              <Text type={"h5"}>
                {date.get("D")}
              </Text>
              <Text style={{ opacity: .6, fontSize: 10 }}>
                {weekDays[date.get("d")]}
              </Text>
                <View style={{
                  position: "absolute",
                  left:0, right: 0, bottom: 0,
                  alignItems: "center", justifyContent: "center"
                }}>
                  {(isToday && !isSelected) && (
                    <View style={{
                      width: 4,
                      height: 4,
                      borderRadius: 4,
                      backgroundColor: colors.primary
                    }}/>
                  )}
                  {isSelected && (
                    <View style={{
                      width: 16,
                      height: 4,
                      borderRadius: 4,
                      backgroundColor: colors.primary
                    }}/>
                  )}
                </View>
            </TouchableOpacity>
          )
        })}
      </View>
      <ClassesTimeline viewDate={selectedDate} />
    </View>
  );
};

export default WeeklyCalendar;
