import React, { FC } from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Verified: FC<IconBase> = ({ height = 22, width = 19 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G className="b" clipPath="url(#a)">
                <Path
                    fill="#00e584"
                    d="M12,21h0a9,9,0,0,1-9-9V5A2,2,0,0,1,5,3H19a2,2,0,0,1,2,2v7A9,9,0,0,1,12,21Z"
                />
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2px"
                    d="M17,9l-5,5s-1.792-1.634-3.042-2.884"
                    transform="translate(-1)"
                />
            </G>
        </Svg>
    );
};

export default Verified;
