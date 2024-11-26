import React from 'react';
import styled from 'styled-components/native';

import { Shadow } from '@styles/index';

import { Icon } from '@styles/icon';
import theme from '@styles/theme/index';

interface CircleProps {
    height?: number | string;
    width?: number | string;
    radius?: number;
    align?: string;
    justify?: string;
    ref?: any;
    testID?: string;
}

const Circle = styled.TouchableOpacity<CircleProps>`
    height: ${({ height }) =>
        typeof height === 'number' ? height + 'px' : height};
    width: ${({ width }) => (typeof width === 'number' ? width + 'px' : width)};
    border-radius: ${({ radius }) => radius}px;
    align-items: ${({ align }) => align};
    justify-content: ${({ justify }) => justify};
`;

interface CloseProps {
    height?: number | string;
    width?: number | string;
    radius?: number;
    align?: string;
    justify?: string;
    mTop?: number;
    mRight?: number;
    mLeft?: number;
    mBottom?: number;
    navigation?: () => void;
}

const Close = ({
    height,
    width,
    radius,
    align = 'center',
    justify = 'center',
    mTop = 0,
    mRight = 0,
    mLeft = 0,
    mBottom = 0,
    navigation
}: CloseProps) => {
    return (
        <Shadow
            width={width}
            mTop={mTop}
            mBottom={mBottom}
            mRight={mRight}
            mLeft={mLeft}
            radius={radius}
            background={theme.COLORS.white}
            shadow={{
                color: '#00000080',
                height: 4,
                opacity: 0.3,
                radius: 4.65,
                elevation: 8
            }}
        >
            <Circle
                testID="testClose"
                height={height}
                width={width}
                radius={radius}
                align={align}
                justify={justify}
                onPress={navigation}
                accessible={true}
                accessibilityLabel="Close button"
            >
                <Icon name="close" color="#323232" />
            </Circle>
        </Shadow>
    );
};

export default Close;
