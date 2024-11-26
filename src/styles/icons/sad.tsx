import React, { FC } from 'react';
import Svg, { Defs, Circle, Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Sad: FC<IconBase> = ({ color = '#e8e8e8', height = 48, width = 48 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs />
            <Circle cx={24} cy={24} r={24} fill={color} />
            <Path d="M6 6h36v36H6z" />
            <Path
                stroke="#b9b9b9"
                d="M24 10.68a13.319 13.319 0 1013.319 13.319A13.334 13.334 0 0024 10.68zM18.999 29h10M18.82 19.56v1.48M29.18 19.56v1.48"
            />
        </Svg>
    );
};

export default Sad;
