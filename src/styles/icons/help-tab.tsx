import React from 'react';
import Svg, { Path, Line, Defs, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const HelpTab: React.FC<IconBase> = ({
    color = '#b9b9b9',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs />
            <G transform="translate(0)">
                <G transform="translate(3 3)">
                    <Line
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        x2="7.99"
                        transform="translate(5.005 14)"
                    />
                    <Line
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        x2="7.99"
                        transform="translate(5.005 10)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        d="M1414.619,6112.744h-6.465a1,1,0,0,1-.832-.445l-1.406-2.11a1,1,0,0,0-.832-.445h-4.465a2,2,0,0,0-2,2v11a2,2,0,0,0,2,2h14a2,2,0,0,0,2-2v-8A2,2,0,0,0,1414.619,6112.744Z"
                        transform="translate(-1398.619 -6106.744)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5px"
                        d="M1400.619,6109.744v-1a2,2,0,0,1,2-2h10a2,2,0,0,1,2,2v4"
                        transform="translate(-1398.619 -6106.744)"
                    />
                </G>
                <G transform="translate(0)">
                    <Path
                        d="M1395.619,6103.744h24v24h-24Z"
                        transform="translate(-1395.619 -6103.744)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default HelpTab;
