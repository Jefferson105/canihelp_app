import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ModalOptions from '@components/profile/modal';
import ExpandImage from '@components/profile/expand-image';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { Float, Container } from '@styles/index';
import { Icon } from '@styles/icon';
import { mainColor } from '@styles/colors';

import { checkConnect } from '@utils/index';
import { toggleContact } from '@context/actions/contacts';

const ProfileHeader = () => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({
        info,
        profile,
        user
    }));

    const isEdit = profile._id === user?._id;
    const hasPortfolio = profile.Portfolio?.length < 1;
    const isProvider = profile.Categories.length >= 1;
    const isproviderEdit = isProvider === (isEdit && hasPortfolio);
    const appearHeader = hasPortfolio !== isproviderEdit;

    const {
        data: {
            list: [isContact]
        },
        mutate
    } = useRequest({
        name: user && !isEdit ? 'userIsContact' : null,
        params: { ContactId: profile?._id }
    });

    const [modal, setModal] = useState(false);
    const [expand, setExpand] = useState(false);

    const onCloseModal = () => {
        setModal(false);
    };
    const onCloseExpand = () => {
        setExpand(false);
    };

    const onAddContact = () => {
        if (!user) return null;

        mutate(() => [!isContact], false);
        toggleContact(profile);
    };

    return (
        <Float
            width="100%"
            bg={appearHeader ? '#fff' : 'rgba(0, 0, 0, 0.1)'}
            height="48px"
            pad="0"
            top={`${Platform.OS === 'android' ? 0 : insets.top}px`}
            left="0"
        >
            <Container
                height="100%"
                dir="row"
                align="center"
                justify="space-between"
            >
                <Container
                    testID="testeGoback"
                    onPress={() => navigation.goBack()}
                    height="100%"
                    pad="0 20px"
                    justify="center"
                >
                    <Icon
                        name="arrowBack"
                        color={appearHeader ? '#323232' : '#fff'}
                    />
                </Container>

                <Container
                    height="100%"
                    dir="row"
                    justify="space-around"
                    align="center"
                    pad="0 8px 0 0"
                >
                    {profile.Portfolio[0] && (
                        <Container
                            height="100%"
                            testID="test-portfolio"
                            onPress={() => {
                                setExpand(true);
                            }}
                            pad="0 12px"
                            justify="center"
                        >
                            <Icon
                                name="openImage"
                                color={appearHeader ? '#323232' : '#fff'}
                                width={24}
                                height={24}
                            />
                        </Container>
                    )}
                    {!isEdit && (
                        <>
                            {!!user && (
                                <Container
                                    testID="heartTest"
                                    pad="0 12px"
                                    justify="center"
                                    height="100%"
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        onAddContact
                                    )}
                                >
                                    <Icon
                                        name="heart"
                                        width={24}
                                        height={24}
                                        color={
                                            isContact
                                                ? mainColor
                                                : appearHeader
                                                  ? '#323232'
                                                  : '#fff'
                                        }
                                    />
                                </Container>
                            )}
                            <Container
                                testID="test-tripleDot"
                                pad="0 12px"
                                height="100%"
                                justify="center"
                                onPress={() => {
                                    setModal(true);
                                }}
                            >
                                <Icon
                                    name="tripleDot"
                                    color={appearHeader ? '#323232' : '#fff'}
                                    width={24}
                                    height={24}
                                />
                            </Container>
                        </>
                    )}
                </Container>
                <ModalOptions
                    active={modal}
                    close={onCloseModal}
                    UserID={profile._id}
                />
                <ExpandImage active={expand} close={onCloseExpand} />
            </Container>
        </Float>
    );
};

export default ProfileHeader;
