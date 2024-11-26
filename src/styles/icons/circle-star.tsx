import { IconBase } from '../icon/';
import React, { FC } from 'react';
import Svg, { Path, G, ClipPath, Defs, Rect, Circle } from 'react-native-svg';

const CircleStar: FC<IconBase> = ({ height = 48, width = 48 }) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 48 48" fill="none">
            <Defs>
                <ClipPath id="a">
                    <Rect width={width} height={height} />
                </ClipPath>
            </Defs>
            <G transform="translate(-164 -1092)">
                <G transform="translate(-133 405)">
                    <G transform="translate(0 -1)">
                        <Circle
                            fill="#e8e8e8"
                            cx="24"
                            cy="24"
                            r="24"
                            transform="translate(297 688)"
                        />
                    </G>
                </G>
                <G transform="translate(176.945 1104.945)">
                    <G
                        className="c"
                        clipPath="url(#a)"
                        transform="translate(0.055 0.055)"
                    >
                        <Path
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            stroke="#b9b9b9"
                            strokeWidth="1.5px"
                            d="M11.355,16.707l3.7,1.945a.983.983,0,0,0,1.426-1.036L15.776,13.5l3-2.918A.982.982,0,0,0,18.227,8.9l-4.139-.6-1.85-3.753a.982.982,0,0,0-1.762,0L8.625,8.3l-4.139.6a.982.982,0,0,0-.545,1.675l3,2.918L6.23,17.616a.982.982,0,0,0,1.425,1.036l3.7-1.945Z"
                            transform="translate(-0.356 -0.383)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    );
};

export default CircleStar;
