import React, { useEffect, useState } from "react";
import { Image, StatusBar, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import Block from "@components/common/Block";
import { useTheme } from "@react-navigation/native";
import Text from "@components/common/Text";
import Icon from "react-native-vector-icons/Ionicons";
import UserAvatar from "@components/user-avatar";
import AuthService from "../../services/AuthService";
import { setAuthModalShown } from "@redux/reducers/app.reducer";
import { signOut } from "@redux/reducers/auth.reducer";

const PersonalScreen = () => {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState("");
  const { userInfo: account } = useSelector((state: RootState) => state.app);
  const { colors } = useTheme();

  useEffect(() => {
    const birthDate = new Date(account.dateOfBirth);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const text = months[birthDate.getMonth()] + " " + birthDate.getDate() + ", " + birthDate.getFullYear();
    setBirthday(text);
  }, [account]);

  return (
    <View style={{
      flex: 1,
    }}>
      <View style={{
        backgroundColor: colors.primary,
      }}>
        <Image
          source={require("@assets/cover-picture.jpg")}
          style={{
            paddingTop: StatusBar.currentHeight || 0,
            width: "100%",
            height: 160,
            resizeMode: "cover",
            opacity: .9,
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.card,
          flex: 1,
          paddingBottom: 30,
          marginTop: -30,
          borderRadius: 30,
        }}
      >
        <View style={{
          flexDirection: "row",
        }}>
          <UserAvatar
            style={{
              marginLeft: 20,
              marginTop: -50,
              width: 100,
              height: 100,
              resizeMode: "cover",
              borderRadius: 50,
              borderWidth: 4,
              borderColor: colors.card
            }}
          />
          <View style={{flex: 1, flexDirection: "row"}}>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text type={"h4"}>
                Basic
              </Text>
              <View
                style={{
                  position: "absolute",
                  left: 0, right: 0, bottom: 0,
                  alignItems: "center"
                }}
              >
                <View
                  style={{
                    height: 4,
                    width: 32,
                    borderRadius: 4,
                    backgroundColor: colors.primary
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text type={"h4"}>
                Social
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <Block noMarginBottom>
          <Text type={"h3"}>
            {account.fullName}
          </Text>
        </Block>
        <View style={{flexDirection: "row", marginHorizontal: 30}}>
          <View style={{
            marginRight: 10,
            flex: 1,
            backgroundColor: colors.background,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "row"
          }}>
            <Icon name={"person"} color={colors.primary} size={14}/>
            <Text style={{marginLeft: 14, fontSize: 14}}>
              {account.rollNumber}
            </Text>
          </View>
          <View style={{
            marginLeft: 10,
            flex: 1,
            backgroundColor: colors.background,
            padding: 10,
            borderRadius: 10,
            alignItems: "center",
            flexDirection: "row"
          }}>
            <Icon name={"egg"} color={colors.primary} size={14}/>
            <Text style={{marginLeft: 14, fontSize: 14}}>
              {birthday}
            </Text>
          </View>

        </View>
        <TouchableOpacity
          style={{padding: 30}}
          onPress={() => {
            dispatch(signOut());
          }}
        >
          <Text>
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PersonalScreen;
