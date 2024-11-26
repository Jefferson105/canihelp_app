import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Play: FC<IconBase> = ({ color = '#4e4e4e', height = 12, width = 16 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 12 16">
            <Path
                fill={color}
                d="M7.168,1.248a1,1,0,0,1,1.664,0l6.131,9.2A1,1,0,0,1,14.131,12H1.869a1,1,0,0,1-.832-1.555Z"
                transform="translate(12) rotate(90)"
            />
        </Svg>
    );
};

export default Play;
