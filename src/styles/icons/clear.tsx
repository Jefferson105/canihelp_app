import React, { FC } from 'react';
import Svg, { Rect, Circle } from 'react-native-svg';
import { IconBase } from '../icon/';

const Clear: FC<IconBase> = ({
    color = '#7F7F7F',
    height = 16,
    width = 16
}) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 16 16" fill="none">
            <Circle cx="8" cy="8" r="8" fill="#CCCED3C2" />
            <Rect
                x="5"
                y="5.74976"
                width="1.06066"
                height="7.4246"
                rx="0.530329"
                transform="rotate(-45 5 5.74976)"
                fill={color}
            />
            <Rect
                x="10.25"
                y="5"
                width="1.06066"
                height="7.4246"
                rx="0.530329"
                transform="rotate(45 10.25 5)"
                fill={color}
            />
        </Svg>
    );
};

export default Clear;
