import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Exit: FC<IconBase> = ({ color = '#323232', height = 24, width = 24 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path stroke={color} d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <Path
                stroke={color}
                d="M15.375 12H3M12 8.625L15.375 12 12 15.374"
            />
            <G clipPath="url(#prefix__a)">
                <Path
                    stroke={color}
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V5.25A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25V7.5"
                />
            </G>
        </Svg>
    );
};

export default Exit;
