import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { NavigationContainer } from "@react-navigation/native";
import MainTabsNavigator from "navigations/main-tabs";
import DefaultAppTheme from "@theme";
import ApiService from "./services/ApiService";
import { RootState, store } from "@redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { setAvatar, setStudentInfo } from "@redux/reducers/account.reducer";
import AuthService from "./services/AuthService";
import { setAppReady, setAuthModalShown, setLoginStatus } from "@redux/reducers/app.reducer";
import AuthModal from "@screens/auth";
import { getData } from "./services/StorageService";

const AppContent = () => {
  const app = useSelector((state : RootState) => state.app);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const loginStatus = await AuthService.getLoginStatus();
      dispatch(setLoginStatus(loginStatus));
      if (!loginStatus) {
        dispatch(setAuthModalShown(!app.isLoggedIn));
      } else {
        console.log('just reload the auth data');
        const loginData = await AuthService.getLoginData();
        console.log('login data', loginData);
        dispatch(setStudentInfo(loginData.userInfo));
        console.log('now reload auth data');
        // renew auth data
        try {
          await AuthService.refreshAuthData();
        } catch (e) {
          await AuthService.signOut();
          dispatch(setAuthModalShown(true));
        }
      }
      dispatch(setAppReady(true));
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <NavigationContainer theme={DefaultAppTheme}>
        <MainTabsNavigator />
        <AuthModal/>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
