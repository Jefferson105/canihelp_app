import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';

import { useSelector } from '@context/index';

import {
    NavHeader,
    SafeView,
    Container,
    Password,
    Text,
    Button
} from '@styles/index';

import { updateUser } from '@context/actions/user';
import { checkConnect } from '@utils/index';

const ChangePassword = () => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const [newPassword, setNewPassword] = useState('');
    const [rptPassword, setRptPassword] = useState('');
    const [changeSuccess, setChangeSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const submitChangePassword = async () => {
        try {
            setLoading(true);
            if (!newPassword || !rptPassword) {
                Alert.alert('Campos de senha não preenchidos');
                return;
            } else if (newPassword !== rptPassword) {
                Alert.alert('As senhas informadas são diferentes.');
                return;
            }

            const result = await updateUser({ Password: newPassword }, false);

            if (result) {
                setChangeSuccess(true);
            }
        } catch (err) {
            console.log('@change-password, err = ', err);
            Alert.alert('' + err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeView>
            <NavHeader title="" />
            <Container
                height="100%"
                width="100%"
                pad={'10px 20px 0px 20px'}
                align="center"
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={{ flex: 1 }}
                >
                    <ScrollView testID="scrollView">
                        {!changeSuccess ? (
                            <>
                                <Text marg="20px auto" align="center">
                                    Digite sua nova senha, confirme e clique em
                                    redefinir senha.
                                </Text>
                                <Password
                                    testID="teste-new"
                                    onChangeText={(text) =>
                                        setNewPassword(text)
                                    }
                                    label="Nova senha"
                                />
                                <Password
                                    testID="teste-repeat"
                                    onChangeText={(text) =>
                                        setRptPassword(text)
                                    }
                                    label="Confirmar nova senha"
                                />
                                <Container>
                                    <Button
                                        testID="teste-button"
                                        type={loading ? 'disabled' : 'default'}
                                        top={20}
                                        text={
                                            loading
                                                ? 'Redefinindo senha'
                                                : 'Redefinir senha'
                                        }
                                        onPress={checkConnect.bind(
                                            {},
                                            isConnected,
                                            submitChangePassword
                                        )}
                                    />
                                </Container>
                            </>
                        ) : (
                            <Text marg="20px auto" align="center">
                                Senha alterada com sucesso
                            </Text>
                        )}
                    </ScrollView>
                </KeyboardAvoidingView>
            </Container>
        </SafeView>
    );
};

export default ChangePassword;
