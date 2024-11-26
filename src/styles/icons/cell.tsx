import React, { FC } from 'react';
import Svg, { Path, Line, Defs, G, Rect } from 'react-native-svg';
import { IconBase } from '../icon/';

const Cell: FC<IconBase> = ({ height = 15, width = 8 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs />
            <G transform="translate(-1227.619 -9015.744)">
                <Rect
                    width="24"
                    height="24"
                    transform="translate(1227.619 9015.744)"
                />
                <Line
                    stroke="#5c7bff"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5px"
                    x2="2.25"
                    transform="translate(1237.494 9034.244)"
                />
                <Path
                    stroke="#5c7bff"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5px"
                    d="M1241.619,9020.744a2,2,0,0,1,2,2"
                />
                <Path
                    stroke="#5c7bff"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5px"
                    d="M1243.619,9026.744v8a2,2,0,0,1-2,2h-6a2,2,0,0,1-2-2v-12a2,2,0,0,1,2-2h3"
                />
                <Path
                    stroke="#5c7bff"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="1.5px"
                    d="M1242.619,9017.744a4,4,0,0,1,4,4"
                />
            </G>
        </Svg>
    );
};

export default Cell;
