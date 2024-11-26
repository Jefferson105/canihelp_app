import React, { useState, useMemo, useEffect } from 'react';
import {
    Alert,
    BackHandler,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import SearchLocation from '@components/search-location';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';
import useCategoryParams from '@hooks/category-params';

import {
    NavHeader,
    SafeView,
    Button,
    Input,
    Text,
    Container,
    Select,
    Loading
} from '@styles/index';
import { Icon } from '@styles/icon';

import { createHelp } from '@context/actions/help';
import { checkConnect } from '@utils/index';
import { displayAddress } from '@services/location';
import { createHelpDispatch } from '@context/dispatches';
import { createHelpSchema } from '@utils/validations';
import { IHelpTransport } from '@ts/interfaces/help';
import { THelpUrgency } from '@ts/types/help';

type RouteProps = {
    params: {
        CategoryID: string;
        filter?: number;
        search?: boolean;
    };
};

const TransportationProHelp = () => {
    const navigation = useNavigation();

    const {
        search: { location },
        info: { isConnected },
        categories,
        user
    } = useSelector(({ search, info, categories, user }) => ({
        search,
        info,
        categories,
        user
    }));

    const {
        params: { CategoryID, filter, search }
    } = useRoute<RouteProp<RouteProps, 'params'>>();

    const [loading, setLoading] = useState(false);
    const [Description, setDesc] = useState('');

    // TODO: useReducers instead useState
    const [destinyFrom, setDestinyFrom] = useState<IHelpTransport>({
        Address: location?.displayName,
        Lat: location?.latitude,
        Lon: location?.longitude,
        ShortLocation: displayAddress(location?.address, true)
    });
    const [destinyFromReference, setDestinyFromReference] = useState<string>();

    const [destinyTo, setDestinyTo] = useState<IHelpTransport>();
    const [destinyToReference, setDestinyToReference] = useState<string>();

    const [showSearchType, setShowSearchType] = useState<'from' | 'to'>();
    const [Urgency, setUrgency] = useState<THelpUrgency>();

    const category = useMemo(() => {
        return categories.find((c) => c._id === CategoryID);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [CategoryID]);

    const { params } = useCategoryParams(filter);

    const {
        data: { list: professionals },
        loading: rLoading
    } = useRequest({
        name: params.Location ? 'usersSearch' : null,
        params,
        size: 50
    });

    const submitHelp = async () => {
        const helpData = {
            CategoryID,
            Description,
            Urgency,
            Type: 'default',
            Group: 'transportation',
            Transport: {
                Origin: {
                    ...destinyFrom,
                    Reference: destinyFromReference
                },
                Destiny: { ...destinyTo, Reference: destinyToReference }
            }
        };

        try {
            createHelpSchema.parse(helpData);
        } catch (err) {
            Alert.alert(err.issues[0].message);
            return;
        }

        const providers = professionals
            .sort((a, b) => a.Distance - b.Distance)
            .map((p) => p._id);

        if (!user || !professionals?.length) {
            createHelpDispatch({
                ...helpData,
                Providers: providers,
                category,
                location: {
                    displayName: destinyFrom.Address,
                    latitude: destinyFrom.Lat,
                    longitude: destinyFrom.Lon
                }
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
                CategoryID,
                Description,
                Urgency,
                Label: category?.Name,
                Type: 'default',
                Group: 'transportation',
                Transport: {
                    Origin: {
                        ...destinyFrom,
                        Reference: destinyFromReference
                    },
                    Destiny: { ...destinyTo, Reference: destinyToReference }
                }
            });

            setDesc('');
            setLoading(false);

            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }]
            });

            navigation.navigate('HelpFull', {
                helpID: help._id
            });
        } catch (err) {
            console.log('@transportation-pro-help, submitHelp, err = ', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectLocation = (value) => {
        if (value.type === 'from') {
            if (value.displayName) {
                setDestinyFrom({
                    Address: value.displayName,
                    Lat: value.latitude,
                    Lon: value.longitude,
                    ShortLocation: displayAddress(value.address, true)
                });
            } else {
                setDestinyFrom({
                    Address: displayAddress(value.address),
                    Lat: value.latitude,
                    Lon: value.longitude,
                    ShortLocation: displayAddress(value.address, true)
                });
            }
            setShowSearchType(null);
            return;
        }

        if (value.type === 'to') {
            if (value.displayName) {
                setDestinyTo({
                    Address: value.displayName,
                    Lat: value.latitude,
                    Lon: value.longitude,
                    ShortLocation: displayAddress(value.address, true)
                });
            } else {
                setDestinyTo({
                    Address: displayAddress(value.address),
                    Lat: value.latitude,
                    Lon: value.longitude,
                    ShortLocation: displayAddress(value.address, true)
                });
            }
            setShowSearchType(null);
            return;
        }
    };

    useEffect(() => {
        const backAction = () => {
            navigation.navigate('Home');
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!category) return <Loading />;

    return (
        <SafeView>
            <NavHeader
                title="Pedido de orçamento"
                justify="center"
                backHandler={() => {
                    search ? navigation.goBack() : navigation.navigate('Home');
                }}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView keyboardShouldPersistTaps="handled">
                    <Container pad="15px 20px 20px 20px">
                        <Container dir="row" align="center" marg="0 0 10px">
                            <Container
                                width="48px"
                                height="48px"
                                color="#FFF"
                                justify="center"
                                align="center"
                                radius={100}
                                style={{
                                    shadowColor: '#000',
                                    shadowOffset: {
                                        width: 1,
                                        height: 1
                                    },
                                    shadowOpacity: 0.2,
                                    shadowRadius: 1.41,
                                    elevation: 8
                                }}
                            >
                                <Icon name="megaphone" />
                            </Container>

                            <Text
                                weight="600"
                                size={18}
                                marg="0 0 0 10px"
                                decoration="underline"
                            >
                                {category.Name}
                            </Text>
                        </Container>

                        <Text
                            marg="16px 0  9.12px 0"
                            color="#4e4e4e"
                            size={14}
                            weight="bold"
                        >
                            Local de origem
                        </Text>
                        <Button
                            textMarginL={8}
                            textAlign="left"
                            onPress={() => setShowSearchType('from')}
                            type="plan"
                            color={!destinyFrom?.Address && '#4e4e4e8f'}
                            text={
                                destinyFrom?.Address
                                    ? destinyFrom.Address
                                    : 'Localização de origem'
                            }
                            left={
                                <Icon
                                    name="location"
                                    color={
                                        destinyFrom?.Address
                                            ? '#4e4e4e'
                                            : '#4e4e4e8f'
                                    }
                                />
                            }
                            top={0}
                        />

                        <Input
                            value={destinyFromReference}
                            onChangeText={(txt) =>
                                setDestinyFromReference(String(txt))
                            }
                            placeholder="Complemento e referência"
                            placeholderTextColor="#4e4e4e8f"
                            top={15}
                            shadow={true}
                        />

                        <Text
                            marg="-4px 0  9.12px 0"
                            color="#4e4e4e"
                            size={14}
                            weight="bold"
                        >
                            Local de Destino
                        </Text>

                        <Button
                            textMarginL={8}
                            textAlign="left"
                            onPress={() => setShowSearchType('to')}
                            type="plan"
                            color={!destinyTo && '#4e4e4e8f'}
                            text={
                                destinyTo
                                    ? destinyTo.Address
                                    : 'Localização de destino'
                            }
                            left={
                                <Icon
                                    name="location"
                                    color={destinyTo ? '#4e4e4e' : '#4e4e4e8f'}
                                />
                            }
                            top={0}
                        />

                        <Input
                            value={destinyToReference}
                            onChangeText={(txt) =>
                                setDestinyToReference(String(txt))
                            }
                            placeholder="Complemento e referência"
                            placeholderTextColor="#4e4e4e8f"
                            top={15}
                            shadow={true}
                        />

                        <Input
                            label="Descrição do serviço"
                            value={Description}
                            onChangeText={(txt) => setDesc(String(txt))}
                            multiline={true}
                            height={153}
                            placeholder="Descreva o serviço detalhadamente, o que será transportado..."
                            radius={5}
                            pad="15px"
                            placeholderTextColor="#4e4e4e8f"
                            shadow={true}
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

                        {rLoading && (
                            <Button
                                type="disabled"
                                top={40}
                                text="Buscando..."
                            />
                        )}
                        {loading && (
                            <Button type="disabled" top={40} text="Enviando" />
                        )}
                        {!loading && !rLoading && (
                            <Button
                                top={40}
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    submitHelp
                                )}
                                text="Enviar"
                            />
                        )}
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal
                visible={!!showSearchType}
                onRequestClose={() => setShowSearchType(null)}
                animationType="slide"
                transparent={true}
            >
                <SearchLocation
                    isAutentic={true}
                    backHandler={() => setShowSearchType(null)}
                    onSelect={(response) =>
                        handleSelectLocation({
                            ...response,
                            type: showSearchType
                        })
                    }
                />
            </Modal>
        </SafeView>
    );
};

export default TransportationProHelp;
