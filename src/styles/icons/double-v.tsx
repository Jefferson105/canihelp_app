import React, { FC } from 'react';
import Svg, { Path, Line, G, ClipPath, Defs, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

interface DoubleVProps extends IconBase {
    singleV?: boolean;
}

const DoubleV: FC<DoubleVProps> = ({
    color = '#b9b9b9',
    height = 24,
    width = 24,
    singleV = false
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect width="24" height="24" />
                </ClipPath>
            </Defs>
            {!singleV && (
                <>
                    <Line
                        stroke={color}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        x1="4.5"
                        y2="4.5"
                        transform="translate(12.5 7)"
                    />
                    <Line
                        stroke={color}
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        x1="5"
                        y1="5"
                        transform="translate(3 12)"
                    />
                </>
            )}
            <G className="c" clipPath="url(#a)">
                <Path
                    stroke={color}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5px"
                    d="M21,9l-8,8L7,11"
                />
            </G>
        </Svg>
    );
};

export default DoubleV;
