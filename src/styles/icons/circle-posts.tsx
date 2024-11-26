import React, { FC } from 'react';
import Svg, {
    Path,
    G,
    Defs,
    Rect,
    Circle,
    Line,
    ClipPath
} from 'react-native-svg';
import { IconBase } from '../icon/';

const CirclePosts: FC<IconBase> = ({ height = 15, width = 8 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs>
                <ClipPath id="a">
                    <Rect
                        width={width}
                        height={height}
                        transform="translate(-0.22)"
                    />
                </ClipPath>
            </Defs>
            <G transform="translate(-164 -1316)">
                <G transform="translate(-133 629)">
                    <G transform="translate(0 -1)">
                        <Circle
                            fill="#e8e8e8"
                            cx="24"
                            cy="24"
                            r="24"
                            transform="translate(297 688)"
                        />
                    </G>
                </G>
                <G transform="translate(176.219 1328)">
                    <Line
                        stroke="#b9b9b9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        y2="2"
                        transform="translate(11.78 8)"
                    />
                    <Line
                        stroke="#b9b9b9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        x2="10"
                        transform="translate(6.78 13)"
                    />
                    <Line
                        stroke="#b9b9b9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        x2="10"
                        transform="translate(6.78 17)"
                    />
                    <G className="d" clipPath="url(#a)">
                        <Path
                            stroke="#b9b9b9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            d="M14.333,6H19a2,2,0,0,1,2,2V19a2,2,0,0,1-2,2H5a2,2,0,0,1-2-2V8A2,2,0,0,1,5,6H9.667"
                            transform="translate(0.031)"
                        />
                        <Path
                            stroke="#b9b9b9"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5px"
                            d="M9.5,2.5v.274a1,1,0,0,0,.219.625l.781.976v1l-1.08.811a1,1,0,0,0-.4.8V8h5.96V6.985a1,1,0,0,0-.4-.8L13.5,5.375v-1l.78-.976a.994.994,0,0,0,.22-.625V2.5A.5.5,0,0,0,14,2H10A.5.5,0,0,0,9.5,2.5Z"
                            transform="translate(0.031)"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    );
};

export default CirclePosts;
