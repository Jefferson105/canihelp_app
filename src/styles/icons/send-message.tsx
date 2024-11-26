import React, { FC } from 'react';
import Svg, {
    Path,
    LinearGradient,
    Defs,
    Stop,
    G,
    ClipPath,
    Rect,
    Circle,
    Line
} from 'react-native-svg';
import { IconBase } from '../icon/';

const SendMessage: FC<IconBase> = ({
    color = '#fff',
    height = 32,
    width = 32
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 32 32">
            <Defs>
                <LinearGradient
                    id="a"
                    x1="0.5"
                    x2="0.5"
                    y2="1"
                    gradientUnits="objectBoundingBox"
                >
                    <Stop offset="0" stopColor="#ff6779" />
                    <Stop offset="1" stopColor="#ff7d2c" />
                </LinearGradient>
                <ClipPath id="b">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G transform="translate(-319 -475)">
                <Circle
                    fill="url(#a)"
                    cx="16"
                    cy="16"
                    r="16"
                    transform="translate(319 475)"
                />
                <G transform="translate(324 479)">
                    <G className="c" clipPath="url(#b)">
                        <Path
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            d="M5.323,19.878l14.429-6.7a1.3,1.3,0,0,0,0-2.36L5.323,4.122A1.29,1.29,0,0,0,3.58,5.743L5.812,12,3.58,18.257A1.29,1.29,0,0,0,5.323,19.878Z"
                        />
                        <Line
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            x2="14.688"
                            transform="translate(5.812 11.997)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    );
};

export default SendMessage;
