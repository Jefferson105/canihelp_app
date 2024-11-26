import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, Circle, G } from 'react-native-svg';
import { IconBase } from '../icon/';

interface StarEmptyProps extends IconBase {
    circleFillColor?: string;
    iconColor?: string;
}

const StarEmpty: FC<StarEmptyProps> = ({
    height = 48,
    width = 48,
    circleFillColor = '#e8e8e8',
    iconColor = '#b9b9b9'
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path
                        fill="none"
                        stroke="#b9b9b9"
                        strokeWidth={1.5}
                        d="M0 0h22v22H0z"
                    />
                </ClipPath>
            </Defs>
            <Circle cx={24} cy={24} r={24} fill={circleFillColor} />
            <G transform="translate(13 13)" clipPath="url(#prefix__a)">
                <Path
                    d="M10.999 16.324l3.7 1.945a.983.983 0 001.426-1.036l-.705-4.116 3-2.918a.982.982 0 00-.549-1.682l-4.139-.6-1.85-3.753a.982.982 0 00-1.762 0L8.269 7.917l-4.139.6a.982.982 0 00-.545 1.675l3 2.918-.711 4.123a.982.982 0 001.425 1.036l3.7-1.945z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                    stroke={iconColor}
                    strokeWidth={1.5}
                />
            </G>
        </Svg>
    );
};

export default StarEmpty;
