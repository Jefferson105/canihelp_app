import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const TripleDot: FC<IconBase> = ({
    color = '#fff',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs>
                <ClipPath id="a">
                    <Rect
                        width="24"
                        height="24"
                        transform="translate(5.168 5)"
                    />
                </ClipPath>
            </Defs>
            <G transform="translate(-5.168 -5)">
                <G className="b" clipPath="url(#a)">
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5px"
                        d="M12.157,11.625a.534.534,0,1,0,.535.534.532.532,0,0,0-.535-.534"
                        transform="translate(4.925 4.925)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5px"
                        d="M16.157,11.625a.534.534,0,1,0,.535.534.532.532,0,0,0-.535-.534"
                        transform="translate(6.62 4.925)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5px"
                        d="M8.157,11.625a.534.534,0,1,0,.535.534.532.532,0,0,0-.535-.534"
                        transform="translate(3.23 4.925)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default TripleDot;
