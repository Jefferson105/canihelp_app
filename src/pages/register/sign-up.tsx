import React, {
    useReducer,
    useCallback,
    useRef,
    useState,
    useEffect
} from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    SafeView,
    Button,
    Input,
    NavHeader,
    Container,
    Password,
    Small
} from '@styles/index';

import {
    checkPassword,
    EMAIL_VALIDATION,
    NAME_AND_LASTNAME_VALIDATION,
    PASSWORD_VALIDATION
} from '@utils/validations';
import {
    checkUsername,
    checkEmail,
    sendEmailToken
} from '@context/actions/register';
import { checkConnect } from '@utils/index';
import { registerDispatch } from '@context/dispatches';

const reducer = (state, { data }) => {
    return {
        ...state,
        ...data
    };
};

type RouteProps = {
    params: {
        next?: string;
    };
};

const SignUp = () => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const [alertError, setAlertError] = useState('');
    const [loading, setLoading] = useState(false);

    const passwordField = useRef(null);
    const emailField = useRef(null);
    const scroll = useRef(null);

    const [state, dispatchS] = useReducer(reducer, {
        name: '',
        user: '',
        email: '',
        cellphone: '',
        password: '',
        loading: false
    });

    const { name, email, password } = state;

    const next = useCallback(async () => {
        if (checkPassword(password)) return;
        setLoading(true);
        try {
            dispatchS({ data: { loading: true } });

            await NAME_AND_LASTNAME_VALIDATION.parse(name);
            await EMAIL_VALIDATION.parse(email);
            await PASSWORD_VALIDATION.parse(password);

            let user = email.split('@')[0];
            dispatchS({ data: { user } });

            const [validE, validU] = await Promise.all([
                checkEmail(email),
                checkUsername(user)
            ]);

            if (!validE) {
                setAlertError('email:Email em uso ou inválido');
                dispatchS({ data: { loading: false } });
                return;
            }

            if (!validU) {
                user += Math.random().toString(36).substr(2, 5);

                await checkUsername(user);

                dispatchS({ data: { user } });
            }

            dispatchS({ data: { loading: false } });

            const registerId = await sendEmailToken(email);

            registerDispatch({
                Name: name,
                Email: email,
                Password: password,
                UserName: user
            });

            navigation.navigate('EmailTokenValidation', {
                registerId: String(registerId),
                next: params?.next
            });
        } catch (err) {
            console.log(err);
            setAlertError(err.issues[0].message || err.message);
            dispatchS({ data: { loading: false } });
        } finally {
            dispatchS({ data: { loading: false } });
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [email, name, password]);

    useEffect(() => {
        if (password.length < 1 && !alertError) return;
        if (password.length < 1) return setAlertError('');

        const errorMessage = checkPassword(password);

        setAlertError(errorMessage ? 'password:' + errorMessage : '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [password]);

    return (
        <SafeView>
            <NavHeader justify="center" big={true} title="Crie sua conta" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView ref={scroll} keyboardShouldPersistTaps="handled">
                    <Container align="center" pad="4px 20px 0 20px">
                        <Input
                            maxLength={50}
                            testID="register_name-input"
                            onFocus={() => {
                                scroll.current.scrollTo({
                                    y: 120,
                                    animated: true
                                });
                            }}
                            label="Nome"
                            value={state.name}
                            onChangeText={(name) =>
                                dispatchS({ data: { name } })
                            }
                            returnKeyType="next"
                            placeholder="digite seu nome ou empresa"
                            placeholderTextColor="#4e4e4e8f"
                            onSubmitEditing={() => emailField?.current?.focus()}
                            top={28}
                            error={alertError}
                            type={'name'}
                            textContentType="none"
                        />
                        <Input
                            maxLength={100}
                            testID="register_email-input"
                            onFocus={() => {
                                scroll.current.scrollTo({
                                    y: 160,
                                    animated: true
                                });
                            }}
                            autoComplete="off"
                            label="E-mail"
                            value={state.email}
                            ref={emailField}
                            onChangeText={(email) =>
                                dispatchS({
                                    data: {
                                        email: email?.toString()?.toLowerCase()
                                    }
                                })
                            }
                            returnKeyType="next"
                            placeholder="digite seu e-mail"
                            placeholderTextColor="#4e4e4e8f"
                            keyboardType={
                                Platform.OS === 'ios'
                                    ? 'email-address'
                                    : 'visible-password'
                            }
                            autoCapitalize="none"
                            onSubmitEditing={() =>
                                passwordField?.current?.focus()
                            }
                            error={alertError}
                            type={'email'}
                            textContentType="none"
                        />

                        <Password
                            maxLength={50}
                            testID="register_password-input"
                            focusOn={() => {
                                scroll.current?.scrollToEnd({
                                    animated: true
                                });
                            }}
                            value={state.password}
                            onChangeText={(password) =>
                                dispatchS({ data: { password } })
                            }
                            ref={passwordField}
                            label="Senha"
                            error={alertError}
                            textContentType="none"
                            autoComplete="off"
                        />

                        {loading || state.loading ? (
                            <Button
                                top={14}
                                testID="register_button-disabled"
                                type="disabled"
                                text={
                                    loading ? 'Validando...' : 'Carregando...'
                                }
                            />
                        ) : (
                            <Button
                                top={14}
                                testID="register_button-active"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    next
                                )}
                                text="Cadastrar"
                            />
                        )}
                        <Container
                            testID="login-link"
                            onPress={() =>
                                navigation.navigate('Login', {
                                    next: params?.next
                                })
                            }
                            dir="row"
                            marg="15px 0"
                            justify="center"
                        >
                            <Small size={14} line={22}>
                                Já tem uma conta?{' '}
                                <Small
                                    size={14}
                                    line={22}
                                    decoration={'underline'}
                                >
                                    Faça o login
                                </Small>
                            </Small>
                        </Container>
                        <Container
                            onPress={() => navigation.navigate('Privacy')}
                            dir="row"
                            justify="center"
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
                        </Container>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default SignUp;
