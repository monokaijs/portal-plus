import React from "react";
import { Dimensions, Image, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Text from "@components/common/Text";

interface IContentCardProps {
  children?: any
}

const ContentCard = ({children}: IContentCardProps) => {
  const deviceWidth = Dimensions.get("screen").width;
  const {colors} = useTheme();
  return (
    <View style={{
      height: deviceWidth / 3,
      backgroundColor: colors.primary,
      borderRadius: 20,
      flexDirection: "row",
      overflow: "hidden"
    }}>
      <View style={{
        flex: 1,
        padding: 16,
        justifyContent: "center"
      }}>
        <Text type={"h3"} style={{color: "#FFFFFF", marginBottom: 2}}>
          Upcoming Alert
        </Text>
        <Text style={{color: "#FFFFFF", opacity: .8}}>
          Enable to get notifications about upcoming activities...
        </Text>

      </View>
      <View style={{
        flex: 1,
        position: "relative",
      }}>
        <Image
          source={require("@assets/figures/calendar-figure.png")}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    </View>
  )
}

export default ContentCard;
