import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, ClipPath } from 'react-native-svg';
import { IconBase } from '../icon/';

const Contacts: FC<IconBase> = ({
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
                    width={16}
                    height={18}
                    rx={2}
                    transform="translate(4 3)"
                />
                <Path
                    stroke={color}
                    d="M3 8h2.333M3 12h2.333M2.884 16h2.449M8 3v18M12 8h4M12 12h4"
                />
            </G>
        </Svg>
    );
};

export default Contacts;
