import React, { useEffect, useReducer, useState } from 'react';
import {
    Alert,
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';

import { useSelector } from '@context/index';

import {
    NavHeader,
    Loading,
    Container,
    Input,
    Button,
    SafeView
} from '@styles/index';

import { updateUser } from '@context/actions/user';
import { checkConnect } from '@utils/index';
import creatEditInfo, {
    SET_MESSAGE
} from '@context/reducers/local/create-edit-info';

const { height } = Dimensions.get('window');

const InfoSchema = z
    .object({
        Message: z
            .string()
            .min(1, { message: 'Por favor, forneça uma descrição.' }),
        Name: z.string(),
        UserName: z.string()
    })
    .strict();

const EditInfo = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        profile: {
            list: [profile],
            mutate
        }
    } = useSelector(({ info, profile }) => ({
        info,
        profile
    }));

    const [info, dispatch] = useReducer(creatEditInfo, {
        Message: profile?.Message,
        Name: profile?.Name,
        UserName: profile?.UserName
    });
    const [keyboardHeight, setKeyboardHeight] = useState(false);
    const [loading, setLoading] = useState(false);

    function onKeyboardDidShow() {
        setKeyboardHeight(true);
    }

    function onKeyboardDidHide() {
        setKeyboardHeight(false);
    }

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
        Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);
    }, []);

    const onSubmit = async () => {
        try {
            setLoading(true);

            await InfoSchema.parseAsync(info);

            mutate(() => [{ ...profile, Message: info.Message }], false);

            updateUser(info);

            setLoading(false);
            navigation.goBack();
        } catch (err) {
            Alert.alert(err.issues[0].message);
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <SafeView style={{ flex: 1 }}>
            <NavHeader justify={'center'} title="Editar Perfil" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <Container
                        height={height / (keyboardHeight ? 2 : 1.2) + 'px'}
                        pad="20px"
                    >
                        <Container width="100%" marg="0 0 0px 0">
                            <Input
                                maxLength={2000}
                                testID="test-desc"
                                radius={0}
                                placeholder="Insira sua descrição…"
                                placeholderTextColor="#4e4e4e8f"
                                label="Descrição do serviço"
                                value={info.Message}
                                onChangeText={(txt) =>
                                    dispatch({ type: SET_MESSAGE, data: txt })
                                }
                                maxHeight={153}
                                multiline={true}
                            />
                        </Container>
                        <Container width="100%" marg={`auto 0 0% 0`}>
                            <Button
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    onSubmit
                                )}
                                text="Salvar"
                            />
                        </Container>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default EditInfo;
