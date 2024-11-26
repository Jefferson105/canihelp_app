import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { useSelector } from '@context/index';

import { Container, Title, Text } from '@styles/index';
import { Icon } from '@styles/icon';

const { width } = Dimensions.get('screen');

const EmptySocial = () => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        posts
    } = useSelector(({ info, posts }) => ({
        info,
        posts
    }));

    return (
        <Container
            align="center"
            justify="center"
            marg="0 0 0 20px"
            width={width - 40 + 'px'}
        >
            <Icon name="searchEmpty" />
            <Container align="center" width="100%" marg="30px 0 auto 0">
                {isConnected ? (
                    <>
                        <Title line={32} weight="600" size={20}>
                            {!posts?.location && 'Configure uma região'}
                            {posts?.location &&
                                !posts?.category &&
                                'Não encontramos posts na região configurada'}
                            {posts?.location &&
                                posts?.category &&
                                'Não encontramos posts com a categoria configurada'}
                        </Title>
                        <Text pad="10px 0">
                            {!posts?.location &&
                                'Escolha uma localização e interaja!'}
                            {posts?.location &&
                                !posts?.category &&
                                'Seja o primeiro a postar, ou altere a região.'}
                            {posts?.location &&
                                posts?.category &&
                                'Altere a categoria ou localização para encontrar posts'}
                        </Text>
                    </>
                ) : (
                    <>
                        <Title line={32} weight="600" size={20}>
                            Sem conexão com a Internet
                        </Title>
                        <Text pad="10px 0">Verifique sua conexão.</Text>
                    </>
                )}
            </Container>
            {!!isConnected && (
                <Container
                    onPress={() =>
                        navigation.navigate('Location', {
                            next: 'Social'
                        })
                    }
                    dir="row"
                    pad="11px 0"
                    align="center"
                >
                    <Container pad="4px 10px 0px 0px">
                        <Icon name="pin" />
                    </Container>
                    <Text testID="searchLocation">
                        {'Pesquisar sua localização'}
                    </Text>
                    <Container pad="4px 0px 0px 10px">
                        <Icon name="down" />
                    </Container>
                </Container>
            )}
        </Container>
    );
};

export default EmptySocial;
