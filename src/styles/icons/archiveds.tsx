import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Archiveds: FC<IconBase> = ({
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
                <Rect
                    stroke={color}
                    width={18}
                    height={18}
                    rx={2}
                    transform="translate(3 3)"
                />
                <Path
                    stroke={color}
                    d="M7 7h10M7 11h10M3 15h4.382a1 1 0 01.894.553l.448.894a1 1 0 00.894.553h4.764a1 1 0 00.894-.553l.448-.894a1 1 0 01.894-.553H21"
                />
            </G>
        </Svg>
    );
};

export default Archiveds;
