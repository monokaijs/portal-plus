import * as React from 'react';
import Svg, {Circle, G, Path} from 'react-native-svg';
import {SVGProps} from './type';

const ProfileSVG = ({color, size}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G
        transform="translate(4 3)"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="M16 18v-2a4 4 0 00-4-4H4a4 4 0 00-4 4v2" stroke={color} />
        <Circle cx={8} cy={4} r={4} stroke={color} />
      </G>
    </Svg>
  );
};

export default ProfileSVG;
