import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, Circle } from 'react-native-svg';
import { IconBase } from '../icon/';

const EditPic: FC<IconBase> = ({
    color = '#FFFF',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs />
            <G transform="translate(-1059.619 -11253.761)">
                <Rect
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    width="18"
                    height="18"
                    rx="2"
                    transform="translate(1062.619 11256.761)"
                />
                <Circle
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    cx="3"
                    cy="3"
                    r="3"
                    transform="translate(1068.619 11260.761)"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M1065.619,11274.761l.357-1.785a4,4,0,0,1,3.922-3.215h3.442a4,4,0,0,1,3.922,3.215l.357,1.785"
                />
                <Rect
                    width="24"
                    height="24"
                    transform="translate(1059.619 11253.761)"
                />
            </G>
        </Svg>
    );
};

export default EditPic;
