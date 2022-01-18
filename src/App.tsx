import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StatusBar, View} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import {IAuthenticationResponse} from 'types';
import {NavigationContainer} from '@react-navigation/native';
import MainTabsNavigator from 'navigations/main-tabs';
import DefaultAppTheme from '@theme';
import ApiService from './services/ApiService';

const App = () => {
  const [avatar, setAvatar] = useState('');
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      await ApiService.loginByGoogleToken(idToken || '');
      const avatarBase64 = await ApiService.getStudentPicture('GCH190414');
      setAvatar(`data:image/png;base64,${avatarBase64}`);
    } catch (error: any) {
      console.log(JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '959715381720-udh2acbcp7206kqu6cfnufg3rcvqem7c.apps.googleusercontent.com',
      offlineAccess: true,
    });
    signIn();
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <NavigationContainer theme={DefaultAppTheme}>
        <MainTabsNavigator />
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
