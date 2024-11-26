import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled, { css } from 'styled-components/native';

import useKeyboard from '@hooks/keyboad-height';

const { height } = Dimensions.get('window');

const getStyle = ({ realHeight, keyboardHeight }) => {
    if (keyboardHeight > 0) {
        return css`
            height: ${realHeight - keyboardHeight}px;
        `;
    } else {
        return css`
            flex: 1;
        `;
    }
};

const Container = styled.View`
    justify-content: space-between;
    ${(props) => getStyle(props)};
`;

const KeyboardView = ({ children }) => {
    const [realHeight, setHeight] = useState(height);
    const keyboardHeight = useKeyboard();

    return (
        <Container
            realHeight={realHeight}
            keyboardHeight={keyboardHeight}
            onLayout={(e) => {
                const evHeight = e.nativeEvent.layout.height;
                if (realHeight === height) {
                    setHeight(evHeight);
                }
            }}
        >
            {children}
        </Container>
    );
};

export default KeyboardView;
