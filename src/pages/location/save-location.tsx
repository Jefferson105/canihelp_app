import React, { useCallback, useState, useRef } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    ScrollView,
    View,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    SafeAreaView,
    Modal
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import SearchLocation from '@components/search-location';
import Location from '@components/location';
import { useSelector } from '@context/index';

import { NavHeader, Loading, Button, Container, Close } from '@styles/index';

import {
    formatAddressGoogle,
    formatCepRes,
    googleFromCep
} from '@services/location';
import { AddressSchema } from '@utils/schemas';
import { checkConnect } from '@utils/index';
import { updateUser } from '@context/actions/user';
import { getFixedLocation } from '@context/actions/location';
import { getByCep } from '@services/get-cep';
import { IAddress } from '@ts/interfaces/user';

type RouteParms = {
    params: {
        edit?: number;
    };
};

let timeout: ReturnType<typeof setTimeout>;

const SaveLocation = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user,
        profile,
        location
    } = useSelector(({ info, user, profile, location }) => ({
        info,
        user,
        profile,
        location
    }));
    const { params } = useRoute<RouteProp<RouteParms, 'params'>>();

    const edit = params?.edit || 0;

    const [userAuth] = useState(!!user);

    const [address, setAddress] = useState<IAddress>(
        user?.Address || {
            City: '',
            Country: '',
            Neighborhood: '',
            State: '',
            Street: '',
            Show: false
        }
    );
    const [showSearch, setSearch] = useState(false);

    const [coords, setCoords] = useState(() => {
        if (userAuth && user?.LocationFixed)
            return {
                latitude: user.LocationFixed.Lat,
                longitude: user.LocationFixed.Lon
            };

        return {};
    });

    const [loading, setLoading] = useState(false);
    const [cepLoading, setCepLoading] = useState(false);
    const [cepHasError, setCepHasError] = useState(false);

    const next = async () => {
        try {
            address.Number = String(address.Number);

            await AddressSchema.parse(address);

            const req = {
                Address: address,
                LocationFixed: {
                    Lat: String(coords.latitude),
                    Lon: String(coords.longitude),
                    New: !params?.edit
                }
            };

            setLoading(true);

            if (profile?.mutate)
                profile?.mutate(
                    () => [{ ...profile.list[0], Address: address }],
                    false
                );

            await updateUser(req, false);

            if (!location?.coords) getFixedLocation();

            switch (edit) {
                case 1:
                    navigation.goBack();
                    break;
                default:
                    navigation.navigate('Home');
                    break;
            }

            setLoading(false);
        } catch (err) {
            console.log('@save-location, next, err = ', err);
            Alert.alert(
                err.issues[0].message ||
                    err.error ||
                    err.message ||
                    'Desculpe, algo deu errado'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleCEPChanged = useCallback(
        async (cep: string) => {
            try {
                setCepLoading(true);

                let googleCepRes = await googleFromCep(cep);

                let addressFromCep = null;
                let coords = null;

                // check if Google API has address
                if (googleCepRes?.results?.length) {
                    const result = googleCepRes?.results[0];

                    addressFromCep = formatAddressGoogle(
                        result.address_components
                    );

                    if (
                        !addressFromCep ||
                        !addressFromCep?.Street ||
                        !addressFromCep?.Neighborhood
                    ) {
                        addressFromCep = null;
                    }

                    if (result?.geometry?.location?.lat)
                        coords = {
                            latitude: result?.geometry?.location?.lat,
                            longitude: result?.geometry?.location?.lng
                        };
                }

                if (!addressFromCep) {
                    const info = await getByCep(cep);

                    addressFromCep = formatCepRes(info);

                    if (info?.lat)
                        coords = {
                            latitude: info?.lat,
                            longitude: info?.lon
                        };
                }

                setCepHasError(false);

                if (
                    !addressFromCep ||
                    !Object.keys(addressFromCep).length ||
                    !coords
                )
                    throw 'cep not found';

                if (!addressFromCep?.Street || !addressFromCep?.Neighborhood) {
                    Alert.alert(
                        'Busca de localização',
                        'Esse CEP não tem informações suficientes, procure sua localização na pesquisa.',
                        [
                            {
                                text: 'OK',
                                onPress: () => setSearch(true)
                            }
                        ]
                    );
                    return;
                }

                setAddress((prevState) => ({
                    ...prevState,
                    ...{
                        City: addressFromCep?.City,
                        Neighborhood: addressFromCep?.Neighborhood,
                        State: addressFromCep?.State,
                        Street: addressFromCep?.Street
                    },
                    Country: 'BR'
                }));

                setCoords(coords);
            } catch (err) {
                console.log('cep err = ', err);
                setAddress((prevState) => ({
                    ...prevState,
                    City: '',
                    Country: '',
                    Neighborhood: '',
                    State: '',
                    Street: ''
                }));
                setCepHasError(true);
            } finally {
                setCepLoading(false);
            }
        },
        [setCepLoading]
    );

    const handleCepChange = (value: string) => {
        clearTimeout(timeout);

        setCoords({});
        setAddress((prevState) => ({
            ...prevState,
            City: '',
            Country: '',
            Neighborhood: '',
            State: '',
            Street: '',
            PostCode: value.replace(/[^0-9]/g, '')
        }));

        if (value === '' || value === null || value?.length !== 8) {
            setLoading(false);
            setCepHasError(false);
            return;
        }

        timeout = setTimeout(() => {
            handleCEPChanged(value);
        }, 1000);
    };

    const handleSelect = (addr) => {
        setAddress({
            ...address,
            ...addr.address
        });
        setCoords({
            latitude: addr.latitude,
            longitude: addr.longitude
        });
        setSearch(false);
        setCepHasError(false);
    };

    const scroll = useRef<ScrollView>(null);

    const scrollToBottom = () => {
        scroll.current?.scrollToEnd({
            animated: true
        });
    };

    if (loading) return <Loading />;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={{
                flexGrow: 1,
                height: '100%'
            }}
        >
            <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
                <ScrollView
                    testID="scrollView"
                    scrollToOverflowEnabled={false}
                    keyboardShouldPersistTaps="handled"
                    ref={scroll}
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            {!params?.edit && (
                                <Container color="#E3E3E3">
                                    <Container
                                        width={'100%'}
                                        height="7px"
                                        color="#FF6F5C"
                                    />
                                </Container>
                            )}
                            <NavHeader
                                justify={'center'}
                                title={edit ? 'Editar Localização' : ''}
                                right={
                                    !params?.edit && (
                                        <Container marg="8px 40px 8px auto ">
                                            <Close
                                                height={40}
                                                width={40}
                                                radius={40}
                                                navigation={() => {
                                                    navigation.navigate('Home');
                                                }}
                                            />
                                        </Container>
                                    )
                                }
                            />

                            <Container pad="20px 20px 0">
                                <Location
                                    scrollToBottom={scrollToBottom}
                                    scroll={scroll}
                                    address={address}
                                    coords={coords}
                                    setAddress={setAddress}
                                    handleCepChange={handleCepChange}
                                    cepHasError={cepHasError}
                                    setSearch={setSearch}
                                />
                            </Container>
                            <Container pad="0px 20px 20px">
                                <Button
                                    text={edit ? 'Salvar' : 'Proximo'}
                                    top={10}
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        next
                                    )}
                                />
                            </Container>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </SafeAreaView>
            {cepLoading && <Loading />}
            <Modal
                visible={!!showSearch}
                onRequestClose={() => setSearch(false)}
                animationType="slide"
                transparent={true}
            >
                <SearchLocation
                    isAutentic={true}
                    backHandler={() => setSearch(false)}
                    onSelect={handleSelect}
                />
            </Modal>
        </KeyboardAvoidingView>
    );
};

export default SaveLocation;
