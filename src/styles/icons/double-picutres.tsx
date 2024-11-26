import React, { FC } from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const DoublePic: FC<IconBase> = ({
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
                <Rect
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    width="17"
                    height="15"
                    rx="2"
                    transform="translate(5 3)"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M16,21H4a2,2,0,0,1-2-2V8.4"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M11.833,8a1.667,1.667,0,1,1-1.666-1.667A1.666,1.666,0,0,1,11.833,8Z"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M22,13.833l-3.386-2.709a1,1,0,0,0-1.406.156l-2.571,3.215a1,1,0,0,1-1.406.156l-1.3-1.039a1,1,0,0,0-1.393.141L7,18"
                />
            </G>
        </Svg>
    );
};

export default DoublePic;
