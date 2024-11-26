import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { useSelector } from '@context/index';

import { Text, Button, Container } from '@styles/index';

import { createHelpDispatch } from '@context/dispatches';
import { Icon } from '@styles/icon';

const EmptyProfessional = () => {
    const navigation = useNavigation();

    const {
        user,
        search: { location, category }
    } = useSelector(({ user, search }) => ({ user, search }));

    const onShare = async () => {
        try {
            if (!user)
                return navigation.navigate('SignUp', {
                    next: 'SearchResult'
                });

            createHelpDispatch({
                Description: '',
                Urgency: null,
                location,
                category
            });

            navigation.navigate('CreatePost', {
                type: 'help',
                search: true
            });
        } catch (error) {
            Alert.alert('Erro ao compartilhar');
        }
    };

    return (
        <Container align="center" pad="45px 0 0 0">
            <Icon name="sad" />
            <Container marg="30px 0 28px 0">
                <Text size={18} family="Axiforma-SemiBold" align="center">
                    No momento não encontramos nenhum profissional na região
                    solicitada.
                </Text>
            </Container>

            <Text align="center">
                Sua solicitação poderá ser compartilhada no feed, para que
                usuários da comunidade local possam colaborar com a sua procura.
            </Text>
            <Button top={25} onPress={onShare} text={'Ok! Avançar'} />
        </Container>
    );
};

export default EmptyProfessional;
