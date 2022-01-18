import * as React from 'react';
import { DefaultTheme } from '@react-navigation/native';
import { Colors } from "@config/styling";

const DefaultAppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
  },
};

export default DefaultAppTheme;
