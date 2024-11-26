import React, { FC } from 'react';
import Svg, { Path, G, ClipPath, Rect, Defs } from 'react-native-svg';
import { IconBase } from '../icon/';

const Comments: FC<IconBase> = ({ height = 15, width = 17 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            <G
                className="b"
                clipPath="url(#a)"
                stroke="#323232"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={'1.5px'}
            >
                <Path
                    fill={'none'}
                    d="M4,10.476A7.758,7.758,0,0,1,12,3a7.758,7.758,0,0,1,8,7.476c0,5.076-4.626,8.538-9,10.524V18A7.3,7.3,0,0,1,4,10.476Z"
                />
            </G>
        </Svg>
    );
};

export default Comments;
