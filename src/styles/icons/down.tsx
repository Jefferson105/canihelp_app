import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Down: FC<IconBase> = ({ color = '#323232', height = 10, width = 10 }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 512.011 512.011"
            fill={color}
        >
            <Path
                fill={color}
                d="M505.755 123.592c-8.341-8.341-21.824-8.341-30.165 0L256.005 343.176 36.421 123.592c-8.341-8.341-21.824-8.341-30.165 0s-8.341 21.824 0 30.165l234.667 234.667a21.275 21.275 0 0015.083 6.251 21.275 21.275 0 0015.083-6.251l234.667-234.667c8.34-8.341 8.34-21.824-.001-30.165z"
            />
        </Svg>
    );
};

export default Down;
