import React, { useState, useRef, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    SafeView,
    Button,
    Container as Line,
    NavHeader,
    Text,
    Input,
    Password,
    Small
} from '@styles/index';

import { login } from '@context/actions/info';
import { checkConnect } from '@utils/index';
import { navigateAfterAction } from '@context/actions/register';

interface NavigationInfoType {
    route?: string;
    params?: any;
}

type RouteProps = {
    params: {
        registerId?: string;
        next: string;
    };
};

const Login = () => {
    const navigation = useNavigation();
    const passwordField = useRef(null);
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [state, setState] = useState({
        email: '',
        password: '',
        securePass: true,
        focusEmailInput: false,
        focusPwdInput: false
    });

    const [alertError, setAlertError] = useState('');
    const [loading, setLoading] = useState(false);
    const scroll = useRef(null);

    const submitLogin = useCallback(
        async function () {
            if (state.email.length === 0) {
                setAlertError('email:E-mail ou usuário obrigatória');
                return;
            } else if (state.password.length === 0) {
                setAlertError('password:Senha obrigatória');
                return;
            } else if (state.password.length < 6) {
                setAlertError('password:Senha muito curta');
                return;
            }

            setLoading(true);
            try {
                await login(state.email, state.password);
                if (params?.next) {
                    const navigationInfo: NavigationInfoType =
                        await navigateAfterAction({
                            currentParams: params
                        });
                    navigation.navigate(
                        navigationInfo.route as any,
                        navigationInfo.params as any
                    );
                }
            } catch (err) {
                setLoading(false);
                typeof err === 'string' && err.includes(':')
                    ? setAlertError(err)
                    : null;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [state.email, state.password, params]
    );

    return (
        <SafeView>
            <NavHeader justify="center" big={true} title="Faça seu login" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView ref={scroll} keyboardShouldPersistTaps="handled">
                    <Line align="center" pad="4px 20px 0 20px">
                        <Input
                            maxLength={200}
                            testID="login-input"
                            onFocus={() => {
                                scroll.current.scrollTo({
                                    y: 170,
                                    animated: true
                                });
                            }}
                            label="E-mail ou usuário"
                            value={state.email}
                            onChangeText={(email: string) => {
                                setState({
                                    ...state,
                                    email: email?.toLowerCase()
                                });
                            }}
                            returnKeyType="next"
                            placeholder="digite e-mail ou usuário cadastrado"
                            secureTextEntry={false}
                            keyboardType={
                                Platform.OS === 'ios'
                                    ? 'email-address'
                                    : 'visible-password'
                            }
                            onSubmitEditing={() =>
                                passwordField?.current?.focus()
                            }
                            top={28}
                            error={alertError}
                            type={'email'}
                            placeholderTextColor="#6e6e6e"
                            textContentType="username"
                            autoCorrect={false}
                            autoCapitalize="none"
                        />
                        <Password
                            testID="password-input"
                            focusOn={() => {
                                scroll.current.scrollTo({
                                    y: 170,
                                    animated: true
                                });
                            }}
                            label="Senha"
                            onChangeText={(password) =>
                                setState({ ...state, password })
                            }
                            onPress={() =>
                                navigation.navigate('RecoveryPassword')
                            }
                            forgot={true}
                            ref={passwordField}
                            error={alertError}
                        />
                        <Button
                            testID="submit-button"
                            onPress={() =>
                                checkConnect(isConnected, submitLogin)
                            }
                            text={loading ? 'Acessando' : 'Acessar'}
                            type={loading ? 'disabled' : 'default'}
                        />

                        <Line
                            onPress={() =>
                                navigation.navigate('SignUp', {
                                    next: params?.next
                                })
                            }
                            dir="row"
                            pad="15px 0"
                            justify="center"
                            testID="register-link"
                        >
                            <Text size={14}>
                                Nao tem uma conta?{' '}
                                <Text size={14} decoration={'underline'}>
                                    Faça o seu cadastro
                                </Text>
                            </Text>
                        </Line>
                        <Line
                            onPress={() => navigation.navigate('Privacy')}
                            dir="row"
                            justify="center"
                            pad="0 0 15px 0"
                        >
                            <Small size={12} line={17} align="center">
                                Ao continuar você concorda com os{' '}
                                <Small
                                    decoration="underline"
                                    color="#FF6F5C"
                                    size={12}
                                    line={17}
                                >
                                    Termos de uso e política de privacidade
                                </Small>{' '}
                                do Canihelp.
                            </Small>
                        </Line>
                    </Line>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default Login;
