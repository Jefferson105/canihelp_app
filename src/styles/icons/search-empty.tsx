import React, { FC } from 'react';
import Svg, { Line, Defs, Circle, G, Rect } from 'react-native-svg';
import { number } from 'prop-types';
import { IconBase } from '../icon/';

const SearchEmpty: FC<IconBase> = ({ height = 48, width = 48 }) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 48 48">
            <Defs />
            <G transform="translate(-164 -268)">
                <G transform="translate(-133 -419)">
                    <G transform="translate(0 -1)">
                        <Circle
                            fill="#e8e8e8"
                            cx="24"
                            cy="24"
                            r="24"
                            transform="translate(297 688)"
                        />
                    </G>
                </G>
                <G transform="translate(-539.595 -1060.136)">
                    <Rect
                        width="17"
                        height="17"
                        transform="translate(722.595 1343.136)"
                    />
                    <G transform="translate(729.241 1349.783)">
                        <Line
                            x1="3.478"
                            y2="3.478"
                            transform="translate(0 0)"
                        />
                        <Line
                            x1="3.478"
                            y1="3.478"
                            transform="translate(0 0)"
                        />
                    </G>
                </G>
                <G transform="translate(-211.189 -1679.731)">
                    <Rect
                        width="24"
                        height="24"
                        transform="translate(387.189 1959.731)"
                    />
                    <Circle
                        stroke="#b9b9b9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        cx="5.379"
                        cy="5.379"
                        r="5.379"
                        transform="translate(397.189 1965.731)"
                    />
                    <Line
                        stroke="#b9b9b9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        x1="2.817"
                        y1="2.817"
                        transform="translate(406.372 1974.914)"
                    />
                    <Line
                        stroke="#b9b9b9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        x2="5"
                        transform="translate(390.189 1966.731)"
                    />
                    <Line
                        stroke="#b9b9b9"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1.5px"
                        x2="3"
                        transform="translate(390.189 1971.731)"
                    />
                    <Line x2="5" transform="translate(390.189 1976.731)" />
                </G>
            </G>
        </Svg>
    );
};

SearchEmpty.propTypes = {
    width: number,
    height: number
};

export default SearchEmpty;
