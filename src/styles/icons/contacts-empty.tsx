import React, { FC } from 'react';
import Svg, { Path, G, Defs, Rect, Circle } from 'react-native-svg';
import { IconBase } from '../icon/';

const ContactsEmpty: FC<IconBase> = ({ height = 48, width = 48 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs />
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
                <G transform="translate(-263.999 -10637.342)">
                    <Circle
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        cx="2.5"
                        cy="2.5"
                        r="2.5"
                        transform="translate(449.499 10927.592)"
                    />
                    <Circle
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        cx="2.5"
                        cy="2.5"
                        r="2.5"
                        transform="translate(454.986 10921.592)"
                    />
                    <Path
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M458,10929.592a6.55,6.55,0,0,1,4,1.333"
                    />
                    <Circle
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        cx="2.5"
                        cy="2.5"
                        r="2.5"
                        transform="translate(444.013 10921.592)"
                    />
                    <Path
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M442,10930.925a6.552,6.552,0,0,1,4-1.333"
                    />
                    <Path
                        stroke="#b9b9b9"
                        strokeWidth="1.5px"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M456.591,10937.092a7.777,7.777,0,0,0-9.183,0"
                    />
                    <Rect
                        width="24"
                        height="24"
                        transform="translate(439.999 10917.342)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default ContactsEmpty;
