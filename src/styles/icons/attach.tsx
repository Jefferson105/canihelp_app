import React, { FC } from 'react';
import Svg, { Path, G, Defs, Line, ClipPath, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Attach: FC<IconBase> = ({
    color = '#323232',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G className="b" clipPath="url(#a)">
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M14,17V9A2.009,2.009,0,0,0,9.983,9v7"
                />
                <Line
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y2="9.048"
                    transform="translate(7 8)"
                />
                <Line
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y2="7"
                    transform="translate(17 8)"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M14,17v.5a3.5,3.5,0,0,1-7,0V17"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M17,8h0A5,5,0,0,0,7,8"
                />
            </G>
        </Svg>
    );
};

export default Attach;
