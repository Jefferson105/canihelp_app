import React, { useState } from 'react';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';

import { useSelector } from '@context/index';
import ProRegisterBase from '@components/provider-register/base';

import {
    Container,
    Button,
    Shadow,
    Text,
    Title,
    BorderVertical,
    Tag
} from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';
import { ICategoryProRaw } from '@ts/interfaces/categories';
import { relationSpecialty, saveSpecialty } from '@context/actions/categories';
import { updateUser } from '@context/actions/user';
import { registerProDispatch } from '@context/dispatches';

type RouteProps = {
    params: {
        edit: boolean;
        skiped: boolean;
    };
};

const ProviderKeyWord = () => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const {
        info: { isConnected },
        user,
        registerPro: { specialties, category, subs },
        unreadNotifications,
        notifications
    } = useSelector(
        ({ info, user, registerPro, unreadNotifications, notifications }) => ({
            info,
            user,
            registerPro,
            unreadNotifications,
            notifications
        })
    );

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setLoading(true);

            let create: any[] = [];

            console.log('Specialties', specialties);

            if (specialties?.filter((c) => c.new).length) {
                const result = await saveSpecialty();
                create = Array.isArray(result) ? result : [];
            }

            const specialToSave = [
                ...specialties?.filter((c) => !c.new).map((c) => c._id),
                ...create.map((c) => c._id)
            ];

            const Categories: Array<ICategoryProRaw> = [
                {
                    CategoryID: String(category._id),
                    Label: params?.edit
                        ? category.Label || category.Name
                        : category.Name,
                    IsPrimary: true
                },
                ...[...subs.map((c) => c._id), ...specialToSave].map((c) => ({
                    CategoryID: String(c),
                    IsPrimary: false
                }))
            ];

            relationSpecialty({
                Specialties: specialToSave.map((s) => String(s)),
                Category: String(category._id)
            });

            await updateUser({ Categories });

            if (unreadNotifications?.mutate) unreadNotifications.mutate();

            if (params?.edit)
                navigation.navigate('Profile', {
                    user: user._id
                });
            else {
                navigation.navigate('SaveLocation');
                if (notifications?.mutate) notifications.mutate();
            }
        } catch (err) {
            console.log('@onSubmit categories err =', err);
            Alert.alert('Erro ao salvar!', 'Tente novamente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ProRegisterBase percent={72}>
            <BorderVertical width="100%" type="bottom" marg="10px 0 30px 0">
                <Title bottom={20} align="left">
                    {subs?.length
                        ? 'Pronto, já identificamos algumas de suas especialidades.'
                        : 'Você não selecionou nenhuma especialidade.'}
                </Title>
            </BorderVertical>
            <Title align="left">
                Adicionar {subs?.length ? 'mais ' : ''}
                especialidades
            </Title>
            <Text marg="8px 0">
                Agora para que os clientes possam te encontrar de acordo com
                seus serviços ainda mais específicos, adicione mais
                especialidades.
            </Text>
            <Shadow
                mTop={10}
                mBottom={10}
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
                    pad="10px 10px"
                    align="center"
                    color="#fff"
                    onPress={() =>
                        navigation.navigate('SearchKeyWord', {
                            edit: !!params?.edit
                        })
                    }
                >
                    <Icon name="loupe" />
                    <Text size={15} marg="0 0 0 10px">
                        Procure as palavras chave…
                    </Text>
                    <Container marg="0 0 0 auto">
                        <Icon name="plus" width={36} height={36} />
                    </Container>
                </Container>
            </Shadow>
            <ScrollView>
                <Container pad="0 10px" dir="row" wrap={'wrap'}>
                    {[...specialties, ...subs].map((item) => {
                        return (
                            <Container key={item._id} marg="4px">
                                <Tag
                                    size={14}
                                    press={() => {
                                        if (item.Type === 'specialty')
                                            registerProDispatch({
                                                specialties: specialties.filter(
                                                    (s) =>
                                                        String(s._id) !==
                                                        String(item._id)
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
            </ScrollView>

            <Container width="100%" marg="auto 0 12px 0">
                {loading ? (
                    <Button type="disabled" text="Salvando" />
                ) : (
                    <Button
                        onPress={checkConnect.bind({}, isConnected, onSubmit)}
                        text={params?.edit ? 'Salvar' : 'Avançar'}
                    />
                )}
            </Container>
        </ProRegisterBase>
    );
};

export default ProviderKeyWord;
