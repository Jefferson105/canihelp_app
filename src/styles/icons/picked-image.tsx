import React, { FC } from 'react';
import Svg, { Path, Defs, Rect, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const PickedImage: FC<IconBase> = ({
    color = '#ff6f5c',
    width = 24,
    height = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs />
            <G transform="translate(-218 -235)">
                <Rect
                    fill={color}
                    width={width}
                    height={height}
                    rx={12}
                    transform={`translate(218 235)`}
                />
                <Path
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2px"
                    d="M17,9l-5,5s-1.792-1.634-3.042-2.884"
                    transform={`translate(217 236)`}
                />
            </G>
        </Svg>
    );
};

export default PickedImage;
