import React from 'react';

import { Container, Title } from '@styles/index';
import { Icon } from '@styles/icon';

const Images = ({ open }) => {
    return (
        <Container
            width="100%"
            justify="center"
            pad="40% 0"
            align="center"
            marg="0"
        >
            <Icon name="doublePic" color="#b9b9b9" width={80} height={80} />
            <Container align="center" marg="40px 0 auto 0">
                <Title line={32} weight="600" align="center" size={20}>
                    Você não possui imagens salvas
                </Title>
                <Container
                    marg="4px 0"
                    align="center"
                    onPress={() => {
                        open();
                    }}
                >
                    <Title line={32} weight="600" align="center" size={20}>
                        Tente tirar uma foto!
                    </Title>
                    <Icon name="camera" />
                </Container>
            </Container>
        </Container>
    );
};

export default Images;
