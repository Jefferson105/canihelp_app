import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Stop: FC<IconBase> = ({ color = '#4e4e4e', height = 12, width = 16 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Path
                fill={color}
                d="M24 5c0-2.761-2.238-5-5-5h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14z"
            />
        </Svg>
    );
};

export default Stop;
