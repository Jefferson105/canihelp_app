import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Shuffle: FC<IconBase> = ({
    color = '#323232',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path stroke={color} d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)">
                <Path stroke={color} d="M8 10V7a4 4 0 018 0v3" />
                <Rect
                    stroke={color}
                    width={14}
                    height={11}
                    rx={2}
                    transform="translate(5 10)"
                />
                <Path
                    stroke={color}
                    d="M9 15.541l-.005.005.005.005v-.01M12 15.541v.005l.005.005v-.01M15 15.541l-.005.005.005.005v-.01"
                />
            </G>
        </Svg>
    );
};

export default Shuffle;
