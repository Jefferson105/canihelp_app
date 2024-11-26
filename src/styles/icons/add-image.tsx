import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, Line } from 'react-native-svg';
import { IconBase } from '../icon/';

const AddImage: FC<IconBase> = ({
    color = '#b9b9b9',
    height = 22,
    width = 19
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 56 56">
            <Defs />
            <G transform="translate(-1507.619 -11253.761)">
                <G transform="translate(1514.619 11260.761)">
                    <Line
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3px"
                        y2="9"
                        transform="translate(40 0)"
                    />
                    <Line
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3px"
                        x2="9"
                        transform="translate(35 5)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3px"
                        d="M1536.286,11258.761h-21a4.666,4.666,0,0,0-4.667,4.666v28a4.667,4.667,0,0,0,4.667,4.668h30.333a4.667,4.667,0,0,0,4.667-4.668v-18.666"
                        transform="translate(-1510.619 -11254.094)"
                    />
                    <G transform="translate(8.893 16.573)">
                        <Path
                            stroke={color}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3px"
                            d="M1514.794,11274.048l3.509-5.57a2.331,2.331,0,0,1,3.673-.35l2.509,2.662,2.63-5.588a2.334,2.334,0,0,1,4.153-.135l5.024,9.1a2.332,2.332,0,0,1-2.042,3.461h-17.481A2.332,2.332,0,0,1,1514.794,11274.048Z"
                            transform="translate(-1514.43 -11263.863)"
                        />
                    </G>
                </G>
                <Rect
                    width="56"
                    height="56"
                    transform="translate(1507.619 11253.761)"
                />
            </G>
        </Svg>
    );
};

export default AddImage;
