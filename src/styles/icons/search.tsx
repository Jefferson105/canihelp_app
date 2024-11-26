import React, { FC } from 'react';
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Search: FC<IconBase> = ({
    color = '#FF6F5C',
    height = 23,
    width = 24
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 23"
            fill={color}
            stroke="#FFF"
        >
            <Defs>
                <ClipPath id="prefix__a">
                    <Path fill="#fff" stroke="#000" d="M0 0h24v24H0z" />
                </ClipPath>
                <ClipPath id="prefix__b">
                    <Path d="M0 0h12v12H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)">
                <Path
                    d="M19.842 8.3l-6-4.667a3 3 0 00-3.684 0l-6 4.667A3 3 0 003 10.667V18a3 3 0 003 3h12a3 3 0 003-3v-7.333A3 3 0 0019.842 8.3z"
                    strokeWidth={1.5}
                    stroke={color}
                    strokeMiterlimit={10}
                    fill={color}
                />
            </G>
            <G clipPath="url(#prefix__b)" transform="translate(6 7)">
                <Path d="M7.868 7.869a3.158 3.158 0 110-4.466 3.158 3.158 0 010 4.466zM9.523 9.523L7.869 7.869" />
            </G>
        </Svg>
    );
};

export default Search;
