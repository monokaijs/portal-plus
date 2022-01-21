import {Colors} from '@config/styling';
import {useSpring} from 'hook/useSpring';
import React from 'react';
import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';

const activeColor = Colors.primary;

interface PropsDiagonal {
  style?: StyleProp<ViewStyle>;
  visibility: any;
  coverColor?: string;
  children: any;
}

interface PropsTabItem {
  style?: StyleProp<ViewStyle>;
  icon: any;
  label: string;
  active: boolean;
  onPress: () => void;
}

const DiagonalTransition = ({
  style,
  visibility,
  coverColor = 'white',
  children,
}: PropsDiagonal) => {
  const translateY = visibility.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, 0],
  });
  return (
    <View style={[styles.containers, style]}>
      {children}
      <Animated.View
        style={[styles.coverContainer, {transform: [{translateY}]}]}>
        <View style={[styles.cover, {backgroundColor: coverColor}]} />
      </Animated.View>
    </View>
  );
};

const TabItem = ({style, icon, label, active, onPress}: PropsTabItem) => {
  const animation = useSpring({to: active ? 1 : 0}, {stiffness: 50});
  const dotScale = animation;
  const iconTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -30],
  });
  const labelTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  });
  const iconVisibility = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const labelVisibility = animation;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Animated.View
          style={[
            styles.centered,
            {transform: [{translateY: labelTranslate}]},
          ]}>
          <DiagonalTransition visibility={labelVisibility}>
            <Text style={styles.label}>{label}</Text>
          </DiagonalTransition>
        </Animated.View>
        <Animated.View
          style={[styles.centered, {transform: [{translateY: iconTranslate}]}]}>
          <DiagonalTransition visibility={iconVisibility}>
            {/* <Image style={styles.icon} source={icon} resizeMode="contain" /> */}
            {icon}
          </DiagonalTransition>
        </Animated.View>
        <Animated.View style={[styles.dot, {transform: [{scale: dotScale}]}]} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centered: {
    position: 'absolute',
  },
  label: {
    color: activeColor,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  dot: {
    position: 'absolute',
    bottom: 8,
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.primary,
  },
  containers: {
    overflow: 'hidden',
  },
  coverContainer: {
    position: 'absolute',
    top: '120%',
    width: '100%',
  },
  cover: {
    height: 40,
    transform: [{skewY: '10deg'}],
  },
});

export default TabItem;
