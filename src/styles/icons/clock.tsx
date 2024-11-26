import React, { FC } from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Clock: FC<IconBase> = ({
    height = 17,
    width = 17,
    color = '#323232'
}) => (
    <Svg viewBox="0 0 24 24" fill="none" width={width} height={height}>
        <G
            strokeLinecap="round"
            strokeWidth="1.5"
            stroke={color}
            fill="none"
            strokeLinejoin="round"
        >
            <Path d="M8.557,3.687c4.591,-1.902 9.854,0.279 11.756,4.87c1.902,4.591 -0.279,9.854 -4.87,11.756c-4.591,1.902 -9.854,-0.279 -11.756,-4.87c-1.901,-4.591 0.279,-9.854 4.87,-11.756" />
            <Path d="M11.718,7.985v4.651l3.656,2.229" />
        </G>
        <Path fill="none" d="M0,0h24v24h-24Z" />
    </Svg>
);

export default Clock;
