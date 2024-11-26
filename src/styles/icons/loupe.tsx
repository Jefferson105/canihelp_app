import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Loupe: FC<IconBase> = ({
    color = '#FF6F5C',
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
                <Path
                    stroke={color}
                    d="M15.713 15.714a6.276 6.276 0 110-8.875 6.275 6.275 0 010 8.875zM19 19l-3.287-3.286"
                />
            </G>
        </Svg>
    );
};

export default Loupe;
