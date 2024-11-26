import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Text, Container, Loading } from '@styles/index';

import { Icon } from '@styles/icon';

const EmptyNearProviders = ({ loading }) => {
    const navigation = useNavigation();
    const { location } = useSelector(({ location }) => ({
        location
    }));

    const onPress = useCallback(() => {
        navigation.navigate('Location', {
            next: 'Home'
        });
    }, [navigation]);

    if (location?.loading || loading) return <Loading overlay={false} />;

    return (
        <Container align="center" pad="20px 24px">
            <Icon name="sad" />
            <Container marg="20px 0">
                <Text size={18} family="Axiforma-SemiBold" align="center">
                    {location?.granted
                        ? 'Não encontramos nenhum profissional na sua região'
                        : 'Habilite sua localização ou escolha um endereço para ver os profissionais mais próximos'}
                </Text>
            </Container>

            <Container onPress={onPress} dir="row" align="center">
                <Icon name="pin" />
                <Text decoration="underline" marg="0 10px 0 5px">
                    Escolha um endereço
                </Text>
                {location?.granted && <Icon name="down" />}
            </Container>
        </Container>
    );
};

export default EmptyNearProviders;
