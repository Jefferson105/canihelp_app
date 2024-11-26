import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

interface PolygonProps extends IconBase {
    //
}

const Polygon: FC<PolygonProps> = (props) => {
    return (
        <Svg width={10} height={6} viewBox="0 0 10 6" fill="none" {...props}>
            <Path
                d="M5.384 5.539a.5.5 0 01-.768 0L.683.82A.5.5 0 011.068 0h7.864a.5.5 0 01.384.82z"
                fill="#333"
            />
        </Svg>
    );
};

export default Polygon;
