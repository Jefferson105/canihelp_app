import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import { IconBase } from '../icon/';

const OpenImage: FC<IconBase> = ({
    color = '#fff',
    height = 15,
    width = 8
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#a)">
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M12,12l9-9V3H14"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M9,3H5A2,2,0,0,0,3,5V19a2,2,0,0,0,2,2H19a2,2,0,0,0,2-2V15"
                />
            </G>
        </Svg>
    );
};

export default OpenImage;
