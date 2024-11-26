import React, { useEffect, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import {
    useNavigation,
    useRoute,
    RouteProp,
    CommonActions
} from '@react-navigation/native';
import { z } from 'zod';

import { useSelector } from '@context/index';
import useCategoryParams from '@hooks/category-params';
import useRequest from '@hooks/request';

import {
    NavHeader,
    SafeView,
    Button,
    Input,
    Text,
    Container,
    Select
} from '@styles/index';
import { Location } from '@styles/icons';

import { createHelp } from '@context/actions/help';
import { checkConnect } from '@utils/index';
import { createHelpDispatch } from '@context/dispatches';
import { THelpUrgency } from '@ts/types/help';

type RouteProps = {
    params: {
        filter?: number;
    };
};

const createHelpSchema = z
    .object({
        CategoryID: z
            .union([z.string().nullable().optional(), z.array(z.string())])
            .optional(),
        SubCategories: z.array(z.string()).optional(),
        Label: z.string().optional(),
        Description: z
            .string()
            .min(1, { message: 'Por favor, informe uma descrição.' }),
        Urgency: z.string({
            required_error: 'Por favor, informe a urgência do seu orçamento'
        }),
        Group: z.string(),
        Type: z.string(),
        Location: z
            .object(
                {
                    latitude: z.number(),
                    longitude: z.number(),
                    address: z.object({}).optional(),
                    displayName: z.string().optional().nullable()
                },
                {
                    invalid_type_error: 'Por favor, informe um endereço valido.'
                }
            )
            .passthrough()
    })
    .strict()
    .transform(async (data) => {
        const hasCategoryID =
            data.CategoryID &&
            (typeof data.CategoryID === 'string' || data.CategoryID.length > 0);
        const hasSubCategories =
            data.SubCategories && data.SubCategories.length > 0;

        if (!hasCategoryID && !hasSubCategories) {
            throw 'Por favor, selecione um serviço.';
        }

        return data;
    });

const MultipleProHelp = () => {
    const navigation = useNavigation();

    const {
        search: { category, location },
        info: { isConnected },
        user
    } = useSelector(({ search, info, user }) => ({
        search,
        info,
        user
    }));

    const [Description, setDesc] = useState('');
    const [loading, setLoading] = useState(false);

    const [Urgency, setUrgency] = useState<THelpUrgency>();

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { filter = 0 } = params;

    const { params: categoryParams } = useCategoryParams(filter);
    const requestName = categoryParams.CategoryID ? 'usersSearch' : null;

    const {
        data: { list: professionals },
        fetching: rLoading,
        mutate
    } = useRequest({
        name: requestName,
        params: categoryParams,
        cacheFirst: category?._id === categoryParams?.CategoryID,
        size: 50
    });

    const submitHelp = async () => {
        const helpData = {
            CategoryID: category?.self
                ? category?.similars?.map((s) => s)
                : category?._id || null,
            Label: category?.Name,
            Description,
            Urgency,
            Group: category?.Group || 'general',
            Type: 'default',
            Location: location
        };

        const providers = professionals
            .sort((a, b) => a.Distance - b.Distance)
            .map((p) => p._id);

        try {
            await createHelpSchema.parseAsync(helpData);
        } catch (err) {
            console.log('Err', err);

            let errorMessage = err;

            if (typeof err === 'object') errorMessage = err.issues[0].message;

            Alert.alert(errorMessage);
            return;
        }

        if (!user || !professionals?.length) {
            createHelpDispatch({
                ...helpData,
                Providers: providers,
                location,
                category
            });

            if (!user) {
                navigation.navigate('SignUp', { next: 'Help' });
                return;
            }

            Alert.alert(
                'Profissional não encontrado',
                'No momento não encontramos nenhum profissional na região solicitada. Sua solicitação poderá ser compartilhada no social, para que usuários da comunidade local possam colaborar com sua procura.',
                [
                    {
                        text: 'OK',
                        onPress: () =>
                            navigation.navigate('CreatePost', { type: 'help' })
                    }
                ]
            );

            setDesc('');
            setLoading(false);

            return;
        }

        try {
            setLoading(true);

            const help = await createHelp({
                Providers: providers,
                CategoryID: category?.self
                    ? category?.similars?.map((s) => String(s))
                    : String(category?._id),
                Label: category?.Name,
                Description,
                Urgency,
                Group: category?.Group || 'general',
                Type: 'default',
                Location: location
            });

            setDesc('');

            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Home' }]
                })
            );

            navigation.navigate('HelpFull', {
                helpID: String(help._id),
                goHelp: true
            });
        } catch (err) {
            console.log('@multiple-pro-help, submitHelp, err = ', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!category && professionals.length) mutate(() => []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [category, professionals]);

    return (
        <SafeView>
            <NavHeader title="Pedido de orçamento" justify="center" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView
                    testID="scrollView"
                    keyboardShouldPersistTaps="handled"
                >
                    <Container pad="15px 20px 20px 20px">
                        <Input
                            testID="test-search"
                            label="Serviço ou profissional procurado"
                            placeholder={'Ex : troca de chaves,ou chaveiro'}
                            value={category?.Name || ''}
                            onFocus={checkConnect.bind({}, isConnected, () =>
                                navigation.navigate('Categories', {
                                    next: 'MultiProHelp'
                                })
                            )}
                            style={{
                                backgroundColor: '#FFF'
                            }}
                            placeholderTextColor="#4e4e4e8f"
                            flex={1}
                            pad="0 42px"
                            left={true}
                            top={10}
                            mBottom={false}
                            pointerEvents="none"
                            editable={false}
                        />

                        <Text
                            marg="20px 0"
                            color="#4e4e4e"
                            size={14}
                            weight="bold"
                        >
                            Local a ser realizado
                        </Text>

                        <Button
                            testID="test-location"
                            top={-10}
                            textMarginL={8}
                            textAlign="left"
                            onPress={checkConnect.bind({}, isConnected, () => {
                                navigation.navigate('Location', {
                                    next: 'MultiProHelp'
                                });
                            })}
                            type="plan"
                            color={!location?.displayName && '#4e4e4e8f'}
                            text={
                                location?.displayName
                                    ? location?.displayName
                                    : 'Selecione um local'
                            }
                            left={
                                <Location
                                    color={
                                        location?.displayName
                                            ? '#4e4e4e'
                                            : '#4e4e4e8f'
                                    }
                                />
                            }
                        />
                        <Input
                            testID="test-description"
                            top={20}
                            label="Descrição do serviço"
                            value={Description}
                            onChangeText={(txt: string) => {
                                if (
                                    txt[0] === '\n' ||
                                    (txt[txt.length - 1] === '\n' &&
                                        txt[txt.length - 2] === '\n')
                                )
                                    return;

                                setDesc(txt);
                            }}
                            multiline={true}
                            height={153}
                            placeholder="Especifique-o detalhadamente..."
                            radius={5}
                            pad="15px"
                            placeholderTextColor="#4e4e4e8f"
                        />

                        <Text color="#4e4e4e" size={14} weight="bold">
                            Nível de Urgência
                        </Text>

                        <Select
                            options={[
                                {
                                    label: 'Imediato',
                                    value: 'urgent'
                                },
                                {
                                    label: 'Nos próximos dias',
                                    value: 'medium'
                                },
                                {
                                    label: 'Sou flexível',
                                    value: 'can_wait'
                                }
                            ]}
                            value={Urgency}
                            setSelectedValue={setUrgency}
                            mTop={10}
                        />

                        <Button
                            type={rLoading || loading ? 'disabled' : 'default'}
                            disabled={rLoading || loading ? true : false}
                            top={40}
                            onPress={checkConnect.bind(
                                {},
                                isConnected,
                                submitHelp
                            )}
                            text={
                                rLoading
                                    ? 'Buscando...'
                                    : loading
                                      ? 'Enviando'
                                      : 'Enviar'
                            }
                        />
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default MultipleProHelp;
