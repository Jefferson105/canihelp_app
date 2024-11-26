import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const Star: FC<IconBase> = ({ color = '#ff9d00', height = 16, width = 16 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 16 16">
            <Defs>
                <ClipPath id="prefix__a">
                    <Path
                        transform="translate(.055 .055)"
                        stroke={color}
                        d="M0 0h16v16H0z"
                    />
                </ClipPath>
            </Defs>
            <G clipPath="url(#prefix__a)" transform="translate(-.055 -.055)">
                <Path
                    d="M8.054 11.926l2.692 1.414a.715.715 0 001.037-.753l-.514-3 2.179-2.122a.714.714 0 00-.4-1.218l-3.01-.438-1.342-2.724a.715.715 0 00-1.281 0L6.068 5.812l-3.01.438a.714.714 0 00-.4 1.218L4.837 9.59l-.514 3a.714.714 0 001.036.753l2.692-1.414z"
                    fill={color}
                />
            </G>
        </Svg>
    );
};

export default Star;
