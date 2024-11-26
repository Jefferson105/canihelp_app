import React, { useCallback, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlatList, Dimensions } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import Categories from '@components/home/categories';
import Push from '@components/push';
import User from '@components/search/user';
import NearProviders from '@components/empty-data/near-providers';
import { useDispatch, useSelector } from '@context/index';
import useRequest from '@hooks/request';

import {
    Container as Line,
    SafeView,
    Text,
    Shadow,
    BorderVertical,
    Float,
    Button,
    Title,
    Avatar
} from '@styles/index';
import { Icon } from '@styles/icon';
import theme from '@styles/theme/index';

import { checkConnect, userCategory } from '@utils/index';
import { mainColor } from '@styles/colors';
import { getUserLocation } from '@context/actions/location';

const { width } = Dimensions.get('screen');

const AHome = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        info: { isConnected, checkingAuth },
        user,
        location
    } = useSelector(({ info, user, location }) => ({
        info,
        user,
        location
    }));

    const params = useMemo(() => {
        if (!location?.coords?.latitude) return null;

        return {
            Lat: location?.coords?.latitude,
            Lon: location?.coords?.longitude
        };
    }, [location?.coords]);

    const {
        data: { list: providers },
        loading
    } = useRequest({
        name: params ? 'nearProviders' : null,
        params
    });

    const renderItem = useCallback(({ item }) => {
        return (
            <User
                withMarg={true}
                item={item}
                category={{ _id: item.MainCategory.CategoryID }}
            />
        );
    }, []);

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    const category = useMemo(() => {
        if (!user || !user.Categories) return null;

        return userCategory(user);
    }, [user]);

    const SloganOrCategory = useCallback(() => {
        if (category) {
            if (!user.Address) {
                return (
                    <Line>
                        <Text>A qualquer hora, em todo lugar.</Text>
                        <Text
                            decoration="underline"
                            color={theme.COLORS.mainColor}
                            onPress={() => navigation.navigate('SaveLocation')}
                        >
                            Complete seu perfil, informe sua localização
                        </Text>
                    </Line>
                );
            }

            return (
                <>
                    <Shadow
                        radius={24}
                        width="auto"
                        shadow={{
                            color: '#00000080',
                            height: 4,
                            opacity: 0.5,
                            radius: 4.65,
                            elevation: 8
                        }}
                    >
                        <Line pad="4px 15px" color="#fcf8f8" align="center">
                            <Text color="#000">{category}</Text>
                        </Line>
                    </Shadow>
                    <Line height="1px" color="#00000010" marg="0 24px" />
                </>
            );
        } else {
            return <Text>A qualquer hora, em todo lugar.</Text>;
        }
    }, [category, navigation, user?.Address]);

    useEffect(() => {
        if (!user && !checkingAuth) SplashScreen.hide();
    }, [checkingAuth, user]);

    useEffect(() => {
        setTimeout(() => {
            getUserLocation();
        }, 100);
    }, [dispatch]);

    return (
        <SafeView>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Line
                            marg="16px 24px 0 24px"
                            dir="row"
                            align="center"
                            justify="space-between"
                        >
                            <Line width={width - 120 + 'px'} pad="14px 0 0 0">
                                <Title size={24} align="left">
                                    {user?.Name
                                        ? `Olá, ${user.Name}`
                                        : 'Canihelp'}
                                </Title>
                            </Line>

                            {user ? (
                                <Avatar
                                    testID="Avatar"
                                    onPress={() =>
                                        navigation.navigate('Account')
                                    }
                                    photo={user?.Photo}
                                />
                            ) : (
                                <Shadow
                                    radius={24}
                                    width={80}
                                    shadow={{
                                        color: '#00000080',
                                        height: 4,
                                        opacity: 0.5,
                                        radius: 4.65,
                                        elevation: 9
                                    }}
                                >
                                    <Line
                                        onPress={() =>
                                            navigation.navigate('Login')
                                        }
                                        pad="7px 0"
                                        color="#fff"
                                        align="center"
                                    >
                                        <Text weight="bold" color="#323232">
                                            Entrar
                                        </Text>
                                    </Line>
                                </Shadow>
                            )}
                        </Line>
                        <Line
                            marg="16px 24px 0 24px"
                            dir="colum"
                            justify="space-between"
                        >
                            <SloganOrCategory />

                            {user && !user?.MainCategory && (
                                <Text
                                    decoration="underline"
                                    color={theme.COLORS.mainColor}
                                    onPress={() =>
                                        navigation.navigate('ProviderService')
                                    }
                                >
                                    Se desejar, ofereça serviços
                                </Text>
                            )}

                            {!user && (
                                <Text
                                    decoration="underline"
                                    color={theme.COLORS.mainColor}
                                    onPress={() =>
                                        navigation.navigate('SignUp')
                                    }
                                >
                                    Crie seu perfil, ofereça seus serviços.
                                </Text>
                            )}

                            <Line
                                align="center"
                                dir="row"
                                width="100%"
                                marg="20px 0px 0px 0px"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () =>
                                        navigation.navigate('Location', {
                                            next: 'Home'
                                        })
                                )}
                                wrap="wrap"
                            >
                                <Icon name="pin" />
                                <Text
                                    marg="0px 5px 0px 10px"
                                    width={width - 110 + 'px'}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                >
                                    {location?.coords
                                        ? location?.coords?.displayName
                                        : 'Pesquisar sua localização'}
                                </Text>

                                <Icon name="down" />
                            </Line>
                        </Line>

                        <BorderVertical marg="0 24px 0 24px" align="center">
                            <Line
                                marg="18px 0 20px 0"
                                width="100%"
                                height="50px"
                            >
                                <Shadow
                                    radius={5}
                                    width={'100%'}
                                    background={'#f3f3f3'}
                                    shadow={{
                                        color: '#00000080',
                                        height: 4,
                                        opacity: 0.3,
                                        radius: 4.65,
                                        elevation: 8
                                    }}
                                >
                                    <Line
                                        testID="test-search-home"
                                        justify="flex-start"
                                        dir="row"
                                        radius={5}
                                        pad="11px"
                                        align="center"
                                        color="#fff"
                                        border="#f3f3f3"
                                        onPress={checkConnect.bind(
                                            {},
                                            isConnected,
                                            () =>
                                                navigation.navigate(
                                                    'Categories'
                                                )
                                        )}
                                    >
                                        <Icon
                                            name="loupe"
                                            width={30}
                                            height={30}
                                        />
                                        <Text marg="0px 10px" size={17}>
                                            Qual serviço você precisa agora?
                                        </Text>
                                    </Line>
                                </Shadow>
                            </Line>
                        </BorderVertical>

                        <Categories />

                        <Line height="1px" color="#00000010" marg="0 24px" />

                        {!!providers?.length && (
                            <Text size={14} marg="5px 0 0 24px" weight="bold">
                                <Text size={14} weight="bold" color={mainColor}>
                                    {providers?.length}
                                </Text>{' '}
                                profissionais próximos
                            </Text>
                        )}
                    </>
                }
                data={providers}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                ListEmptyComponent={<NearProviders loading={loading} />}
            />
            {providers?.length > 0 ? (
                <Float
                    bottom="0px"
                    bg="transparent"
                    width="100%"
                    justify="center"
                    align="center"
                >
                    <Button
                        color="#fff"
                        text="Pedir Orçamentos"
                        width={200}
                        height={50}
                        size={16}
                        onPress={() => navigation.navigate('MultiProHelp')}
                    />
                </Float>
            ) : (
                ''
            )}

            {!!user && <Push />}
        </SafeView>
    );
};

export default AHome;
