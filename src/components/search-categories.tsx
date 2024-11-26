import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchText from '@components/search/search-text';
import SearchInput from '@components/search/search-input';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { Container, SafeView, Text, SubTitle } from '@styles/index';

import { fillSpecialties, searchMatchCategories } from '@utils/search';
import { ICategory } from '@ts/interfaces/categories';

interface SearchCategoriesProps {
    onSelect: (item: ICategory) => void;
    backHandler?: () => void;
    toSearch?: boolean;
}

let timerSearch = null;

const SearchCategories: React.FC<SearchCategoriesProps> = ({
    onSelect,
    backHandler,
    toSearch = false
}) => {
    const {
        info: { isConnected },
        categories
    } = useSelector(({ info, categories }) => ({ info, categories }));

    const {
        data: { list: specialties }
    } = useRequest({
        name: 'categoriesSpecialty',
        refetching: false
    });

    const [search, setSearch] = useState('');
    const [recents, setRecents] = useState(null);
    const [list, setList] = useState([]);

    const allCategories = useMemo(
        () => [
            ...specialties,
            ...categories.filter((c) => c.Type !== 'classifier')
        ],
        [categories, specialties]
    );

    const topCategoriesRegisters = useMemo(() => {
        const orderedByRegisters = categories.sort(
            (a, b) => b.Registers - a.Registers
        );

        const topCategories = [];

        for (const category of orderedByRegisters) {
            if (
                topCategories
                    .map((c) => String(c.AncestralID))
                    .indexOf(String(category.AncestralID)) === -1
            ) {
                topCategories.push({
                    ...category,
                    Group:
                        category.Group === 'transportation'
                            ? 'transportation'
                            : 'remote'
                });
            }

            if (topCategories.length === 5) break;
        }

        return topCategories;
    }, [categories]);

    const renderItem = useCallback(
        (type, { item }) => {
            return (
                <SearchText
                    name={item?.Name}
                    interval={item?.Interval}
                    fontStyle={item?.self ? 'italic' : null}
                    type={type}
                    styles={item.Styles}
                    onPress={() => {
                        onSelect(item);
                    }}
                />
            );
        },
        [onSelect]
    );

    const keyExtractor = useCallback((item, index) => {
        return index + String(item?._id);
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const rec = JSON.parse(
                    await AsyncStorage.getItem('recent_searchs')
                );

                if (rec) setRecents(rec);
            } catch (err) {
                console.log(
                    '@search-categories, getItem: recent_searchs, err = ',
                    err
                );
            }
        })();
    }, []);

    const handleChangeText = useCallback(
        (txt: string) => {
            clearTimeout(timerSearch);
            setSearch(txt);

            timerSearch = setTimeout(() => {
                let filter = searchMatchCategories(txt, allCategories).slice(
                    0,
                    10
                );

                // put other categories in similars field
                filter = filter.map((c) => ({
                    ...c,
                    similars: filter.map((cf) => cf._id)
                }));

                const hasEqual = filter.some((c) => c.Equal);

                if (toSearch && !hasEqual && txt.length > 2)
                    filter.unshift({
                        _id: txt,
                        Name: txt,
                        Level: 2,
                        Type: 'default',
                        self: true,
                        Interval: [0, txt.length],
                        similars: filter.map((f) => f._id),
                        Group: 'remote'
                    });

                if (hasEqual)
                    filter = fillSpecialties({
                        search,
                        specialties,
                        categories: filter
                    });

                setList(filter.slice(0, 5));
            }, 500);
        },
        [allCategories, search, specialties, toSearch]
    );

    useEffect(() => {
        (async () => {
            try {
                const rec = JSON.parse(
                    await AsyncStorage.getItem('recent_searchs')
                );

                if (Array.isArray(rec) && typeof rec[0] === 'string') {
                    await AsyncStorage.removeItem('recent_searchs');
                    setRecents([]);
                }

                if (rec) setRecents(rec);
            } catch (err) {
                console.log(
                    '@search-categories, getItem: recent_searchs, err = ',
                    err
                );
            }
        })();
    }, []);

    return (
        <SafeView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1, marginBottom: 8 }}
            >
                <Container flex={1} marg="-34px 20px 0 20px">
                    <SearchInput
                        onChangeText={handleChangeText}
                        text={search}
                        onClear={() => {
                            setList([]);
                            setSearch('');
                        }}
                        backHandler={backHandler || null}
                    />
                    <FlatList
                        style={{ width: '100%' }}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <>
                                {isConnected ? (
                                    !!search && (
                                        <FlatList
                                            data={list}
                                            renderItem={renderItem.bind(
                                                {},
                                                'search'
                                            )}
                                            keyExtractor={keyExtractor}
                                        />
                                    )
                                ) : (
                                    <Text size={18} marg="25px 0 0 0">
                                        Sem conexão com a Internet
                                    </Text>
                                )}
                                <SubTitle
                                    marg="20px 0 0 0"
                                    align="left"
                                    size={16}
                                >
                                    Mais cadastrados
                                </SubTitle>
                            </>
                        }
                        keyboardShouldPersistTaps={'always'}
                        data={topCategoriesRegisters}
                        renderItem={renderItem.bind({}, 'search')}
                        keyExtractor={keyExtractor}
                        ListFooterComponent={
                            !!recents && (
                                <FlatList
                                    data={recents}
                                    style={{ marginTop: 25, width: '100%' }}
                                    ListHeaderComponentStyle={{
                                        marginBottom: 10
                                    }}
                                    ListHeaderComponent={
                                        <SubTitle align="left" size={16}>
                                            Últimos pesquisados
                                        </SubTitle>
                                    }
                                    renderItem={renderItem.bind({}, 'recent')}
                                    keyExtractor={keyExtractor}
                                />
                            )
                        }
                    />
                </Container>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default SearchCategories;
