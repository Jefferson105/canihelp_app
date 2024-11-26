import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Terms: FC<IconBase> = ({
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
                <Path
                    stroke={color}
                    d="M6.536 13.074a1.958 1.958 0 010-2.146c1.32-2 3.392-3.594 5.464-3.594s4.144 1.6 5.464 3.593a1.954 1.954 0 010 2.146c-1.321 1.995-3.392 3.593-5.464 3.593s-4.144-1.597-5.464-3.592z"
                />
                <Path
                    stroke={color}
                    d="M13.237 10.764a1.75 1.75 0 11-2.475 0 1.749 1.749 0 012.475 0"
                />
                <Rect
                    stroke={color}
                    width={18}
                    height={18}
                    rx={2}
                    transform="translate(3 3)"
                />
            </G>
        </Svg>
    );
};

export default Terms;
