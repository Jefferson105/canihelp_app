import React, { FC } from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs, Line } from 'react-native-svg';
import { IconBase } from '../icon/';

const PostChat: FC<IconBase> = ({ height = 15, width = 17, color }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G className="b" fill="none" clipPath="url(#a)">
                <Path
                    stroke={color || '#323232'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.504px"
                    fill="none"
                    d="M10.481,18.71l10.987-5.832a1,1,0,0,0,0-1.765L10.5,5.29a1,1,0,0,0-1.4,1.257l2.189,5.4-2.206,5.51A1,1,0,0,0,10.481,18.71Z"
                />
                <Line
                    fill="none"
                    strokeWidth="1.5px"
                    stroke={color || '#323232'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    x2="10.717"
                    y2="0.049"
                    transform="translate(11.281 11.951)"
                />
                <Line
                    x2="1.604"
                    strokeWidth="1.5px"
                    stroke={color || '#323232'}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(4 15)"
                />
                <Line
                    stroke={color || '#323232'}
                    strokeWidth="1.5px"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={'none'}
                    x2="2.604"
                    transform="translate(3 12)"
                />
                <Line
                    stroke={color || '#323232'}
                    strokeWidth="1.5px"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill={'none'}
                    x2="3.604"
                    transform="translate(2 9)"
                />
            </G>
        </Svg>
    );
};

export default PostChat;
