import React, { useState, useRef, useEffect } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    NavHeader,
    SafeView,
    Button,
    Input,
    Text,
    Container,
    Password
} from '@styles/index';

import { checkConnect } from '@utils/index';
import { mutateApi } from '@services/mutate-api';
import { checkPassword, isMail } from '@utils/validations';

type RouteProps = {
    params: {
        tokenChecked?: true;
    };
};

const RecoveryPassword = () => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
    const [password, setPassword] = useState('');
    const [confPass, setconfPass] = useState('');
    const [alertError, setAlertError] = useState('');

    const submit = async () => {
        if (checkPassword(password) && params?.tokenChecked) return;

        try {
            setLoading(true);
            const valueIsMail = isMail(value);

            if (params?.tokenChecked) {
                if (password !== confPass)
                    throw 'As senhas inseridas sao diferentes';
                const { success, error } = await mutateApi({
                    name: 'passwordChange',
                    params: {
                        UserId: valueIsMail ? null : value,
                        Email: valueIsMail ? value : null,
                        Password: password
                    }
                });

                if (!success) throw error;

                navigation.navigate('Login');
            } else {
                const { success, error } = await mutateApi({
                    name: 'passwordSendToken',
                    params: {
                        UserId: valueIsMail ? null : value,
                        Email: valueIsMail ? value : null
                    }
                });

                if (!success) throw error;

                navigation.navigate('EmailTokenValidation', {
                    registerId: null,
                    isPassword: true,
                    UserId: valueIsMail ? null : value,
                    Email: valueIsMail ? value : null
                });
            }
        } catch (err) {
            Alert.alert(
                typeof err === 'string'
                    ? err
                    : 'Erro ao recuperar a senha. Verifique os dados.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (password.length < 1 && !alertError) return;
        if (password.length < 1) return setAlertError('');

        const errorMessage = checkPassword(password);

        setAlertError(errorMessage ? 'password:' + errorMessage : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    const scroll = useRef(null);
    return (
        <SafeView>
            <NavHeader
                big={true}
                justify="center"
                title={
                    params?.tokenChecked ? 'Nova senha' : `Redefinir sua senha`
                }
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1, width: '100%' }}
            >
                <ScrollView ref={scroll} keyboardShouldPersistTaps="handled">
                    <Container
                        justify="center"
                        pad={'0px 24px 0px 24px'}
                        align={!params?.tokenChecked && 'center'}
                    >
                        <Text
                            align={!params?.tokenChecked && 'center'}
                            line={22}
                            marg="28px 0 40px 0"
                        >
                            {params?.tokenChecked
                                ? 'Crie uma nova senha, confirme e clique em redefinir senha.'
                                : ' Para confirmar a alteração de sua senha, nós enviaremos um código de 4 dígitos para o e-mail cadastrado abaixo.'}
                        </Text>
                        {params?.tokenChecked ? (
                            <>
                                <Password
                                    onChangeText={(text) => setPassword(text)}
                                    label="Nova senha"
                                    error={alertError}
                                />
                                <Password
                                    onChangeText={(text) => setconfPass(text)}
                                    label="Confirmar nova senha"
                                />
                            </>
                        ) : (
                            <Input
                                onFocus={() => {
                                    scroll.current.scrollTo({
                                        y: 170,
                                        animated: true
                                    });
                                }}
                                label="E-mail/Usuário"
                                value={value}
                                onChangeText={(v) => setValue(String(v))}
                                returnKeyType="done"
                                placeholder="e-mail cadastrado"
                                placeholderTextColor="#4e4e4e8f"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                type={'email'}
                                textContentType="none"
                            />
                        )}

                        <Button
                            top={14}
                            onPress={checkConnect.bind({}, isConnected, submit)}
                            text={loading ? 'Enviando' : 'Redefinir senha'}
                            type={loading ? 'disabled' : 'default'}
                            disabled={loading}
                        />
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default RecoveryPassword;
