import React from "react";
import { View } from "react-native";
import AppHeader from "@components/app-header";
import Block from "@components/common/Block";
import AppSearch from "@components/app-search";
import Text from "@components/common/Text";
import ClassesTimeline from "@components/classes-timeline";

const HomeScreen = () => {
  return (
    <View>
      <AppHeader />
      <Block noMarginBottom>
        <AppSearch/>
      </Block>
      <Block noMarginTop>
        <Text type={"h3"}>
          Today Classes
        </Text>
        <ClassesTimeline/>
      </Block>
    </View>
  );
};

export default HomeScreen;
