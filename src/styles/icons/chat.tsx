import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Chat: FC<IconBase> = ({ color = '#7F7F7F', height = 24, width = 24 }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
        >
            <Defs>
                <ClipPath id="prefix__a">
                    <Path d="M0 0h20.908v20.002H0z" />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)" transform="translate(2 2)">
                <Path d="M8.158 10.812L3.751 13.75v-3h-1a2 2 0 01-2-2v-6a2 2 0 012-2h9a2 2 0 012 2v3.228" />
                <Path d="M13.158 16.251l4 3v-3h1a2 2 0 002-2v-6a2 2 0 00-2-2h-8a2 2 0 00-2 2v6a2 2 0 002 2z" />
            </G>
        </Svg>
    );
};

export default Chat;
