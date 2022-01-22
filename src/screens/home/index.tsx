import AppHeader from '@components/app-header';
import AppSearch from '@components/app-search';
import Block from '@components/common/Block';
import Text from '@components/common/Text';
import React, { useEffect } from "react";
import { LogBox, ScrollView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@redux/store";

const HomeScreen = () => {
  const {userInfo: account} = useSelector((state: RootState) => state.app);

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
