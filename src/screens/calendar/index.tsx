import AppHeader from "@components/app-header";
import AppSearch from "@components/app-search";
import ClassesTimeline from "@components/classes-timeline";
import Block from "@components/common/Block";
import Text from "@components/common/Text";
import React, { useEffect } from "react";
import { LogBox, ScrollView, View } from "react-native";
import WeeklyCalendar from "@components/weekly-calendar";
import ContentCard from "@components/content-card";

const CalendarScreen = () => {
  useEffect(() => {
  }, []);
  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <AppHeader />
      <Block noMarginBottom>
        <ContentCard />
      </Block>
      <ScrollView>
        <Block style={{ flex: 1 }} noMarginTop>
          <WeeklyCalendar />
        </Block>
      </ScrollView>
    </View>
  );
};

export default CalendarScreen;
