import React, { useMemo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AnimatedTabBar, {
  TabsConfig,
  BubbleTabBarItemConfig,
} from "@gorhom/animated-tabbar";
import HomeScreen from "@screens/home";
import HomeSVG from "@assets/icons/HomeSVG";
import LikeSVG from "@assets/icons/LikeSVG";
import SearchSVG from "@assets/icons/SearchSVG";
import ProfileSVG from "@assets/icons/ProfileSVG";
import { MainTabsParams } from "./type";
import { Colors } from "@config/styling";
import { useTheme } from "@react-navigation/native";
import PersonalScreen from "@screens/personal";
import CalendarScreen from "@screens/calendar";

const Tab = createBottomTabNavigator<MainTabsParams>();

const MainTabsNavigator = () => {
  const { colors } = useTheme();
  const tabBarOptions: any = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: 100,
        marginHorizontal: 20,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.4,
        shadowRadius: 16,
        elevation: 24,
      },
    }),
    [],
  );
  return (
    <Tab.Navigator
      tabBarOptions={tabBarOptions}
      tabBar={props => (
        <AnimatedTabBar
          iconSize={20}
          itemOuterSpace={12}
          itemInnerSpace={16}
          duration={750}
          tabs={{
            Home: {
              labelStyle: {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 13,
              },
              icon: {
                component: HomeSVG,
                color: colors.primary,
              },
            },
            Calendar: {
              labelStyle: {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 13,
              },
              icon: {
                component: LikeSVG,
                color: colors.primary,
              },
            },
            Notification: {
              labelStyle: {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 13,
              },
              icon: {
                component: SearchSVG,
                color: colors.primary,
              },
            },
            Tool: {
              labelStyle: {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 13,
              },
              icon: {
                component: ProfileSVG,
                color: colors.primary,
              },
            },
            Personal: {
              labelStyle: {
                color: colors.primary,
                fontWeight: "bold",
                fontSize: 13,
              },
              icon: {
                component: ProfileSVG,
                color: colors.primary
              },
            },
          }}
          preset={"flashy"}
          {...props}
        />
      )}>
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: colors.primary,
          nextScreen: "Likes",
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Calendar"
        initialParams={{
          backgroundColor: colors.primary,
          nextScreen: "Notification",
        }}
        component={CalendarScreen}
      />
      <Tab.Screen
        name="Notification"
        initialParams={{
          backgroundColor: colors.primary,
          nextScreen: "Profile",
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Personal"
        initialParams={{
          backgroundColor: colors.primary,
          nextScreen: 'Home',
        }}
        component={PersonalScreen}
      />
    </Tab.Navigator>
  );
};

export default MainTabsNavigator;
