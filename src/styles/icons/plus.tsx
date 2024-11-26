import React, { FC } from 'react';
import Svg, { Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Plus: FC<IconBase> = ({ color = '#323232', height = 24, width = 24 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <G fill="none">
                <Path d="M0,0h24v24h-24Z" />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12,8v8"
                />
                <Path
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M16,12h-8"
                />
            </G>
        </Svg>
    );
};

export default Plus;
