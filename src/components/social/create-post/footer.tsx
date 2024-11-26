import React from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Press, Container, Text } from '@styles/index';
import { Camera, Picture, Pin } from '@styles/icons';

import { userCategory } from '@utils/index';

type RouteParams = {
    params: {
        type: 'help' | 'check' | null;
        edit: any;
    };
};

interface FooterProps {
    type: {
        type: string;
        back: boolean;
        handler: () => void;
        title: string;
    };
    handleModal: () => void;
    onAddAttach: (type: any) => void;
    canAddMoreImages: boolean;
    canAddMoreVideos: boolean;
}

const CreatePostFooter = ({
    type,
    handleModal,
    onAddAttach,
    canAddMoreImages,
    canAddMoreVideos
}: FooterProps) => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();
    const { user, location } = useSelector(({ user, location }) => ({
        user,
        location
    }));

    const handleAddImage = () => {
        if (!canAddMoreImages) {
            Alert.alert('Limite de arquivos atingido!');
            return;
        }

        onAddAttach('photo');
    };

    const handleAddVideo = () => {
        if (!canAddMoreVideos) {
            Alert.alert('Limite de vídeos atingido!');
            return;
        }

        onAddAttach('video');
    };

    return (
        <Container
            color="#FFF"
            dir="row"
            width="100%"
            height="60px"
            align="center"
            pad="0 24px"
        >
            {!!(
                !type.type &&
                userCategory(user) &&
                location.from === 'geo' &&
                !params.edit
            ) && (
                <Container
                    dir="row"
                    onPress={() =>
                        navigation.navigate('CreatePost', {
                            type: 'check'
                        })
                    }
                    align="center"
                >
                    <Pin color="#5C7BFF" />
                    <Text size={14} color="#323232">
                        Fazer Check-in
                    </Text>
                </Container>
            )}
            {!params.edit && (
                <Container
                    dir="row"
                    align="center"
                    width="35%"
                    justify="space-between"
                    marg="0 0 0 auto"
                >
                    <Press pad="0 7px 0 0" onPress={handleModal}>
                        <Picture />
                    </Press>
                    <Press pad="0 5px 0 0" onPress={handleAddVideo}>
                        <Camera type="film" />
                    </Press>
                    <Press
                        testID="test-icon-camera"
                        pad="0 5px 0 0"
                        onPress={handleAddImage}
                    >
                        <Camera />
                    </Press>
                </Container>
            )}
        </Container>
    );
};

export default CreatePostFooter;
