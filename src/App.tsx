import {NavigationContainer} from '@react-navigation/native';
import {setStudentInfo} from '@redux/reducers/account.reducer';
import {
  setAppReady,
  setAuthModalShown,
  setLoginStatus,
} from '@redux/reducers/app.reducer';
import {RootState, store} from '@redux/store';
import AuthModal from '@screens/auth';
import DefaultAppTheme from '@theme';
import MainTabsNavigator from 'navigations/main-tabs';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import AuthService from './services/AuthService';

const AppContent = () => {
  const app = useSelector((state: RootState) => state.app);
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
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
      />
      <NavigationContainer theme={DefaultAppTheme}>
        <MainTabsNavigator />
        <AuthModal />
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
