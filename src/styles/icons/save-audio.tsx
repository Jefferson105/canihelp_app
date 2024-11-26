import React, { FC } from 'react';
import Svg, {
    Path,
    Circle,
    G,
    LinearGradient,
    Rect,
    ClipPath,
    Defs,
    Stop,
    Line
} from 'react-native-svg';
import { IconBase } from '../icon/';

const SaveAudio: FC<IconBase> = ({
    color = '#FFF',
    height = 42,
    width = 42
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 42 42">
            <Defs>
                <LinearGradient
                    id="a"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset="1" stopColor="#ff7c31" />
                    <Stop offset="0" stopColor="#ff6973" />
                </LinearGradient>
                <ClipPath id="c">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G transform="translate(-314 -470)">
                <Circle
                    fill="url(#a)"
                    cx="21"
                    cy="21"
                    r="21"
                    transform="translate(314 470)"
                />
                <Circle
                    fill="url(#a)"
                    opacity="0.3"
                    cx="16"
                    cy="16"
                    r="16"
                    transform="translate(319 475)"
                />
                <G transform="translate(323 479)">
                    <G className="d" clipPath="url(#c)">
                        <Rect
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            stroke={color}
                            width="4.5"
                            height="11.235"
                            rx="2.234"
                            transform="translate(9.75 3.015)"
                        />
                        <Path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            stroke={color}
                            d="M17.625,12A5.625,5.625,0,0,1,6.374,12"
                        />
                        <Line
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            stroke={color}
                            y1="3.375"
                            transform="translate(12 17.625)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    );
};

export default SaveAudio;
