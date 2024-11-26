import React, { useCallback, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    SafeView,
    Button,
    PhoneInput,
    Text,
    Container,
    NavHeader
} from '@styles/index';

import { sendCellPhoneToken } from '@context/actions/register';
import { WHATSAPP_VALIDATION } from '@utils/validations';
import { checkConnect, deviceSize } from '@utils/index';
import { registerDispatch } from '@context/dispatches';

type RouteProps = {
    params: {
        registerId?: string;
        next?: string;
    };
};

function SignUpCellphone() {
    const navigation = useNavigation();
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const cellphoneField = React.createRef();

    const [loading, setLoading] = useState(false);
    const [cellphone, setCellphone] = useState('');
    const size = deviceSize();

    const next = useCallback(async () => {
        try {
            setLoading(true);

            const cellphoneWithJustNumbers = cellphone.replace(/[^0-9]/g, '');

            await WHATSAPP_VALIDATION.parse(cellphoneWithJustNumbers);

            registerDispatch({ CellPhone: cellphoneWithJustNumbers });

            const { registerId } = params;

            await sendCellPhoneToken(registerId, cellphoneWithJustNumbers);

            navigation.navigate('CellPhoneValidation', {
                registerId,
                next: params?.next
            });
        } catch (err) {
            err.issues
                ? Alert.alert(err.issues[0]?.message)
                : Alert.alert(err.message);
        } finally {
            setLoading(false);
        }
    }, [cellphone, navigation, params]);

    return (
        <SafeView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <Container height="100%">
                    <NavHeader title={''} />
                    <ScrollView style={{ width: '100%' }}>
                        <Container
                            align="center"
                            pad={`${
                                size === 'Small' ? '10px' : '60px'
                            } 24px 0px 24px`}
                        >
                            <Container width={'150px'} marg={'40px 0 0 0'}>
                                <Text
                                    align="center"
                                    size={24}
                                    color={'#323232'}
                                    family={'Axiforma-SemiBold'}
                                    line={36}
                                >
                                    Verifique seu número
                                </Text>
                            </Container>
                            <Text align="center" line={22}>
                                Nós enviaremos um código de 4 dígitos para o
                                celular cadastrado abaixo.
                            </Text>
                            <PhoneInput
                                testID="phone-input"
                                value={cellphone}
                                onChangeText={(cellphone) => {
                                    let value = String(cellphone).replace(
                                        /[^\d]/g,
                                        ''
                                    );

                                    if (value.length === 0) {
                                        value = '';
                                    } else if (
                                        value.length > 0 &&
                                        value.length <= 1
                                    ) {
                                        value = `(${value.slice(0, 1)}`;
                                    } else if (value.length <= 2) {
                                        value = `(${value.slice(0, 3)}`;
                                    } else if (
                                        value.length >= 3 &&
                                        value.length <= 7
                                    ) {
                                        value = `(${value.slice(
                                            0,
                                            2
                                        )}) ${value.slice(2, 7)}`;
                                    } else if (value.length >= 8) {
                                        value = `(${value.slice(
                                            0,
                                            2
                                        )}) ${value.slice(2, 7)}-${value.slice(
                                            7,
                                            11
                                        )}`;
                                    }

                                    setCellphone(value);
                                }}
                                placeholder="(99) 99999-9999"
                                ref={cellphoneField}
                                clean={() => {
                                    setCellphone('');
                                }}
                            />
                            {loading ? (
                                <Button
                                    testID="submit_button-disabled"
                                    top={0}
                                    type="disabled"
                                    text={
                                        loading
                                            ? 'Cadastrando...'
                                            : 'Carregando...'
                                    }
                                />
                            ) : (
                                <Button
                                    testID="submit_button-active"
                                    top={0}
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        next
                                    )}
                                    text="Enviar código"
                                />
                            )}
                        </Container>
                    </ScrollView>
                </Container>
            </KeyboardAvoidingView>
        </SafeView>
    );
}

export default SignUpCellphone;
