import React, { FC } from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const CheckProfile: FC<IconBase> = ({ height = 22, width = 19 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <Path
                stroke="#323232"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5px"
                d="M19.561,7.444,12.005,15,8.228,11.222"
            />
            <G className="c" clipPath="url(#a)">
                <Path
                    stroke="#323232"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M21,12a9.022,9.022,0,1,1-4.964-8.036"
                />
            </G>
        </Svg>
    );
};

export default CheckProfile;
