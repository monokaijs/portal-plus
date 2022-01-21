import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {SVGProps} from './type';

const SearchSVG = ({color, size}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G
        transform="translate(3 3)"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Circle cx={8} cy={8} r={8} stroke={color} />
        <Path d="M18 18l-4.35-4.35" stroke={color} />
      </G>
    </Svg>
  );
};

export default SearchSVG;
