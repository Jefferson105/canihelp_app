import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';
const Back: FC<IconBase> = ({ color = '#323232', height = 24, width = 24 }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
        >
            <Path
                d="M19.743 8.015A1.25 1.25 0 0018.47 6.79H4.507l5.175-4.642A1.2 1.2 0 0010.09.961a1.245 1.245 0 00-.887-.913A1.308 1.308 0 007.945.36L.405 7.118a1.193 1.193 0 000 1.791l7.54 6.761a1.309 1.309 0 001.8-.06 1.193 1.193 0 00-.063-1.732L4.507 9.239h13.962a1.25 1.25 0 001.274-1.224z"
                fill={color}
            />
        </Svg>
    );
};

export default Back;
