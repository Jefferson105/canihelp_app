import React from 'react';

import { Container, Title } from '@styles/index';
import { Icon } from '@styles/icon';

type EmptyHelpProps = {
    isOpen?: boolean;
    archived?: boolean;
};

const EmptyHelp = ({ isOpen, archived }: EmptyHelpProps) => {
    return (
        <Container
            width="100%"
            justify="center"
            pad="40% 0"
            align="center"
            marg="0"
        >
            <Container
                align="center"
                justify="center"
                color="#e8e8e8"
                width="48px"
                height="48px"
                radius={48}
            >
                <Icon name="helpTab" color="#b9b9b9" width={28} height={28} />
            </Container>
            <Container marg="20px 0 auto 0">
                <Title line={32} weight="600" align="center" size={20}>
                    Você ainda não possui nenhum
                    {isOpen
                        ? ' negócio em aberto'
                        : archived
                          ? ' negócio arquivado'
                          : ' negócio fechado'}
                    .
                </Title>
            </Container>
        </Container>
    );
};

export default EmptyHelp;
