import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const ArrowBack: FC<IconBase> = ({
    color = '#fff',
    height = 16,
    width = 19.742
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 19.742 16">
            <Path
                fill={color}
                d="M38.711,31.837a1.25,1.25,0,0,0-1.273-1.225H23.475l5.175-4.642a1.2,1.2,0,0,0,.408-1.187,1.245,1.245,0,0,0-.887-.913,1.308,1.308,0,0,0-1.258.312l-7.54,6.758a1.193,1.193,0,0,0,0,1.791l7.54,6.761a1.309,1.309,0,0,0,1.8-.06A1.193,1.193,0,0,0,28.65,37.7l-5.175-4.639H37.437A1.25,1.25,0,0,0,38.711,31.837Z"
                transform="translate(-18.968 -23.822)"
            />
        </Svg>
    );
};

export default ArrowBack;
