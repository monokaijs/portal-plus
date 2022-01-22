import { useTheme } from "@react-navigation/native";
import { Colors as DefaultAppColors } from "@config/styling";
import { Linking, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Text from "@components/common/Text";
import React from "react";

interface IClassTimelineItemProps {
  isFirst?: boolean,
  isLast?: boolean,
  item: any,
  index: number
}

const ClassesTimelineItem = ({ isFirst, isLast, item, index }: IClassTimelineItemProps) => {
  const { colors: Colors } = useTheme();
  const isActive = index === 1;
  const textColor = Colors.text;
  const getRoundColor = () => {
    if (item.AttendanceStatus === "N") {
      return Colors.primary;
    } else if (item.AttendanceStatus === "P") {
      return DefaultAppColors.success;
    } else return DefaultAppColors.failed;
  };
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginBottom: 16,
        backgroundColor: "white",
        borderRadius: 20,
        zIndex: 999 - index,
        position: "relative",
      }}
    >
      {isActive && (
        <View style={{
          position: "absolute",
          width: 4,
          left: 0, top: 0, bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <View
            style={{
              position: "absolute",
              width: 4,
              height: 32,
              borderRadius: 4,
              left: 0,
              backgroundColor: Colors.primary,
            }}
          />
        </View>
      )}
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
                height: 74,
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
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            opacity: 0.6,
          }}
        >
          <Icon name={"people-circle"} color={textColor} />
          <Text
            style={{ marginRight: 10, marginLeft: 2, color: textColor }}
            numberOfLines={1}>
            {item.GroupName}
          </Text>
          <Icon name={"time"} color={textColor} />
          <Text
            style={{ marginRight: 10, marginLeft: 2, color: textColor }}
            numberOfLines={1}
          >
            {item.SlotTime.replace("(", "").replace(")", "")}
          </Text>
        </View>
        <Text
          type={"h3"}
          style={{ marginTop: 4, color: textColor, lineHeight: 24, opacity: .8, fontSize: 16 }}
          numberOfLines={1}
        >
          {item.SubjectCode}
        </Text>
        <Text
          style={{ color: textColor, opacity: .4, marginTop: 2 }}
          numberOfLines={1}
        >
          Lecturer: {item.Lecturer}
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
        <Icon name={"videocam"} size={16} color={Colors.primary} style={{ opacity: .6 }} />
      </TouchableOpacity>
    </View>
  );
};

export default ClassesTimelineItem;
