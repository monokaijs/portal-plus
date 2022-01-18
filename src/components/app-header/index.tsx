import React from "react";
import { Image, StatusBar, View } from "react-native";
import Text from "@components/common/Text";
import { Colors } from "@config/styling";

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
          <Image source={{
            uri: "https://scontent.fhph1-2.fna.fbcdn.net/v/t1.6435-9/96358750_264258654695705_2423493008243556352_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=JMINJSaA33wAX_R1Vzd&_nc_ht=scontent.fhph1-2.fna&oh=00_AT9kRH5sp_iT_yrLY6gy2HGIl0wedqw-LdDvqzSsXQAAPw&oe=620AAF5D"
          }} style={{
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
