import React from 'react';
import styled from 'styled-components/native';

import { Text } from '@styles/index';
import { mainColor } from '@styles/colors';

const Container = styled.View`
    background-color: ${mainColor};
    padding: 0 0 5px 0;
    align-items: center;
    justify-content: center;
`;

interface OfflineProps {
    server: boolean;
}

const Offline = ({ server }: OfflineProps) => {
    return (
        <Container>
            <Text color="#fff">
                Sem conexão com {server ? 'o servidor' : 'a Internet'}
            </Text>
        </Container>
    );
};

export default Offline;
