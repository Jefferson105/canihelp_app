import React, { memo } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Avatar, NavHeader } from '@styles/components';
import { BorderVertical, Press, Button } from '@styles/elements';
import { Container } from '@styles/layout';
import { Filter, Pin } from '@styles/icons';

import { socialDispatch } from '@context/dispatches';
import { checkConnect } from '@utils/index';

export const SocialHeaderComponent = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        social,
        user
    } = useSelector(({ info, social, user }) => ({
        info,
        social,
        user
    }));

    return (
        <BorderVertical type="bottom" marg="6px 24px 0 24px">
            <NavHeader
                back={false}
                title="Feed"
                bg="transparent"
                pad="0"
                left={
                    user ? (
                        <Avatar
                            border={true}
                            isBorderGreen={true}
                            photo={user.Photo}
                            size="custom"
                            customDim={30}
                            onPress={() =>
                                navigation.navigate('Profile', {
                                    user: user._id
                                })
                            }
                        />
                    ) : null
                }
                right={
                    <Container dir="row" align="center">
                        {!!user && (
                            <>
                                <Press>
                                    <Button
                                        onPress={() => {
                                            if (
                                                !social?.location?.latitude ||
                                                !social?.location?.longitude
                                            ) {
                                                Alert.alert(
                                                    'Forneça um endereço válido'
                                                );
                                                return;
                                            }
                                            navigation.navigate('CreatePost', {
                                                type: null
                                            });
                                        }}
                                        text="Postar"
                                        width={90}
                                        height={30}
                                        family="Axiforma-SemiBold"
                                        size={13}
                                        linearType="vertical"
                                    />
                                </Press>

                                <Press
                                    testID="postFilter"
                                    marg="0 0 0 20px"
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        () => {
                                            if (social.location)
                                                socialDispatch({
                                                    filter: true
                                                });
                                            else
                                                Alert.alert(
                                                    'Selecione uma localização'
                                                );
                                        }
                                    )}
                                >
                                    <Filter color="#7F7F7F" />
                                </Press>
                                <Press
                                    testID="postLocation"
                                    marg="0 0 0 20px"
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        () =>
                                            navigation.navigate('Location', {
                                                next: 'Social'
                                            })
                                    )}
                                >
                                    <Pin />
                                </Press>
                            </>
                        )}
                    </Container>
                }
            />
        </BorderVertical>
    );
};

export const SocialHeader = memo(SocialHeaderComponent);
