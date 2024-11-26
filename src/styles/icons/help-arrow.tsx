import React, { FC } from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconBase } from '../icon/';

const HelpArrow: FC<IconBase> = ({
    color = '#4e4e4e',
    height = 24,
    width = 24
}) => {
    return (
        <Svg width={width} height={height} fill="none" viewBox="0 0 24 24">
            <Path
                stroke={color}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                d="M279.7,24.736c-.326,0-.634,0-.941,0a7.881,7.881,0,0,0-3.045.593,5.04,5.04,0,0,0-2.526,2.325,6.891,6.891,0,0,0-.744,2.427c-.058.476-.076.957-.111,1.436a.26.26,0,0,0,.024.136l.136-.17a5.182,5.182,0,0,1,1.3-1.226,4.5,4.5,0,0,1,1.808-.607,20.393,20.393,0,0,1,2.638-.126c.481,0,.961,0,1.462,0v.139c0,.544,0,1.088,0,1.632a.328.328,0,0,0,.177.347.339.339,0,0,0,.381-.086l4.971-4.131c.023-.019.045-.038.067-.058a.291.291,0,0,0-.01-.485q-.674-.564-1.352-1.124-1.849-1.536-3.7-3.073a.311.311,0,0,0-.358-.074.319.319,0,0,0-.18.321q0,.829,0,1.657Z"
                transform="translate(-268.876 -18.127)"
            />
        </Svg>
    );
};

export default HelpArrow;
