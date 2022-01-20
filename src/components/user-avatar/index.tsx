import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { Image, ImageProps, StatusBar } from "react-native";
import ApiService from "../../services/ApiService";
import AuthService from "../../services/AuthService";

const UserAvatar = (props: any) => {
  const [avatar, setAvatar] = useState(require("@assets/default-avatar.jpg"));
  const {account, app} = useSelector((state: RootState) => state);
  useEffect(() => {
    (async () => {
      if (app.appReady && app.isLoggedIn && account.rollNumber !== '') {
        const avatarBase64 : any = await ApiService.getStudentPicture(account.rollNumber);
        setAvatar({
          uri: 'data:image/png;base64,' + avatarBase64
        });
      }
    })();
  }, [account, app]);

  return (
    <Image
      {...props}
      source={avatar}
    />
  )
};

export default UserAvatar;
