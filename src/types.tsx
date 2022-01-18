import { StyleProp, TextProps, TextStyle, TextStyleAndroid, ViewStyle } from "react-native";

export interface IAuthenticationResponse {
  data: [{
    AuthenKey: String,
    Email?: String,
    Rollnumber?: String,
    StudentName?: String
    TypeAcc?: String,
  }],
  error_message?: String,
  message?: String,
  status?: Number,
  status_string?: String,
  summary_data?: String
}

export interface ITextComponent extends TextProps {
  children?: any,
  type?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "content",
  style?: TextStyle
}

export interface IBlockProps {
  type?: String,
  style?: ViewStyle,
  children?: any,
  strong?: boolean,
  noMarginTop?: boolean,
  noMarginBottom?: boolean,
  noMarginLeft?: boolean,
  noMarginRight?: boolean,
  numberOfLines?: Number
}
