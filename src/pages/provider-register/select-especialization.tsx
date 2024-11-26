import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView } from 'react-native';

import { useSelector, useDispatch } from '@context/index';

import {
    Container,
    Button,
    Text,
    Title,
    Tag,
    BorderVertical,
    Shadow
} from '@styles/index';
import { SET_SUBS_PRO } from '@context/types';
import { getChildCategories } from '@utils/search';
import ProRegisterBase from '@components/provider-register/base';

type RouteProps = {
    params: {
        edit: boolean;
    };
};

const SelectEspc = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { registerPro, categories } = useSelector(
        ({ registerPro, categories }) => ({
            registerPro,
            categories
        })
    );

    const [subs, setSubs] = useState([]);

    const onSubmit = () => {
        navigation.navigate('ProviderKeyWord', { edit: !!params?.edit });
    };

    useEffect(() => {
        setSubs(
            getChildCategories(categories, String(registerPro?.category?._id))
        );
    }, [categories, registerPro?.category]);

    return (
        <ProRegisterBase percent={54}>
            <BorderVertical width="100%" type="bottom">
                <Title align="left">Você está oferecendo serviços como:</Title>
                <Shadow
                    shadow={{
                        color: '#00000080',
                        height: 4,
                        opacity: 0.3,
                        radius: 4.65,
                        elevation: 8
                    }}
                >
                    <Container marg="10px 0">
                        <Tag size={14} text={registerPro?.category?.Name} />
                    </Container>
                </Shadow>
            </BorderVertical>
            <Title marg="20px 0 0 0" align="left">
                Especialidades
            </Title>
            <Text marg="8px 0">
                Agora selecione as especialidades ou palavras chaves que se
                refira ao seu serviço e clique em avançar. Caso não identifique
                nenhum, avance sem selecionar.
            </Text>
            <ScrollView>
                <Container dir="row" wrap={'wrap'}>
                    {subs?.map((sub) => {
                        const selected =
                            registerPro?.subs
                                .map((sub) => String(sub._id))
                                .indexOf(String(sub._id)) > -1;

                        return (
                            <Container
                                key={sub._id}
                                align="center"
                                justify="center"
                                marg="4px"
                            >
                                <Tag
                                    size={14}
                                    press={() => {
                                        if (selected) {
                                            dispatch({
                                                type: SET_SUBS_PRO,
                                                data: registerPro?.subs.filter(
                                                    (s) =>
                                                        String(s._id) !==
                                                        String(sub._id)
                                                )
                                            });
                                        } else {
                                            dispatch({
                                                type: SET_SUBS_PRO,
                                                data: [...registerPro.subs, sub]
                                            });
                                        }
                                    }}
                                    selected={selected}
                                    text={sub.Name}
                                    withIcon={true}
                                />
                            </Container>
                        );
                    })}
                </Container>
            </ScrollView>
            <Container width="100%" marg="10px 0 20px 0">
                <Button onPress={onSubmit} text="Avançar" />
            </Container>
        </ProRegisterBase>
    );
};

export default SelectEspc;
