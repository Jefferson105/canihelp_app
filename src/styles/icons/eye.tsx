import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { View, ViewStyle } from 'react-native';
import { IconBase } from '../icon/';

const Eye: FC<IconBase> = ({ color = '#323232', height = 23, width = 25 }) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
        >
            <Path
                d="M3.118,12.467a.987.987,0,0,1,0-.935C5.011,8.033,8.506,5,12,5s6.99,3.033,8.883,6.532a.993.993,0,0,1,0,.935C18.99,15.967,15.495,19,12,19S5.011,15.967,3.118,12.467Z"
                stroke={color}
                strokeWidth={1}
            />
            <View
                style={
                    {
                        height: 8,
                        width: 8,
                        borderRadius: 20,
                        borderWidth: 1,
                        left: 8,
                        top: 8,
                        borderColor: '#323232'
                    } as ViewStyle
                }
            />
        </Svg>
    );
};

export default Eye;
