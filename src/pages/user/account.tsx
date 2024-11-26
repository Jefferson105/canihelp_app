import React, { useCallback, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, ScrollView } from 'react-native';

import Unlogged from '@components/empty-data/unlogged';
import { useSelector } from '@context/index';

import {
    SafeView,
    Container,
    Avatar,
    Category,
    UserName,
    Name,
    Text,
    Press,
    Circle,
    Float,
    Title,
    BorderVertical,
    Loading,
    NavHeader
} from '@styles/index';
import { Icon, iconRegistry } from '@styles/icon';

import { logout } from '@context/actions/info';
import {
    checkConnect,
    parseRating,
    showError,
    userCategory
} from '@utils/index';
import { boxConfirmDispatch } from '@context/dispatches';
import { subscribeNotifications } from '@context/actions/user';

const AAccount = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {
        info: { isConnected },
        user,
        notifications
    } = useSelector(({ info, user, notifications }) => ({
        info,
        user,
        notifications
    }));

    const goToProfile = checkConnect.bind({}, isConnected, async () => {
        navigation.navigate('Profile', {
            user: user._id
        });
    });

    const rating = useMemo(() => {
        return parseRating(
            user?.Rating,
            user?.MainCategory ? 'Professional' : 'Client'
        );
    }, [user]);

    const category = useMemo(() => {
        return userCategory(user);
    }, [user]);

    const Item = useCallback(
        ({ onPress, text, IconMain, border = true, testID }) => {
            return (
                <BorderVertical
                    type={border ? 'bottom' : 'none'}
                    width="100%"
                    marg="0 24px"
                >
                    <Press
                        style={{ width: '90%' }}
                        onPress={onPress}
                        justify="flex-start"
                        pad="10px 0"
                        testID={testID}
                    >
                        <Container dir="row" align="center">
                            <IconMain />
                            <Text marg="0 0 0 12px">{text}</Text>
                        </Container>
                        <Container marg="0 16px 0 auto">
                            <Icon
                                name="right"
                                color="#000"
                                height={16}
                                width={14}
                            />
                        </Container>
                    </Press>
                </BorderVertical>
            );
        },
        []
    );

    if (!user) {
        return (
            <SafeView>
                <Container flex={1} align="center">
                    <BorderVertical marg="6px 24px 0 24px" type="bottom">
                        <NavHeader
                            pad="0px"
                            big={true}
                            title={'Seu perfil'}
                            back={false}
                            bg="#FAFAFA"
                        />
                    </BorderVertical>
                    <Container flex={1} justify="center">
                        <Unlogged
                            title=" para visualizar o seu
                        perfil
                        "
                        />
                    </Container>
                </Container>
            </SafeView>
        );
    }

    return (
        <SafeView>
            <ScrollView>
                <Container>
                    <Container
                        color="#fff"
                        dir="row"
                        height="80px"
                        width="100%"
                        align="flex-end"
                        justify="space-between"
                        pad="17px 24px"
                    >
                        <Title size={16}>Perfil</Title>
                        <Press
                            onPress={() => navigation.navigate('Notifications')}
                        >
                            <iconRegistry.notification />
                            {!!notifications?.list.some((n) => !n?.Viewed) && (
                                <Float
                                    pad="0"
                                    top="0"
                                    bg="#fff"
                                    radius={50}
                                    right="3px"
                                >
                                    <Circle />
                                </Float>
                            )}
                        </Press>
                    </Container>
                    <BorderVertical
                        type="bottom"
                        width="100%"
                        pad="30px 20px 30px 24px"
                        marg="0 24px 20px 0"
                    >
                        <Container dir="row" align="center">
                            <Avatar
                                onPress={() => {
                                    goToProfile();
                                }}
                                size="large"
                                photo={user.Photo}
                            />
                            <Container
                                marg="0 0 0 17px"
                                flex={1}
                                justify="center"
                            >
                                <Container
                                    onPress={() => {
                                        goToProfile();
                                    }}
                                >
                                    <Name color="#323232" size={20}>
                                        {user.Name}
                                    </Name>
                                    {category ? (
                                        <Category color="#323232">
                                            {category}
                                        </Category>
                                    ) : (
                                        <UserName color="#323232">
                                            {user.UserName}
                                        </UserName>
                                    )}
                                </Container>
                                {!!rating && (
                                    <Container
                                        dir="row"
                                        align="center"
                                        justify="center"
                                        marg="5px 0 0 0"
                                    >
                                        <Icon
                                            name="star"
                                            width={20}
                                            height={20}
                                            color="#FFD159"
                                        />
                                        <Text
                                            weight="bold"
                                            size={17}
                                            marg="0 0 0 5px"
                                        >
                                            {rating}
                                        </Text>
                                    </Container>
                                )}
                            </Container>
                        </Container>
                    </BorderVertical>

                    {!category ? (
                        <Item
                            onPress={checkConnect.bind({}, isConnected, () =>
                                navigation.navigate('ProviderService')
                            )}
                            text="Oferecer meus serviços"
                            IconMain={iconRegistry.tools}
                            testID="offer-services"
                        />
                    ) : !user.Address ? (
                        <Item
                            onPress={checkConnect.bind({}, isConnected, () =>
                                navigation.navigate('SaveLocation')
                            )}
                            text="Oferecer meus serviços"
                            IconMain={iconRegistry.tools}
                            testID="save-location"
                        />
                    ) : null}
                    <Item
                        onPress={() => {
                            goToProfile();
                        }}
                        text="Ver e editar perfil"
                        IconMain={iconRegistry.user}
                        testID="account-profile"
                    />
                    <Item
                        onPress={() => navigation.navigate('Contacts')}
                        text="Contatos"
                        IconMain={iconRegistry.contacts}
                        testID="account-contacts"
                    />
                    <Item
                        onPress={checkConnect.bind(
                            {},
                            isConnected,

                            () =>
                                navigation.navigate('Ratings', {
                                    user: user._id
                                })
                        )}
                        text="Avaliações"
                        IconMain={iconRegistry.starBright}
                        testID="account-ratings"
                    />
                    <Item
                        onPress={() => navigation.navigate('ArchivedMessages')}
                        text="Mensagens arquivadas"
                        IconMain={iconRegistry.archiveds}
                        testID="account-archiveds"
                    />
                    <Item
                        onPress={() => navigation.navigate('Blocks')}
                        text="Bloqueios"
                        IconMain={iconRegistry.block}
                        testID="account-blockeds"
                    />
                    <Item
                        onPress={checkConnect.bind(
                            {},
                            isConnected,

                            () => navigation.navigate('Notification')
                        )}
                        text="Recados"
                        IconMain={iconRegistry.notification}
                        testID="account-message"
                    />
                    <Item
                        onPress={() => navigation.navigate('Privacy')}
                        text="Privacidade"
                        IconMain={iconRegistry.terms}
                        testID="privacy"
                    />
                    <Item
                        onPress={checkConnect.bind({}, isConnected, () =>
                            navigation.navigate('ChangePassword')
                        )}
                        text="Redefinir senha"
                        IconMain={iconRegistry.shuffle}
                        testID="account-change-password"
                    />
                    {!!user?.MailNotification?.Cancelled && (
                        <Item
                            onPress={checkConnect.bind(
                                {},
                                isConnected,
                                async () => {
                                    try {
                                        setLoading(true);

                                        await subscribeNotifications();

                                        Alert.alert(
                                            'Inscrição ativa',
                                            'Agora você recerá as notificações por email'
                                        );
                                    } catch (err) {
                                        showError('Erro ao ativar inscrição');
                                    } finally {
                                        setLoading(false);
                                    }
                                }
                            )}
                            text="Ativar notificações por email"
                            IconMain={iconRegistry.email}
                            testID="cancel-unsubscribe"
                        />
                    )}
                    <Item
                        onPress={async () => {
                            await logout();
                        }}
                        text="Sair"
                        IconMain={iconRegistry.exit}
                        border={false}
                        testID="account-leave"
                    />
                </Container>
                <Container
                    pad="10px 0 20px 0"
                    align="center"
                    onPress={() =>
                        boxConfirmDispatch({
                            title: 'Deseja deletar sua conta?',
                            text: 'Caso você delete sua conta seus dados serão perdidos para sempre.',
                            confirm: async () => {
                                navigation.navigate('DeleteAccount');
                            }
                        })
                    }
                >
                    <Text decoration="underline">Deletar minha conta</Text>
                </Container>
            </ScrollView>
            {!!loading && <Loading />}
        </SafeView>
    );
};

export default AAccount;
