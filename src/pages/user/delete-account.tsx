import React, { useState, useCallback, useEffect } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TokenValidation } from '@components/shared/token-validation';
import { useSelector } from '@context/index';

import { NavHeader, SafeView, Text, Container } from '@styles/index';

import { logout } from '@context/actions/info';
import { checkConnect, deviceSize } from '@utils/index';
import { mutateApi } from '@services/mutate-api';

function DeleteTokenValidation() {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        register
    } = useSelector(({ info, register }) => ({
        info,
        register
    }));

    const [token, setToken] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const size = deviceSize();

    const validate = useCallback(async () => {
        try {
            setLoading(true);

            const userToken = token.join('');

            const { success, error } = await mutateApi({
                name: 'userCheckTokenDelete',
                params: {
                    Token: userToken
                }
            });

            if (!success) throw error;

            await logout();
        } catch (err) {
            console.log({ err });
            setToken(['', '', '', '']);
            Alert.alert(err.message, 'Verifique seu email e tente novamente.');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation, register, token]);

    useEffect(() => {
        (async () => {
            try {
                await mutateApi({
                    name: 'userSendTokenDelete'
                });
            } catch {
                Alert.alert('Erro ao enviar o token');
                navigation.goBack();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SafeView>
            <NavHeader justify="center" big={true} title={'Código Token'} />
            <Container
                pad={`${size === 'Small' ? '10px' : '60px'} 24px 0px 24px`}
                align="center"
            >
                <ScrollView style={{ width: '100%' }}>
                    <Container align="center">
                        <Container
                            width="160px"
                            marg="10px 0 0 0"
                            align="center"
                        >
                            <Text
                                align="center"
                                size={24}
                                color="#323232"
                                family="Axiforma-SemiBold"
                            >
                                Verifique
                            </Text>
                            <Text
                                align="center"
                                size={24}
                                color="#323232"
                                family="Axiforma-SemiBold"
                            >
                                seu número
                            </Text>
                        </Container>
                    </Container>

                    <Text align="center" line={22} marg="33px 0 38px 0">
                        Insira o código de 4 dígitos recebido via SMS para
                        deletar sua conta:
                    </Text>

                    <TokenValidation
                        token={token}
                        setToken={setToken}
                        type="delete-account"
                        validate={checkConnect.bind({}, isConnected, validate)}
                        loading={loading}
                    />
                </ScrollView>
            </Container>
        </SafeView>
    );
}

export default DeleteTokenValidation;
