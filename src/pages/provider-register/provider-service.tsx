import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import ProRegisterBase from '@components/provider-register/base';

import { Container, Button, Text, Title, Input } from '@styles/index';
import { Icon } from '@styles/icon';

type RouteProps = {
    params: {
        edit: boolean;
    };
};

const ProviderService = () => {
    const navigation = useNavigation();

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const [search, setSearch] = useState('');

    const onSubmit = () => {
        if (search.length > 1)
            navigation.navigate('CategorieResult', {
                search,
                edit: !!params?.edit
            });
        else Alert.alert('Digite mais caracteres');
    };

    return (
        <ProRegisterBase percent={18}>
            <ScrollView style={{ width: '100%' }}>
                <Container marg="0 0 10px 0">
                    <Title align="left">Oferecer Serviços</Title>
                    <Text marg="8px 0">
                        Digite o serviço que você deseja oferecer e clique em
                        avançar.
                    </Text>

                    <Container
                        dir="row"
                        radius={5}
                        pad="0 10px"
                        align="center"
                        color="#fff"
                        marg="20px 0"
                        border="1px solid #efefef"
                        height="52px"
                        width="100%"
                    >
                        <Icon name="loupe" />
                        <Input
                            testID="service-input"
                            onChangeText={(txt) => setSearch(String(txt))}
                            placeholder="Qual serviço você quer oferecer?"
                            mBottom={false}
                            border={false}
                            shadow={false}
                            width={null}
                        />
                    </Container>
                </Container>
                <Container>
                    <Text weight="bold">Atenção</Text>
                    <Text>
                        O Canihelp é um{' '}
                        <Text decoration="underline">Shopping</Text> exclusivo
                        para venda de{' '}
                        <Text decoration="underline">Serviços</Text>. Produtos
                        não são válidos.
                    </Text>
                </Container>
                <Container width="100%" marg="20px 0">
                    <Button
                        onPress={onSubmit}
                        disabled={search.length < 2}
                        text="Avançar"
                    />
                </Container>
            </ScrollView>
        </ProRegisterBase>
    );
};

export default ProviderService;
