import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const Check: FC<IconBase> = ({ color = '#FFF', height = 8, width = 8 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 512 512">
            <Path
                fill={color}
                d="M159.988 318.582c-3.988 4.012-9.43 6.25-15.082 6.25s-11.094-2.238-15.082-6.25L9.375 198.113c-12.5-12.5-12.5-32.77 0-45.246l15.082-15.086c12.504-12.5 32.75-12.5 45.25 0l75.2 75.203L348.104 9.781c12.504-12.5 32.77-12.5 45.25 0l15.082 15.086c12.5 12.5 12.5 32.766 0 45.246zm0 0"
            />
        </Svg>
    );
};

export default Check;
