import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Dimensions, Alert, FlatList } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useSelector } from '@context/index';
import useRequest from '@hooks/request';
import ProRegisterBase from '@components/provider-register/base';

import {
    Container,
    Button,
    Shadow,
    Title,
    Tag,
    Input,
    Text
} from '@styles/index';
import { Icon } from '@styles/icon';

import { searchMatchCategories } from '@utils/search';
import { mainColor } from '@styles/colors';
import { registerProDispatch } from '@context/dispatches';

const MAX_CATEGORIES = 25;
const { width } = Dimensions.get('window');

type RouteProps = {
    params: {
        edit: boolean;
    };
};

const SearchKeyWord = () => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const {
        registerPro: { specialties, category, subs },
        categories
    } = useSelector(({ registerPro, categories }) => ({
        registerPro,
        categories
    }));

    const {
        data: { list: specials }
    } = useRequest({
        name: 'categoriesSpecialty'
    });

    const [list, setList] = useState([]);
    const [search, setSearch] = useState('');

    const selecteds = useMemo(() => {
        return [...specialties, category, ...subs];
    }, [specialties, category, subs]);

    const allCategories = useMemo(() => {
        return specials
            .sort((a, b) => {
                const relationA = a?.Relations?.some((r) => r === category._id);
                const relationB = b?.Relations?.some((r) => r === category._id);

                if (relationA && relationB) {
                    return 0;
                } else if (relationA && !relationB) {
                    return -1;
                } else {
                    return 1;
                }
            })
            .concat(categories);
    }, [categories, category?._id, specials]);

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <Container
                    align="center"
                    marg="4px"
                    width={width - 40 + 'px'}
                    dir="row"
                    onPress={() => {
                        if (selecteds?.length >= MAX_CATEGORIES) {
                            Alert.alert(
                                'Limite atingido',
                                `Você pode adicionar até ${MAX_CATEGORIES} categorias`
                            );
                            return;
                        }

                        if (
                            item.new &&
                            specialties.some(
                                (s) =>
                                    s?.Name?.toLowerCase() ===
                                    search?.toLowerCase()
                            )
                        )
                            return;

                        if (item.Type === 'specialty') {
                            registerProDispatch({
                                specialties: [...specialties, item]
                            });
                        } else {
                            registerProDispatch({ subs: [...subs, item] });
                        }

                        setSearch('');
                    }}
                >
                    <Icon
                        name="plus"
                        width={28}
                        height={28}
                        color={mainColor}
                    />
                    <Text size={14}>{item.Name}</Text>
                </Container>
            );
        },
        [search, selecteds, specialties, subs]
    );

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    useEffect(() => {
        if (search.length > 1) {
            const matchs = searchMatchCategories(search, allCategories);

            if (!matchs.some((m) => m.Equal))
                matchs.unshift({
                    _id: Math.random().toString(12),
                    Type: 'specialty',
                    new: true,
                    Name: search
                });

            const selectsIds = selecteds.map((c) => String(c?._id || c));

            setList(
                matchs.filter((c) => selectsIds.indexOf(String(c._id)) === -1)
            );
        } else {
            setList([]);
        }
    }, [search, allCategories, selecteds]);

    return (
        <ProRegisterBase percent={72}>
            <Title align="left">Adicione mais especialidades</Title>
            <Shadow
                mTop={16}
                mBottom={16}
                radius={5}
                width="100%"
                background="#f3f3f3"
                shadow={{
                    color: '#00000080',
                    height: 4,
                    opacity: 0.3,
                    radius: 4.65,
                    elevation: 8
                }}
            >
                <Container
                    dir="row"
                    radius={5}
                    pad="0 10px"
                    align="center"
                    color="#fff"
                >
                    <Icon name="loupe" />
                    <Input
                        maxHeight={100}
                        mBottom={false}
                        border={false}
                        value={search}
                        onChangeText={(txt) => setSearch(String(txt))}
                        placeholder={
                            params?.edit
                                ? 'Adicionar novas especialidades'
                                : 'Digite aqui uma especialidade'
                        }
                    />
                </Container>
            </Shadow>

            <FlatList
                keyExtractor={keyExtractor}
                data={list.slice(0, 10)}
                renderItem={renderItem}
                ListFooterComponent={
                    <Container
                        width={width - 40 + 'px'}
                        dir="row"
                        wrap="wrap"
                        pad={`4px 0 ${
                            [...subs, ...specialties].length > 4 ? 0 : '50px'
                        } 0`}
                    >
                        {console.log([...subs, ...specialties])}
                        {[...subs, ...specialties].map((item) => {
                            return (
                                <Container
                                    key={item._id}
                                    align="center"
                                    justify="center"
                                    marg="4px"
                                >
                                    <Tag
                                        size={14}
                                        press={() => {
                                            if (item.Type === 'specialty')
                                                registerProDispatch({
                                                    specialties:
                                                        specialties.filter(
                                                            (s) =>
                                                                s._id !==
                                                                item._id
                                                        )
                                                });
                                            else
                                                registerProDispatch({
                                                    subs: subs.filter(
                                                        (s) =>
                                                            String(s._id) !==
                                                            String(item._id)
                                                    )
                                                });
                                        }}
                                        selected={true}
                                        text={item.Name}
                                    />
                                </Container>
                            );
                        })}
                    </Container>
                }
            />

            <Container width="100%" marg="10px 0 20px 0">
                <Button
                    onPress={() => {
                        navigation.goBack();
                    }}
                    text="Avançar"
                />
            </Container>
        </ProRegisterBase>
    );
};

export default SearchKeyWord;
