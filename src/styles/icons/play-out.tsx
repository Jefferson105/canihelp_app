import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

interface PlayOutProps extends IconBase {
    border?: string;
}

const PlayOut: React.FC<PlayOutProps> = ({
    color = '#fff',
    border = '#fff',
    height = 12,
    width = 16
}) => {
    return (
        <Svg
            width={width}
            height={height}
            viewBox="0 0 503.363 503.363"
            fill="none"
        >
            <Path
                fill={color}
                d="M131.082,486.563c-34.8,24-63.2,14.4-63.2-28v-413.6c0-42.4,28.4-52,63.2-28l278.4,191.2
	c34.8,24,34.8,63.2,0,86.8L131.082,486.563z"
            />
            <Path
                fill={border}
                d="M97.082,503.363c-5.2,0-10.4-1.2-14.8-3.6c-8.4-4.4-18.4-15.2-18.4-41.6v-413.2c0-26.4,10-37.2,18.4-41.6
	c13.2-6.8,31.2-3.2,50.8,10l278.4,191.2c18,12.4,28,28.8,28,46.8s-10,34.4-28,46.8l-278.4,191.2
	C120.282,498.963,107.882,503.363,97.082,503.363z M97.082,8.163c-4,0-7.6,0.8-10.8,2.4c-9.2,4.8-14.4,16.8-14.4,34.4v413.6
	c0,17.6,4.8,29.6,14.4,34.4c10.4,5.6,26,2,42.8-9.6l0,0l278.4-191.2c15.6-10.8,24.4-25.2,24.4-40c0-15.2-8.8-29.2-24.4-40
	l-278.4-191.2C117.082,12.163,106.282,8.163,97.082,8.163z"
            />
        </Svg>
    );
};

export default PlayOut;
