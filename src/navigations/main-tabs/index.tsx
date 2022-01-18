// import React from "react";
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from "@screens/home";

// const Tab = createBottomTabNavigator();

// function MainTabsNavigator() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//         options={{headerShown: false}}
//       />
//       {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
//     </Tab.Navigator>
//   );
// }

// export default MainTabsNavigator;

import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig,
} from '@gorhom/animated-tabbar';
import HomeScreen from '@screens/home';
import HomeSVG from '@assets/icons/HomeSVG';
import LikeSVG from '@assets/icons/LikeSVG';
import SearchSVG from '@assets/icons/SearchSVG';
import ProfileSVG from '@assets/icons/ProfileSVG';
import {MainTabsParams} from './type';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<BubbleTabBarItemConfig, MainTabsParams> = {
  Feed: {
    labelStyle: {
      color: '#00305E',
      fontWeight: 'bold',
      fontSize: 13,
    },
    icon: {
      component: HomeSVG,
      activeColor: '#00305E',
      inactiveColor: 'rgba(48,48,48,0.6)',
    },
    background: {
      activeColor: 'rgba(245,247,250,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Message: {
    labelStyle: {
      color: '#00305E',
      fontWeight: 'bold',
      fontSize: 13,
    },
    icon: {
      component: LikeSVG,
      activeColor: '#00305E',
      inactiveColor: 'rgba(48,48,48,0.6)',
    },
    background: {
      activeColor: 'rgba(245,247,250,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Notification: {
    labelStyle: {
      color: '#00305E',
      fontWeight: 'bold',
      fontSize: 13,
    },
    icon: {
      component: SearchSVG,
      activeColor: '#00305E',
      inactiveColor: 'rgba(48,48,48,0.6)',
    },
    background: {
      activeColor: 'rgba(245,247,250,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Tool: {
    labelStyle: {
      color: '#00305E',
      fontWeight: 'bold',
      fontSize: 13,
    },
    icon: {
      component: ProfileSVG,
      activeColor: '#00305E',
      inactiveColor: 'rgba(48,48,48,0.6)',
    },
    background: {
      activeColor: 'rgba(245,247,250,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
  Personal: {
    labelStyle: {
      color: '#00305E',
      fontWeight: 'bold',
      fontSize: 13,
    },
    icon: {
      component: ProfileSVG,
      activeColor: '#00305E',
      inactiveColor: 'rgba(48,48,48,0.6)',
    },
    background: {
      activeColor: 'rgba(245,247,250,1)',
      inactiveColor: 'rgba(223,215,243,0)',
    },
  },
};

const MainTabsNavigator = () => {
  const tabBarOptions: any = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        marginLeft: 15,
        marginRight: 16,
        marginBottom: 16,
        // paddingRight: -10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,

        elevation: 24,
      },
    }),
    [],
  );
  return (
    <Tab.Navigator
      // tabBarOptions={tabBarOptions}
      tabBar={props => (
        <AnimatedTabBar
          iconSize={20}
          itemOuterSpace={12}
          itemInnerSpace={12}
          duration={750}
          tabs={tabs}
          {...props}
        />
      )}>
      <Tab.Screen
        name="Feed"
        initialParams={{
          backgroundColor: tabs.Feed.labelStyle.color,
          nextScreen: 'Likes',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Message"
        initialParams={{
          backgroundColor: tabs.Message.labelStyle.color,
          nextScreen: 'Search',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Notification"
        initialParams={{
          backgroundColor: tabs.Notification.labelStyle.color,
          nextScreen: 'Profile',
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Tool"
        initialParams={{
          backgroundColor: tabs.Tool.labelStyle.color,
          nextScreen: 'Account',
        }}
        component={HomeScreen}
      />
      {/* <Tab.Screen
        name="Personal"
        initialParams={{
          backgroundColor: tabs.Personal.labelStyle.color,
          nextScreen: 'Home',
        }}
        component={HomeScreen}
      /> */}
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
