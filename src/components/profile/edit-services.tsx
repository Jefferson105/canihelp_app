import React, { useReducer, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { z } from 'zod';

import { useSelector } from '@context/index';

import {
    NavHeader,
    Button,
    Loading,
    Press,
    Container,
    Input,
    Text
} from '@styles/index';

import { Icon } from '@styles/icon';

import { updateUser } from '@context/actions/user';
import { checkConnect } from '@utils/index';
import { currencyToFloat, parseCurrency } from '@utils/currency';
import creatEditService, {
    ADD_SERVICE,
    NAME_SERVICE,
    PRICE_SERVICE
} from '@context/reducers/local/creat-edit-services';

const InfoSchema = z
    .object({
        Services: z.array(
            z
                .object({
                    Name: z.string().min(1, { message: 'Nome Obrigatorio' }),
                    Price: z.number().min(1, { message: 'Preço Obrigatorio' })
                })
                .strict()
        )
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

    const [info, dispatch] = useReducer(creatEditService, {
        Services: profile.Services.map((s) => ({
            ...s,
            Price: s.Price.toFixed(2)
        }))
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = checkConnect.bind({}, isConnected, async () => {
        try {
            if (info.Services === profile.Services) return navigation.goBack();

            info.Services = info.Services.filter((s) => s.Name).map((s) => ({
                ...s,
                Price: currencyToFloat(s.Price)
            }));

            await InfoSchema.parse(info);

            setLoading(true);

            mutate(
                () => [
                    {
                        ...profile,
                        Services: info.Services
                    }
                ],
                false
            );

            updateUser(info);

            navigation.goBack();
        } catch (err) {
            Alert.alert(err.issues[0].message || err);
            setLoading(false);
        }
    });

    if (loading) return <Loading />;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{ flex: 1 }}
        >
            <ScrollView testID="scrollView" keyboardShouldPersistTaps="handled">
                <NavHeader justify={'center'} title="Serviços" />
                <Container width="100%" pad="20px">
                    {info.Services.map((s, index) => (
                        <Container width="100%" key={index}>
                            <Container
                                width="100%"
                                dir="row"
                                justify="space-between"
                                align="center"
                                marg="0 0 18px 0"
                            >
                                <Text family="Circularstd-Medium">
                                    Serviço {index + 1}
                                </Text>
                                <Press
                                    testID={`deleteTest${index}`}
                                    onPress={() =>
                                        dispatch({
                                            type: 'DELETE_SERVICE',
                                            data: index
                                        })
                                    }
                                >
                                    <Icon name="trashCan" />
                                </Press>
                            </Container>
                            <Container width="100%">
                                <Input
                                    maxLength={100}
                                    testID="test-service-name"
                                    label="Nome do Serviço"
                                    value={s.Name}
                                    onChangeText={(txt) =>
                                        dispatch({
                                            type: NAME_SERVICE,
                                            data: { name: txt, index }
                                        })
                                    }
                                />
                                <Input
                                    testID="test-service-price"
                                    label="Valor do Serviço"
                                    value={parseCurrency(String(s.Price))}
                                    keyboardType="numeric"
                                    onChangeText={(txt) =>
                                        dispatch({
                                            type: PRICE_SERVICE,
                                            data: { price: txt, index }
                                        })
                                    }
                                />
                            </Container>
                        </Container>
                    ))}

                    <Container
                        testID="testInc"
                        onPress={() => {
                            if (info.Services?.length >= 50) {
                                Alert.alert(
                                    'Limite atingido',
                                    'Você pode adicionar até 50 serviços'
                                );
                                return;
                            }
                            dispatch({
                                type: ADD_SERVICE,
                                data: null
                            });
                        }}
                        align="center"
                        justify="center"
                        height="50px"
                        width="100%"
                        border="2px dashed #00000012;"
                        marg="0 0 24px 0"
                    >
                        <Icon
                            name="add"
                            height={24}
                            width={24}
                            color="#000000"
                        />
                    </Container>

                    <Button onPress={onSubmit} text="Salvar" />
                </Container>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default EditInfo;
