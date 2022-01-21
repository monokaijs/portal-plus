import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Image, ImageProps, StatusBar } from "react-native";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";

const UserAvatar = (props: any) => {
  const [avatar, setAvatar] = useState(require("@assets/default-avatar.jpg"));
  const {auth, app} = useSelector((state: RootState) => state);
  useEffect(() => {
    console.log(app.appReady, auth.isLoggedIn, app.userInfo.rollNumber);
    (async () => {
      if (app.appReady && auth.isLoggedIn && app.userInfo.rollNumber) {
        console.log(app.userInfo);
        const avatarBase64 : any = await ApiService.getStudentPicture(app.userInfo.rollNumber);
        setAvatar({
          uri: 'data:image/png;base64,' + avatarBase64
        });
      }
    })();
  }, [app]);

  return (
    <Image
      {...props}
      source={avatar}
    />
  )
};

export default UserAvatar;
