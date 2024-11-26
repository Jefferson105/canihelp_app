import React, { FC } from 'react';
import Svg, { Path, Defs, G } from 'react-native-svg';
import { IconBase } from '../icon/';

const EyeSvg: FC<IconBase> = ({
    color = '#323232',
    height = 23,
    width = 25
}) => {
    return (
        <Svg
            width={width}
            height={height}
            fill="none"
            viewBox="0 0 13.026 9.667"
        >
            <Defs />
            <G transform="translate(-2.487 -7.5)">
                <G transform="translate(3 8)">
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.09,12.665a.657.657,0,0,1,0-.664C4.36,9.853,6.68,8,9,8s4.639,1.853,5.909,4a.658.658,0,0,1,0,.666c-1.27,2.148-3.59,4-5.909,4S4.36,14.814,3.09,12.665Z"
                        transform="translate(-3 -8)"
                    />
                    <Path
                        stroke={color}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12.414,12.085a2,2,0,1,1-2.829,0,2,2,0,0,1,2.829,0"
                        transform="translate(-5 -9.167)"
                    />
                </G>
            </G>
        </Svg>
    );
};

export default EyeSvg;
