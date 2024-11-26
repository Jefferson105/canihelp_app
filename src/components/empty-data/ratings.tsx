import React from 'react';

import { Container, Title } from '@styles/index';
import { Icon } from '@styles/icon';

const EmptyRatings = ({ isMe }) => {
    return (
        <Container pad="30% 15% 0 15%" align="center" marg="0 10px 0">
            <Icon name="starEmpty" />
            <Container marg="40px 0 auto 0">
                <Title line={32} weight="600" align="center" size={20}>
                    {isMe ? 'Você' : 'O usuário'} ainda não possui avaliações.
                </Title>
            </Container>
        </Container>
    );
};

export default EmptyRatings;
