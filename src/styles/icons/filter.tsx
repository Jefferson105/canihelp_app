import React, { FC } from 'react';
import Svg, { Defs, ClipPath, Path, G, Circle } from 'react-native-svg';
import { IconBase } from '../icon/';

const Filter: FC<IconBase> = ({
    color = '#323232',
    height = 24,
    width = 24
}) => {
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            viewBox={`0 0 ${width} ${height}`}
        >
            <Defs>
                <ClipPath id="prefix__a">
                    <Path stroke="#323232" d="M0 0h24v24H0z" />
                </ClipPath>
            </Defs>
            <Path stroke={color} d="M5 6V3" />
            <G className="prefix__c">
                <Path stroke={color} d="M5 21V10" />
            </G>
            <Path stroke={color} d="M12 14V3" />
            <G className="prefix__c">
                <Path stroke={color} d="M12 21v-3" />
            </G>
            <Path stroke={color} d="M19 6V3" />
            <G className="prefix__c">
                <Path stroke={color} d="M19 21V10" />
                <Circle
                    stroke={color}
                    cx={2}
                    cy={2}
                    r={2}
                    transform="translate(3 6)"
                />
                <Circle
                    stroke={color}
                    cx={2}
                    cy={2}
                    r={2}
                    transform="translate(10 14)"
                />
                <Circle
                    stroke={color}
                    cx={2}
                    cy={2}
                    r={2}
                    transform="translate(17 6)"
                />
            </G>
        </Svg>
    );
};

export default Filter;
