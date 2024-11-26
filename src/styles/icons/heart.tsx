import React from 'react';
import Svg, { Defs, ClipPath, G, Path } from 'react-native-svg';
import { IconBase } from '../icon/';

interface HeartProps extends IconBase {
    fill?: boolean;
}

const Heart = ({
    color = '#FF6F5C',
    fill = true,
    height = 25,
    width = 25
}: HeartProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="none" d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)">
                <Path
                    d="M12 5.71A4.75 4.75 0 0115.7 4C18.871 4 21 6.98 21 9.755 21 15.555 13.778 20 12 20S3 15.555 3 9.755C3 6.98 5.129 4 8.3 4A4.75 4.75 0 0112 5.71z"
                    fill={fill ? color : '#fff'}
                    stroke={color}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.3}
                />
            </G>
        </Svg>
    );
};

export default Heart;
