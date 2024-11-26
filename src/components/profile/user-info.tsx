import React, { useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal, Dimensions, View } from 'react-native';

import MediaPicker from '@components/media-picker/media-picker';
import { useSelector } from '@context/index';

import {
    Container as Cont,
    Avatar,
    Edit,
    Name,
    Text,
    Button,
    Image,
    Float,
    Press
} from '@styles/index';
import { Icon } from '@styles/icon';

import { followProfile } from '@context/actions/profile';
import { updateUser } from '@context/actions/user';
import { userCategory, parseRating, checkConnect } from '@utils/index';
import { IAsset } from '@services/media';

const UserInfo = ({ handleCamera }) => {
    const navigation = useNavigation();
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

    const { width } = Dimensions.get('window');
    const maxWidth = width - 116 + 'px';

    const [photo, setPhoto] = useState(null);
    const [modal, setModal] = useState(false);
    const [expand, setExpand] = useState(null);

    const isEdit = profile._id === user?._id;

    const profileUser = useMemo(() => {
        const usr = profile;

        usr.Category = userCategory(usr);
        usr.Rating = parseRating(
            usr?.Rating,
            usr.Category ? 'Professional' : 'Client'
        );
        return usr;
    }, [profile]);

    const handleModal = () => {
        setModal(!modal);
    };

    const uploadImage = (files: Array<IAsset>) => {
        setPhoto(files[0].uri);
        updateUser({ Photo: files[0] }, true, setPhoto);
    };

    const onCameraCaptureImg = (pic: { uri: string }) => {
        setPhoto(pic.uri);

        updateUser(
            {
                Photo: {
                    name: pic.uri.split('/Camera/')[1],
                    uri: pic.uri,
                    type: 'image/jpeg',
                    assetType: 'image',
                    mtime: new Date(),
                    size: 5000
                }
            },
            true,
            setPhoto
        );
    };

    return (
        <Cont dir="row" align="center" justify="space-between">
            <Modal
                visible={modal}
                onRequestClose={handleModal}
                animationType="slide"
                transparent={false}
            >
                <MediaPicker
                    maxImages={1}
                    action={uploadImage}
                    close={handleModal}
                    setCamera={() => {
                        console.log('Set camera');
                        handleCamera(onCameraCaptureImg);
                        handleModal();
                    }}
                    maxVideos={0}
                    assetType={['image']}
                />
            </Modal>
            <Cont height="100%" dir="row" align="center">
                <Cont
                    radius={40}
                    onPress={() => {
                        if (isEdit) {
                            checkConnect(isConnected, handleModal);
                        } else {
                            setExpand(photo || profileUser.Photo);
                        }
                    }}
                >
                    <Avatar
                        fromProfile={true}
                        photo={photo || profileUser.Photo}
                        user={profile?._id}
                        size="large"
                        isEdit={isEdit}
                        verified={profileUser.Verified === 'verified'}
                    />
                </Cont>
            </Cont>
            <Cont maxWidth={maxWidth} pad="0 0 0 16px" width={null}>
                <Cont marg="4px 0 0 0" width={null} dir="row">
                    <Name size={20}>{profileUser.Name}</Name>
                </Cont>

                {!!profileUser.Category && (
                    <Cont
                        align="center"
                        maxWidth={maxWidth}
                        dir="row"
                        marg="0 0 14px 0"
                    >
                        <Text line={22}>{profileUser.Category}</Text>
                        {!!isEdit && (
                            <Edit
                                testID="testEditCat"
                                marg="0px 0 0 10px"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () => navigation.navigate('SaveCategories')
                                )}
                            />
                        )}
                    </Cont>
                )}
                {!isEdit && (
                    <Cont width={null} dir="row" align="center">
                        <Button
                            testID="testFollow"
                            width={118}
                            height={30}
                            text={profileUser.Following ? 'Seguindo' : 'Seguir'}
                            type={
                                profileUser.Following ? 'default' : 'disabled'
                            }
                            onPress={checkConnect.bind(
                                {},
                                isConnected,
                                () =>
                                    !isEdit &&
                                    user &&
                                    followProfile(profileUser._id)
                            )}
                        />
                    </Cont>
                )}
            </Cont>
            <Modal visible={!!expand} transparent={true} animationType="fade">
                <View
                    style={{
                        backgroundColor: '#000',
                        height: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Float top="52px" right="0">
                        <Press
                            testID="test-close-photo"
                            onPress={() => setExpand(null)}
                        >
                            <Icon name="close" color="#fff" />
                        </Press>
                    </Float>
                    <Image
                        source={{
                            uri: expand
                        }}
                        resize="contain"
                        style={{
                            flex: 4
                        }}
                    />
                </View>
            </Modal>
        </Cont>
    );
};

export default UserInfo;
