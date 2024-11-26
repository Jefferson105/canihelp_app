import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const ChatEmpty: FC<IconBase> = ({ height = 48, width = 48 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs>
                <ClipPath id="a">
                    <Rect
                        width="20.908"
                        height="20.002"
                        transform="translate(0 0)"
                    />
                </ClipPath>
            </Defs>
            <G transform="translate(-164 -268)">
                <G transform="translate(-133 -419)">
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
                <G transform="translate(-38 -621)">
                    <G transform="translate(216 903)">
                        <G className="c" clipPath="url(#a)">
                            <Path
                                stroke="#b9b9b9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5px"
                                d="M8.158,10.812,3.751,13.75v-3h-1a2,2,0,0,1-2-2v-6a2,2,0,0,1,2-2h9a2,2,0,0,1,2,2V5.978"
                            />
                            <Path
                                stroke="#b9b9b9"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5px"
                                d="M13.158,16.251l4,3v-3h1a2,2,0,0,0,2-2v-6a2,2,0,0,0-2-2h-8a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2Z"
                            />
                        </G>
                    </G>
                    <Rect
                        width="24"
                        height="24"
                        transform="translate(214 901)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default ChatEmpty;
