import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Notification: FC<IconBase> = ({
    color = '#323232',
    height = 24,
    width = 23
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            stroke={color}
        >
            <Defs>
                <ClipPath id="prefix__a">
                    <Path stroke={color} d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <Path stroke={color} d="M13.6 20h-3.2" />
            <G clipPath="url(#prefix__a)">
                <Path
                    d="M17 10.032V10a5 5 0 00-10 0v2.5a.855.855 0 01-.472.764l-.5.252a1.854 1.854 0 00.829 3.512h10.289a1.854 1.854 0 00.829-3.512l-.5-.252A.855.855 0 0117 12.5z"
                    stroke={color}
                />
            </G>
        </Svg>
    );
};

export default Notification;
