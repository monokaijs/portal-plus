import AppHeader from '@components/app-header';
import AppSearch from '@components/app-search';
import ClassesTimeline from '@components/classes-timeline';
import Block from '@components/common/Block';
import Text from '@components/common/Text';
import React from 'react';
import {View} from 'react-native';

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <AppHeader />
      <Block noMarginBottom>
        <AppSearch />
      </Block>
      <Block style={{flex: 1}} noMarginTop>
        <Text type={'h3'}>Today Classes</Text>
        <ClassesTimeline />
      </Block>
    </View>
  );
};

export default HomeScreen;
