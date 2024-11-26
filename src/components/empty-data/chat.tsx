import React from 'react';

import { Container, Title } from '@styles/index';
import { Icon } from '@styles/icon';

type EmptyChatProps = {
    archived?: boolean;
};
const EmptyChat = ({ archived }: EmptyChatProps) => {
    return (
        <Container pad="30% 15% 0 15%" align="center" marg="0 10px 0">
            <Icon name="chatEmpty" />
            <Container marg="40px 0 auto 0">
                <Title line={32} weight="600" align="center" size={20}>
                    Você ainda não possui nenhuma mensagem{' '}
                    {archived ? 'arquivada' : 'enviada ou recebida.'}
                </Title>
            </Container>
        </Container>
    );
};

export default EmptyChat;
