import React from "react";
import { IBlockProps } from "types";
import { View, ViewStyle } from "react-native";
import { Colors } from "@config/styling";

const Block = (props: IBlockProps) => {
  let style: ViewStyle = {
    padding: 16,
    margin: 16,
    borderRadius: 10,
  };
  if (props.strong) style = {
    ...style,
    backgroundColor: Colors.blockBackground,
  };
  if (props.noMarginTop) style.marginTop = 0;
  if (props.noMarginLeft) style.marginLeft = 0;
  if (props.noMarginBottom) style.marginBottom = 0;
  if (props.noMarginRight) style.marginRight = 0;

  style = {
    ...style,
    ...props.style,
  }
  return (
    <View style={style}>
      {props.children}
    </View>
  );
};

export default Block;
