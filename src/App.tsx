import React, { useEffect, useState } from "react";
import { Image, SafeAreaView, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import MainTabsNavigator from "navigations/main-tabs";
import DefaultAppTheme from "@theme";
import { RootState, store } from "@redux/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import AuthModal from "@screens/auth";
import { loadAppData } from "@redux/reducers/app.reducer";
import AuthService from "./services/AuthService";

const AppContent = () => {
  const app = useSelector((state: RootState) => state.app);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAppData());
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar
        translucent
        backgroundColor={"transparent"}
        barStyle={"dark-content"}
      />
      <MainTabsNavigator />
      <AuthModal />
    </SafeAreaView>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={DefaultAppTheme}>
        <AppContent />
      </NavigationContainer>
    </Provider>
  );
};

export default App;