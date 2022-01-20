import React from "react";
import { Image, StatusBar, View } from "react-native";
import Text from "@components/common/Text";
import { Colors } from "@config/styling";
import UserAvatar from "@components/user-avatar";

const AppHeader = () => {
  return (
    <View style={{
      backgroundColor: "#FFF",
      padding: 32,
      borderBottomLeftRadius: 30,
      borderBottomRightRadius: 30,
      flexDirection: "row",
      paddingTop: (StatusBar.currentHeight || 0) + 32
    }}>
      <View style={{
        flex: 1
      }}>
        <Text style={{
          color: Colors.lightText
        }}>
          Welcome back,
        </Text>
        <Text type={"h2"} style={{
          color: Colors.darkText
        }}>
          Anh Nhan Nguyen
        </Text>
      </View>
      <View style={{
        alignItems: "center",
        justifyContent: "center"
      }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}>
          <UserAvatar
            style={{
            width: "100%",
            height: "100%",
            resizeMode: "cover"
          }}/>
        </View>
      </View>
    </View>
  )
};

export default AppHeader;
