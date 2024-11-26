import React, { useCallback, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import SearchText from '@components/search/search-text';
import SearchInput from '@components/search/search-input';
import MobileLocation from '@components/shared/mobile-location';
import { useSelector } from '@context/index';

import { Container, List, SafeView, Name, Text } from '@styles/index';

import {
    formatAddressGoogle,
    getGoogleDetails,
    googleSearchPlaces
} from '@services/location';
import { IGetLocation } from '@ts/interfaces/location';

let timer = null;

interface SearchLocationProps {
    title?: string;
    onSelect: (address: Partial<IGetLocation>) => void;
    isModal?: boolean;
    typeSearch?: any | 'address';
    backHandler?: () => void;
    isAutentic?: boolean;
}

const SearchLocation = ({
    // isModal = true,
    onSelect,
    backHandler,
    isAutentic
}: SearchLocationProps) => {
    const {
        location,
        info: { isConnected }
    } = useSelector(({ location, user, info }) => ({ location, user, info }));

    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const renderItem = useCallback(({ item }) => {
        if (isAutentic && item.types.indexOf('route') === -1) return <></>;

        return (
            <SearchText
                name={item?.description}
                type="location"
                onPress={async () => {
                    try {
                        const { result } = await getGoogleDetails(
                            item.place_id
                        );

                        onSelect({
                            address: formatAddressGoogle(
                                result.address_components
                            ),
                            latitude: result.geometry.location.lat,
                            longitude: result.geometry.location.lng
                        });
                    } catch (err) {
                        console.log('@search-locatin, searchText, err = ', err);
                    }
                }}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const keyExtractor = useCallback((item) => {
        return item.place_id;
    }, []);

    return (
        <SafeView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{
                    flex: 1
                }}
            >
                <Container flex={1} marg="-34px 20px 0 20px">
                    <SearchInput
                        onChangeText={(text) => {
                            clearTimeout(timer);

                            setSearch(text);

                            timer = setTimeout(async () => {
                                const { predictions } =
                                    await googleSearchPlaces(text);

                                setResults(predictions);
                            }, 200);
                        }}
                        backHandler={backHandler}
                        text={search}
                        onClear={() => {
                            setSearch('');
                            setResults([]);
                        }}
                        icon={'placeholder'}
                        iconColor={'#000000'}
                        placeholder="Pesquise um endereço"
                    />

                    {isConnected ? (
                        <List
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled"
                            data={results}
                            style={{ marginTop: -10, width: '100%' }}
                            ListHeaderComponentStyle={{
                                marginBottom: 20
                            }}
                            renderItem={renderItem}
                            keyExtractor={keyExtractor}
                            ListFooterComponent={
                                <>
                                    {!!location?.coords && (
                                        <>
                                            <Name>Minha Localização</Name>
                                            <SearchText
                                                name={
                                                    location?.coords
                                                        ?.displayName
                                                }
                                                onPress={() => {
                                                    onSelect(location?.coords);
                                                }}
                                                location={true}
                                            />
                                        </>
                                    )}
                                    {!location?.coords && (
                                        <MobileLocation large={false} />
                                    )}
                                </>
                            }
                        />
                    ) : (
                        <Text size={18} marg="25px 0 0 0">
                            Sem conexão com a Internet
                        </Text>
                    )}
                </Container>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default SearchLocation;
