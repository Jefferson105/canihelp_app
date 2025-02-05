import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Aim: FC<IconBase> = ({
    color = 'rgba(0,0,0,.54)',
    height = 11,
    width = 12
}) => {
    return (
        <Svg
            id="regular"
            enable-background="new 0 0 24 24"
            height={height}
            viewBox="0 0 24 24"
            width={width}
            fill="none"
        >
            <Path
                d="m12 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10zm0-18.5c-4.687 0-8.5 3.813-8.5 8.5s3.813 8.5 8.5 8.5 8.5-3.813 8.5-8.5-3.813-8.5-8.5-8.5z"
                fill={color}
            />

            <Path
                d="m12 5c-.414 0-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75s.75.336.75.75v3.5c0 .414-.336.75-.75.75z"
                fill={color}
            />

            <Path
                d="m23.25 12.75h-3.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                fill={color}
            />

            <Path
                d="m12 24c-.414 0-.75-.336-.75-.75v-3.5c0-.414.336-.75.75-.75s.75.336.75.75v3.5c0 .414-.336.75-.75.75z"
                fill={color}
            />

            <Path
                d="m4.25 12.75h-3.5c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h3.5c.414 0 .75.336.75.75s-.336.75-.75.75z"
                fill={color}
            />

            <Path
                d="m12 15c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm0-4.5c-.827 0-1.5.673-1.5 1.5s.673 1.5 1.5 1.5 1.5-.673 1.5-1.5-.673-1.5-1.5-1.5z"
                fill={color}
            />
        </Svg>
    );
};

export default Aim;
