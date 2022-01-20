import AppHeader from '@components/app-header';
import AppSearch from '@components/app-search';
import ClassesTimeline from '@components/classes-timeline';
import Block from '@components/common/Block';
import Text from '@components/common/Text';
import React, { useEffect } from "react";
import { LogBox, ScrollView, View } from "react-native";
import ApiService from "../../services/ApiService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { setSemestersList } from "@redux/reducers/semester.reducer";
import { ISemester } from "../../types";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const account = useSelector((state: RootState) => state.account);
  const semester = useSelector((state: RootState) => state.semester);
  // useEffect(() => {
  //   (async () => {
  //     if (account.isLoggedIn) {
  //       console.log(ApiService.authCode);
  //       const semesters : any = await ApiService.getSemesters();
  //       const sm: ISemester[] = semesters;
  //       dispatch(setSemestersList(sm));
  //
  //     }
  //   })();
  // }, [account]);
  //
  // useEffect(() => {
  //   (async () => {
  //     if (semester.currentSemester.SemesterName) {
  //       const activities = await ApiService.getStudentActivities(account.rollNumber, 5, semester.currentSemester.SemesterName);
  //       // console.log(activities);
  //     }
  //   })();
  // }, [semester]);

  return (
    <View style={{flex: 1, paddingBottom: 60}}>
      <AppHeader />
      <ScrollView>
        <Block noMarginBottom>
          <AppSearch />
        </Block>
        <Block style={{flex: 1}} noMarginTop>
          <Text type={'h3'}>Today Classes</Text>
        </Block>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
