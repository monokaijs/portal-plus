import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';
import {SVGProps} from './type';

const NotificationSVG = ({color, size}: SVGProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 17.848c5.64 0 8.248-.724 8.5-3.627 0-2.902-1.819-2.716-1.819-6.276C18.681 5.165 16.045 2 12 2S5.319 5.164 5.319 7.945c0 3.56-1.819 3.374-1.819 6.275.253 2.915 2.862 3.628 8.5 3.628z"
        />
        <Path d="M14.389 20.857c-1.364 1.515-3.492 1.533-4.87 0" fill={color} />
      </G>
    </Svg>
  );
};

export default NotificationSVG;
