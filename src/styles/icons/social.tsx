import React, { FC } from 'react';
import Svg, { Path, Circle, Line, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Social: FC<IconBase> = ({
    color = '#b9b9b9',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <G transform="translate(1.935 3.001)">
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.341"
                    cy="2.341"
                    r="2.341"
                    transform="translate(7.725 6.659)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(15.918 6.893)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(0 6.893)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(11.938)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(3.979 13.785)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(3.979)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="2.107"
                    cy="2.107"
                    r="2.107"
                    transform="translate(11.938 13.785)"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M787.21,2258.624"
                    transform="translate(-781.124 -2242.732)"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M791.189,2251.731"
                    transform="translate(-781.124 -2242.732)"
                />
                <Line
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y1="3.049"
                    x2="1.76"
                    transform="translate(7.14 11.019)"
                />
                <Line
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    x2="1.76"
                    y2="3.049"
                    transform="translate(7.14 3.931)"
                />
                <Line
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    x1="3.514"
                    transform="translate(12.404 9)"
                />
            </G>
            <G transform="translate(0)">
                <Path
                    d="M779.189,2239.731h24v24h-24Z"
                    transform="translate(-779.189 -2239.731)"
                />
            </G>
        </Svg>
    );
};

export default Social;
