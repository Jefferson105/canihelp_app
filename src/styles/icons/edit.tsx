import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, ClipPath, Line } from 'react-native-svg';
import { IconBase } from '../icon/';

const Edit: FC<IconBase> = ({ color = '#323232', height = 12, width = 12 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <Line
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                x1="3.666"
                y1="3.666"
                transform="translate(13.875 6.459)"
            />
            <G className="c" clipPath="url(#a)">
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M6.252,21H3V17.749a1,1,0,0,1,.293-.707L16.628,3.707a1,1,0,0,1,1.414,0l2.251,2.251a1,1,0,0,1,0,1.415L6.958,20.707A1,1,0,0,1,6.252,21Z"
                />
            </G>
        </Svg>
    );
};

export default Edit;
