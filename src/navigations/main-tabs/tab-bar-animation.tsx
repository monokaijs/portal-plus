import HomeSVG from '@assets/icons/HomeSVG';
import ProfileSVG from '@assets/icons/ProfileSVG';
import NotificationSVG from '@assets/icons/NotificationSVG';
import TabItem from '@components/tab-item';
import {Colors} from '@config/styling';
import {getSize} from '@utils';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import CalendarSVG from '@assets/icons/CalendarSVG';

const TabBarAnimation = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.bar}>
      {state.routes.map((route: {name: string; key: string}, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;
        const iconTab =
          route.name === 'Home' ? (
            <HomeSVG color={Colors.primary} size={24} />
          ) : route.name === 'Calendar' ? (
            <CalendarSVG color={Colors.primary} size={24} />
          ) : route.name === 'Notification' ? (
            <NotificationSVG color={Colors.primary} size={24} />
          ) : (
            <ProfileSVG color={Colors.primary} size={24} />
          );

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem
            key={index}
            icon={iconTab}
            label={isFocused ? label : null}
            active={isFocused}
            onPress={onPress}
            style={styles.item}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    height: getSize.s(70),
    backgroundColor: 'white',
    overflow: 'hidden',
    paddingBottom: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 100,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#00000022',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 20,
  },
  item: {
    flex: 1,
  },
});

export default TabBarAnimation;
