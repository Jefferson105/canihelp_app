import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Pin: FC<IconBase> = ({ color = '#323232', height = 24, width = 24 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path stroke={color} d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)">
                <Path stroke={color} d="M12 13a3 3 0 113-3 3 3 0 01-3 3z" />
                <Path
                    stroke={color}
                    d="M12 21s-7-5.749-7-11a7 7 0 1114 0c0 5.251-7 11-7 11z"
                />
            </G>
        </Svg>
    );
};

export default Pin;
