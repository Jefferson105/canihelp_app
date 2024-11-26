import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Right: FC<IconBase> = ({ color = '#88898B', height = 9, width = 6 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 6 9">
            <Path
                d="M1 1L5 4.5L1 8"
                stroke={color}
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
};

export default Right;
