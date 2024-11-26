import React from 'react';
import { Dimensions } from 'react-native';

import { Text, Container, Avatar, Title } from '@styles/index';

const { width } = Dimensions.get('screen');

const EmptyProposals = () => {
    return (
        <Container width={width - 40 + 'px'} align="center">
            <Container
                width="46px"
                height="46px"
                border="solid #e5e5e5"
                radius={40}
                justify="center"
                align="center"
            >
                <Avatar
                    isProposal={true}
                    photo={require('../../assets/logo/logo-singUp.png')}
                />
            </Container>
            <Title marg="12px 0 3px 0" size={15}>
                Solicitação enviada
            </Title>
            <Text align="center" size={14}>
                A qualquer momento os profissionais
            </Text>
            <Text marg="-5px 0 0 0" align="center" size={14}>
                começarão a responder a sua solicitação
            </Text>
        </Container>
    );
};

export default EmptyProposals;
