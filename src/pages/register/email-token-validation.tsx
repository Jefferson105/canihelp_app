import React, { useState, useCallback } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { TokenValidation } from '@components/shared/token-validation';
import { useSelector, useDispatch } from '@context/index';

import { NavHeader, SafeView, Text, Container } from '@styles/index';

import { mutateApi } from '@services/mutate-api';
import { checkEmailToken } from '@context/actions/register';
import { checkConnect, deviceSize } from '@utils/index';

type RouteProps = {
    params: {
        registerId?: string;
        next?: string;
        isPassword?: boolean;
        Email?: string;
        UserId?: string;
    };
};

function EmailTokenValidation() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        info: { isConnected },
        register
    } = useSelector(({ info, register }) => ({
        info,
        register
    }));

    console.log(register);

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { registerId } = params;

    const [token, setToken] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const size = deviceSize();

    const validate = useCallback(async () => {
        try {
            setLoading(true);

            const userToken = token.join('');

            if (params?.isPassword) {
                const { success, error } = await mutateApi({
                    name: 'passwordCheckToken',
                    params: {
                        Email: params?.Email,
                        UserId: params?.UserId,
                        Token: userToken
                    }
                });

                if (!success) throw error;

                navigation.navigate('RecoveryPassword', {
                    tokenChecked: true
                });
            } else {
                await checkEmailToken({
                    Email: register.Email,
                    Token: userToken,
                    RegistrationID: registerId
                });

                navigation.navigate('SignUpCellPhone', {
                    registerId,
                    next: params?.next
                });
            }
        } catch (err) {
            console.log({ err });
            setToken(['', '', '', '']);
            Alert.alert(err.message, 'Verifique seu email e tente novamente.');
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, navigation, register, registerId, token]);

    return (
        <SafeView>
            <NavHeader
                justify="center"
                big={true}
                title={params?.isPassword ? 'Código Token' : ''}
            />
            <Container
                pad={`${size === 'Small' ? '10px' : '60px'} 24px 0px 24px`}
                align="center"
            >
                <ScrollView style={{ width: '100%' }}>
                    {!params?.isPassword && (
                        <Container align="center">
                            <Container
                                align="center"
                                width={params?.isPassword ? '100%' : '140px'}
                                marg={`${
                                    size === 'Small' ? '0px' : '40px'
                                } 0px 0px 0px`}
                            >
                                <Text
                                    align="center"
                                    size={24}
                                    color={'#323232'}
                                    family={'Axiforma-SemiBold'}
                                >
                                    Verifique seu e-mail
                                </Text>
                            </Container>
                        </Container>
                    )}

                    <Text align="center" line={22} marg="33px 0 38px 0">
                        {params?.isPassword
                            ? 'Insira o codigo de 4 dígitos recebido em seu e-mail de cadastro'
                            : ' Insira o código de 4 dígitos recebido'}
                    </Text>

                    <TokenValidation
                        registerId={registerId}
                        email={register?.Email}
                        token={token}
                        setToken={setToken}
                        type="email"
                        validate={checkConnect.bind({}, isConnected, validate)}
                        loading={loading}
                    />
                </ScrollView>
            </Container>
        </SafeView>
    );
}

export default EmailTokenValidation;
