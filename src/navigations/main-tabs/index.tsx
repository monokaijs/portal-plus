import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CalendarScreen from '@screens/calendar';
import HomeScreen from '@screens/home';
import PersonalScreen from '@screens/personal';
import React from 'react';
import TabBarAnimation from './tab-bar-animation';

const Tab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={rest => <TabBarAnimation {...rest} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendar',
        }}
      />
      <Tab.Screen
        name="Notification"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Notification',
        }}
      />
      <Tab.Screen
        name="Personal"
        component={PersonalScreen}
        options={{
          tabBarLabel: 'Personal',
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
