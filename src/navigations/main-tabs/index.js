import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "@screens/home";

const Tab = createBottomTabNavigator();

function MainTabsNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
    </Tab.Navigator>
  );
}

export default MainTabsNavigator;
