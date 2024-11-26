import React from 'react';
import { Dimensions } from 'react-native';

import { Container, Title } from '@styles/index';

import { Icon } from '@styles/icon';

const { width } = Dimensions.get('screen');

const EmptyNotification = () => {
    return (
        <Container
            width={width + 'px'}
            pad="30% 0 0 0"
            justify="center"
            align="center"
        >
            <Icon name="notificationEmpty" />
            <Title
                marg="30px 0 0 0"
                line={32}
                weight="600"
                align="center"
                size={20}
            >
                Você ainda não tem nenhuma notificação.
            </Title>
        </Container>
    );
};

export default EmptyNotification;
