import React from 'react';
import Svg, { Path, Line, Defs, Rect, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const LocFixed: React.FC<IconBase> = ({ height = 14, width = 14 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Defs />
            <G transform="translate(-1283.619 -502.932)">
                <Rect
                    width="24"
                    height="24"
                    transform="translate(1283.619 502.932)"
                />
                <Line
                    stroke="#5c7bff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y2="10"
                    transform="translate(1287.841 513.821)"
                />
                <Line
                    stroke="#5c7bff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    y2="10"
                    transform="translate(1303.397 513.821)"
                />
                <Path
                    stroke="#5c7bff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M1297.841,523.821v-4.445a2.222,2.222,0,1,0-4.444,0v4.445"
                />
                <Line
                    stroke="#5c7bff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    x2="20"
                    transform="translate(1285.619 523.821)"
                />
                <Path
                    stroke="#5c7bff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5px"
                    d="M1287.92,513.821a2.2,2.2,0,0,1-2.069-3.142l1.715-3.377a2.361,2.361,0,0,1,2.115-1.259h11.876a2.361,2.361,0,0,1,2.115,1.259l1.715,3.377a2.2,2.2,0,0,1-2.069,3.142,2.39,2.39,0,0,1-2.566-2.163v-.048a6.136,6.136,0,0,0-7.7,2.211,2.409,2.409,0,0,1-2.567-2.211v.048A2.39,2.39,0,0,1,1287.92,513.821Z"
                />
            </G>
        </Svg>
    );
};

export default LocFixed;
