import React from 'react';
import styled, { css } from 'styled-components/native';
import { ActivityIndicator } from 'react-native';
import theme from '@styles/theme/index';

const getStyle = (overlay: boolean) => {
    if (overlay) {
        return css`
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: ${theme.COLORS.grey};
        `;
    } else {
        return css`
            width: 100%;
        `;
    }
};

interface ContainerProps {
    overlay: boolean;
}

const Container = styled.View<ContainerProps>`
    align-items: center;
    justify-content: center;
    ${({ overlay }) => getStyle(overlay)};
`;

const Loading = ({ overlay = true }) => {
    return (
        <Container overlay={overlay}>
            <ActivityIndicator
                animating={true}
                size="large"
                color={theme.COLORS.mainColor}
            />
        </Container>
    );
};

export default Loading;
