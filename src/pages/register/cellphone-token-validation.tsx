import React, { useState } from 'react';
import { Alert, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { TokenValidation } from '@components/shared/token-validation';
import { useSelector } from '@context/index';

import { NavHeader, SafeView, Text, Container } from '@styles/index';

import {
    checkCellPhoneTokenAndFinishRegister,
    navigateAfterAction
} from '@context/actions/register';
import { checkConnect, deviceSize } from '@utils/index';

type RouteProps = {
    params: {
        registerId?: string;
        next: string;
    };
};

const CellPhoneValidation = () => {
    const navigation = useNavigation();
    const {
        register,
        info: { isConnected }
    } = useSelector(({ register, info, profile }) => ({
        register,
        info,

        profile
    }));

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const { registerId } = params;

    const [token, setToken] = useState<string[]>(['', '', '', '']);
    const [loading, setLoading] = useState(false);

    const size = deviceSize();

    const validate = async () => {
        try {
            setLoading(true);

            const userToken = token.join('');
            console.log('User token', userToken);

            await checkCellPhoneTokenAndFinishRegister({
                Token: userToken,
                CellPhone: register.CellPhone,
                UserData: register,
                RegistrationID: registerId
            });

            if (params?.next) {
                const navigationAction = await navigateAfterAction({
                    currentParams: params
                });
                navigation.navigate(
                    navigationAction.route,
                    navigationAction.params
                );
            }
        } catch (err) {
            console.log(err);
            setToken(['', '', '', '']);
            setLoading(false);
            Alert.alert(
                err.message,
                'Verifique o SMS enviado e tente novamente'
            );
        }
    };

    return (
        <SafeView>
            <NavHeader title={''} />
            <Container
                pad={`${size === 'Small' ? '10px' : '60px'} 24px 0 24px`}
                align="center"
            >
                <ScrollView style={{ width: '100%' }}>
                    <Container align="center">
                        <Container
                            width={'160px'}
                            marg={'10px 0 0 0'}
                            align="center"
                        >
                            <Text
                                align="center"
                                size={24}
                                color={'#323232'}
                                family={'Axiforma-SemiBold'}
                            >
                                Verifique
                            </Text>
                            <Text
                                align="center"
                                size={24}
                                color={'#323232'}
                                family={'Axiforma-SemiBold'}
                            >
                                seu número
                            </Text>
                        </Container>
                    </Container>
                    <Text align="center" line={22} marg="33px 0px 38px 0px">
                        Insira o código de 4 dígitos recebido:
                    </Text>
                    <TokenValidation
                        registerId={registerId}
                        cellphone={register?.CellPhone}
                        token={token}
                        setToken={setToken}
                        type="cellphone"
                        validate={checkConnect.bind({}, isConnected, validate)}
                        loading={loading}
                    />
                </ScrollView>
            </Container>
        </SafeView>
    );
};

export default CellPhoneValidation;
