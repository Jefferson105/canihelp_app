import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, Circle, ClipPath } from 'react-native-svg';
import { IconBase } from '../icon/';

const Followers: FC<IconBase> = ({ height = 16, width = 16 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 16 16">
            <Defs>
                <ClipPath id="a">
                    <Rect width="16" height="16" />
                </ClipPath>
            </Defs>
            <G className="b" clipPath="url(#a)">
                <Circle
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cx="1.333"
                    cy="1.333"
                    r="1.333"
                    transform="translate(3.667 4.667)"
                />
                <Circle
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    cx="1.667"
                    cy="1.667"
                    r="1.667"
                    transform="translate(9 4)"
                />
                <Path
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.5,16.667V16a2,2,0,0,0-2-2h-2a2,2,0,0,0-2,2v.667"
                    transform="translate(-3.833 -4.667)"
                />
                <Path
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.833,14H5.5a2,2,0,0,0-2,2v.667"
                    transform="translate(-1.167 -4.667)"
                />
            </G>
        </Svg>
    );
};

export default Followers;
