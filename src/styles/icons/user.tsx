import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';
import { IconBase } from '../icon/';

const User: FC<IconBase> = ({ color = '#323232', height = 24, width = 24 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="none" d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)">
                <Circle
                    stroke={color}
                    cx={2.25}
                    cy={2.25}
                    r={2.25}
                    transform="translate(6.25 7.5)"
                />
                <Path
                    stroke={color}
                    d="M2 18.5V5.54A2.04 2.04 0 014.041 3.5H20a2 2 0 012 2v13a2 2 0 01-2 2H4a2 2 0 01-2-2zM15 9.5h4M17.4 13.5H15"
                />
                <Path
                    stroke={color}
                    d="M12.1 16.5a3.176 3.176 0 00-2.949-2H7.854a3.173 3.173 0 00-2.948 2"
                />
            </G>
        </Svg>
    );
};

export default User;
