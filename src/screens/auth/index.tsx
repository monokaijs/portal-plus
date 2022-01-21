import React, { useEffect, useState } from "react";
import { Dimensions, Image, Modal, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { useTheme } from "@react-navigation/native";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { Picker } from "@react-native-picker/picker";
import { loadAppData, setAuthModalShown } from "@redux/reducers/app.reducer";
import { appSignIn } from "@redux/reducers/auth.reducer";
import ApiService from "../../services/ApiService";

const AuthModal = () => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);
  const [selectedCampus, setSelectedCampus] = useState("");
  const { app, auth } = useSelector((state: RootState) => state);
  const screen = Dimensions.get("screen");
  const figureSize = screen.width > screen.height ? screen.height : screen.width;

  const signIn = async () => {
    if (selectedCampus === "") {
      // TODO: warning about selecting campus
      return;
    }
    ApiService.currentCampus = selectedCampus;
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signIn();
      await dispatch(appSignIn());
      setLoading(false);
      dispatch(setAuthModalShown(false));
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!auth.isLoggedIn) {
      dispatch(setAuthModalShown(true));
    }
  }, [app]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "959715381720-udh2acbcp7206kqu6cfnufg3rcvqem7c.apps.googleusercontent.com",
      offlineAccess: true,
    });
  }, []);

  return (
    <Modal style={{ flex: 1 }} visible={!auth.isLoggedIn}>
      <View style={{ flex: 1 }}>
        <View style={{
          width: "100%",
          aspectRatio: 1,
          alignItems: "center",
          justifyContent: "center",
        }}>
          <Image
            source={require("@assets/figures/login-figure.png")}
            style={{
              width: figureSize,
              height: figureSize,
              aspectRatio: 1,
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{
          flex: 1,
          alignItems: "center",
        }}>
          <Text type={"h1"}>
            Portal+
          </Text>
          <Text
            style={{
              opacity: .5, marginTop: 10, fontSize: 14, fontWeight: "400",
              paddingHorizontal: 30, textAlign: "center",
            }}
          >
            Better place for Greenwich Students to manage your life at school.
          </Text>
        </View>
        <View style={{
          padding: 30,
        }}>
          <View
            style={{
              borderColor: selectedCampus !== '' ? colors.primary : "#00000033",
              borderWidth: 2,
              borderRadius: 30,
              marginBottom: 16,
            }}
          >
            <Picker
              testID="basic-picker"
              selectedValue={selectedCampus}
              onValueChange={(v) => setSelectedCampus(v)}
              accessibilityLabel="Basic Picker Accessibility Label"
              dropdownIconColor={"#FFFFFF"}
            >
              <Picker.Item
                label="Select Campus"
                value=""
                fontFamily={"SVN-Poppins SemiBold"}
                style={{
                  color: "#00000033",
                  fontWeight: "normal"
                }}
              />
              <Picker.Item
                label="Hanoi"
                value="APHL"
                fontFamily={"SVN-Poppins Medium"}
                style={{
                  color: "#000000",
                  fontWeight: "normal",
                }}
              />
            </Picker>
          </View>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: colors.primary,
              padding: 20,
              borderRadius: 100,
            }}
            activeOpacity={.8}
            onPress={signIn}
            disabled={loading}
          >
            <Text type={"h3"} style={{ color: "#FFFFFF", fontSize: 14 }}>
              {loading ? "LOADING..." : "SIGN IN WITH GOOGLE"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AuthModal;
