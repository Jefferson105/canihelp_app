import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Alert } from 'react-native';

import { useSelector } from '@context/index';
import useRequest from '@hooks/request';
import ProRegisterBase from '@components/provider-register/base';

import {
    Container,
    Button,
    Text,
    Title,
    Loading,
    CheckBox
} from '@styles/index';

import { searchMatchCategories } from '@utils/search';
import { registerProDispatch } from '@context/dispatches';

type RouteParams = {
    params: {
        search: string;
        edit: boolean;
    };
};

const CategorieResult = () => {
    const navigation = useNavigation();
    const {
        registerPro: { category },
        categories
    } = useSelector(({ registerPro, categories }) => ({
        registerPro,
        categories
    }));

    const {
        data: { list: specialties },
        loading
    } = useRequest({
        name: 'categoriesSpecialty',
        refetching: false
    });

    const [list, setList] = useState([]);

    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const onSubmit = () => {
        registerProDispatch({ subs: [] });
        registerProDispatch({ specialties: [] });

        if (category) {
            if (
                categories.some(
                    (c) => String(c.ParentID) === String(category._id)
                )
            )
                navigation.navigate('SelectEspc', { edit: !!params.edit });
            else
                navigation.navigate('ProviderKeyWord', {
                    skiped: true,
                    edit: !!params.edit
                });
        } else Alert.alert('Selecione uma categoria');
    };

    useEffect(() => {
        //TODO: tests should render with routeparams
        if (!params.search || loading) return;

        // search categories with term
        const matchCategories = searchMatchCategories(
            params.search,
            categories
                .filter((c) => c.Type !== 'classifier')
                .concat(specialties)
        );

        // first 5 categories
        let mainCategories = matchCategories.slice(0, 5);

        // specialties found
        const matchSpecialties = mainCategories.filter(
            (c) => c.Type === 'specialty'
        );

        if (matchCategories.length) {
            // remove specialties from main categories array
            mainCategories = mainCategories.filter(
                (c) =>
                    matchSpecialties
                        .map((s) => String(s._id))
                        .indexOf(String(c._id)) === -1
            );

            // categories related to specialties
            let relations = [];
            // amount of categories without any relation
            let withoutRelation = 0;

            for (const speciaty of matchSpecialties) {
                if (speciaty?.Relations?.length) {
                    relations = relations.concat(
                        speciaty.Relations
                            // filter categories tha are not in 'mainCategories'
                            .filter(
                                (c) =>
                                    mainCategories
                                        .map((mc) => String(mc._id))
                                        .indexOf(String(c)) === -1
                            )
                            .map((r) =>
                                categories.find(
                                    (c) => String(c._id) === String(r)
                                )
                            )
                    );
                } else {
                    // increase categories without relation
                    withoutRelation += 1;
                }
            }

            if (withoutRelation)
                mainCategories = mainCategories.concat(
                    matchCategories
                        .slice(5)
                        .filter((c) => c.Type !== 'specialty')
                        .slice(0, withoutRelation)
                );

            if (relations.length)
                mainCategories = mainCategories.concat(relations);
        }

        setList(
            mainCategories.filter(
                (c, i, arr) =>
                    !!c &&
                    !arr
                        .slice(0, i)
                        .some((ca) => String(ca._id) === String(c._id))
            )
        );
    }, [params.search, categories, specialties, loading]);

    return (
        <ProRegisterBase percent={36}>
            {list.length ? (
                <>
                    <Container width="100%" marg="0 0 24px 0">
                        <Title align="left">
                            Nós encontramos estes resultados relacionados.
                        </Title>

                        <Text marg="8px 0">
                            Marque a opção que mais se encaixe ao seu serviço
                            prestado.
                        </Text>
                    </Container>
                    {list.map((item, index) => (
                        <Container
                            width="100%"
                            dir="row"
                            justify="space-between"
                            align="center"
                            marg="0 0 18px 0"
                            key={item._id}
                            onPress={() =>
                                registerProDispatch({ category: item })
                            }
                        >
                            <Text size={15}>{item.Name}</Text>
                            <CheckBox
                                index={index}
                                onChange={() =>
                                    registerProDispatch({ category: item })
                                }
                                checked={category?._id === item._id}
                            />
                        </Container>
                    ))}
                    <Container width="100%" marg="auto 0 20px 0">
                        <Button
                            onPress={onSubmit}
                            disabled={!category}
                            text="Avançar"
                        />
                    </Container>
                </>
            ) : loading ? (
                <Loading overlay={false} />
            ) : (
                <Container flex={1}>
                    <Container width="100%" marg="0 0 24px 0">
                        <Title align="left">
                            Não encontramos nenhum resultado relacionados.
                        </Title>

                        <Text marg="8px 0">Volte e tente novamente.</Text>
                    </Container>
                    <Container width="100%" marg="auto 0 20px 0">
                        <Button
                            onPress={() =>
                                navigation.navigate('ProviderService')
                            }
                            text="Voltar"
                        />
                    </Container>
                </Container>
            )}
        </ProRegisterBase>
    );
};

export default CategorieResult;
