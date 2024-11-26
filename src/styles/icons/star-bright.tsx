import React, { FC } from 'react';
import Svg, { Path, Defs, G, Rect, ClipPath } from 'react-native-svg';
import { IconBase } from '../icon/';

const StarBright: FC<IconBase> = ({
    color = '#000',
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
                    d="M12 15.424l2.4 1.252a.636.636 0 00.924-.667l-.458-2.651 1.942-1.876a.631.631 0 00-.353-1.079l-2.683-.387L12.571 7.6a.639.639 0 00-1.142 0l-1.2 2.414-2.683.386a.631.631 0 00-.353 1.079l1.942 1.876-.458 2.651a.636.636 0 00.924.667L12 15.424"
                />
            </G>
        </Svg>
    );
};

export default StarBright;
