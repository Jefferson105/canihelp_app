import React from 'react';
import { Dimensions } from 'react-native';

import { Container, Float, Circle } from '@styles/index';

const { width } = Dimensions.get('screen');

interface PaginationProps {
    ammount: number;
    selectedIndex: number;
    dotsColor?: string;
    justify?: string;
    top?: string;
    right?: string;
    bottom?: string;
    left?: string;
    activeIndexColor?: string | undefined;
    center?: boolean;
}

const Pagination = ({
    ammount,
    selectedIndex,
    dotsColor = '#00000033',
    activeIndexColor = undefined,
    justify = 'center',
    left,
    bottom,
    right,
    top,
    center = false
}: PaginationProps) => {
    return (
        <Float
            width={width + 'px'}
            right={right}
            bottom={bottom}
            top={top}
            left={left}
            align={center && 'center'}
        >
            <Container dir="row" align="center" justify={justify}>
                {[...Array(ammount)].map((_, i) => (
                    <Circle
                        width={selectedIndex === i ? 21 : 6}
                        height={6}
                        radius={15}
                        key={i}
                        marg="0 3px"
                        bg={selectedIndex === i ? activeIndexColor : dotsColor}
                    />
                ))}
            </Container>
        </Float>
    );
};

export default Pagination;
