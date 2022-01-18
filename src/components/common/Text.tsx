import React from "react";
import { Text as RNText, TextStyle } from "react-native";
import { ITextComponent } from "../../types";
import { Colors } from "@config/styling";

const Text = (props: ITextComponent) => {
  let style: TextStyle = {
    color: Colors.darkText
  };
  switch (props.type) {
    case "h1":
      style.fontSize = 28;
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins SemiBold";
      style.marginBottom = -12
      break;
    case "h2":
      style.fontSize = 24;
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins SemiBold";
      style.marginBottom = -8
      break;
    case "h3":
      style.fontSize = 18;
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins SemiBold";
      style.marginBottom = -6
      break;
    case "h4":
      style.fontSize = 16;
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins Medium";
      style.marginBottom = -4
      break;
    case "h5":
      style.fontSize = 14;
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins Medium";
      style.marginBottom = -2
      break;
    case "h6":
      style.fontSize = 12;
      style.fontWeight = "600";
      style.fontWeight = "normal";
      style.fontFamily = "SVN-Poppins Medium";
      style.marginBottom = -2
      break;
    default:
      style.fontSize = 12;
      style.fontWeight = "500";
  }
  style = {
    ...style,
    ...props.style
  }
  return (
    <RNText style={style} numberOfLines={props.numberOfLines}>
      {props.children}
    </RNText>
  );
};

export default Text;
