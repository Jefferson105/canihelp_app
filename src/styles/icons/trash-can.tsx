import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, Line, ClipPath } from 'react-native-svg';
import { IconBase } from '../icon/';

const TrashCan: FC<IconBase> = ({ height = 24, width = 24 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G className="b" clipPath="url(#a)">
                <Path
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M1.027,0H14.091a1.028,1.028,0,0,1,1.028,1.028v.945A1.027,1.027,0,0,1,14.092,3H1.027A1.027,1.027,0,0,1,0,1.973V1.027A1.027,1.027,0,0,1,1.027,0Z"
                    transform="translate(4.44 6)"
                />
                <Path
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M18,9l-.847,10.166A2,2,0,0,1,15.16,21H8.84a2,2,0,0,1-1.993-1.834L6,9"
                />
                <Path
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M8,6,9.224,3.553A1,1,0,0,1,10.118,3h3.764a1,1,0,0,1,.894.553L16,6"
                />
                <Line
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y2="6"
                    transform="translate(12 12)"
                />
                <Line
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    x1="0.409"
                    y2="6"
                    transform="translate(14.591 12)"
                />
                <Line
                    stroke="#fa1616"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    x2="0.408"
                    y2="6"
                    transform="translate(9 12)"
                />
            </G>
        </Svg>
    );
};

export default TrashCan;
