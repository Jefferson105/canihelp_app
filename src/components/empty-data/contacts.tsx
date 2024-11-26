import React, { useCallback } from 'react';

import { Container, Title } from '@styles/index';
import { Icon } from '@styles/icon';

type EmptyContactsProps = {
    blocks?: boolean;
    showing?: string;
};
const EmptyContacts = ({ blocks, showing }: EmptyContactsProps) => {
    const handleMessage = useCallback(() => {
        if (showing === 'followers') {
            return 'tem seguidores';
        } else if (showing === 'following') {
            return 'segue ninguém';
        } else {
            return 'tem nenhum contato';
        }
    }, [showing]);

    const message = handleMessage();
    return (
        <Container
            width="100%"
            justify="center"
            pad="30% 0"
            align="center"
            marg="0 0px 0"
        >
            <Icon name="contactsEmpty" />
            <Container marg="40px 0 auto 0">
                <Title line={32} weight="600" align="center" size={20}>
                    Você ainda não {message}
                    {blocks && ' bloqueado'}.
                </Title>
            </Container>
        </Container>
    );
};

export default EmptyContacts;
