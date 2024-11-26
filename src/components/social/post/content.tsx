import React, { useMemo, useState } from 'react';
import {
    Dimensions,
    Alert,
    ImageBackground,
    Modal,
    Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ImageGrid from '@components/social/post//images-grid';
import { useSelector } from '@context/index';
import VideoPlayer from '@components/video-player';

import { Float, Container as Line, Press, Text } from '@styles/index';
import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon';

import { IHelp } from '@ts/interfaces/help';

const { width } = Dimensions.get('window');

interface PostContentProps {
    postId: string;
    description: string;
    pictures: Array<{ Url: string }>;
    videos: Array<{ Url: string }>;
    full: boolean;
    distance: number;
    help: IHelp;
    address: string;
    checkin: boolean;
    onPressImages?: () => void;
    shouldLoad: boolean;
    thumbnail?: string;
    inView: boolean;
    index?: number;
}

const PostContent = ({
    description,
    pictures,
    videos,
    postId,
    full,
    help,
    address,
    checkin,
    onPressImages = null,
    shouldLoad,
    thumbnail,
    index
}: PostContentProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const [showVideo, setShowVideo] = useState(false);

    const showMedia = useMemo(() => {
        if (!pictures.length && !videos.length) return false;

        if (help && !full) return false;

        return true;
    }, [full, help, pictures.length, videos.length]);

    const handleNavigateToPost = () => {
        if (!isConnected) {
            Alert.alert(
                'Verifique sua conexão',
                'Sinal de internet fraco ou sem conexão.'
            );
            return;
        }

        navigation.navigate('Post', { post: postId });
    };

    return (
        <Line
            dir="row"
            marg={`0 0 ${checkin || help || showMedia ? '10px' : 0} 0`}
            width="100%"
            justify="space-between"
        >
            <Line
                testID={`test-open-post-${index}`}
                width="100%"
                onPress={
                    !full
                        ? handleNavigateToPost
                        : pictures.length > 0
                          ? onPressImages
                          : null
                }
                position="relative"
            >
                <Line marg="0 20px">
                    {!!help && (
                        <>
                            <Text color={'#323232'} size={14} line={22}>
                                Olá, busco por{' '}
                                <Text color={'#FF6F5C'} size={14} line={22}>
                                    {help.Category?.Name || help?.Label}
                                </Text>
                            </Text>
                            <Text size={14} line={22}>
                                Em{' '}
                                <Text size={14} color="#5C7BFF">
                                    {address}
                                </Text>
                            </Text>
                            {(description || showMedia) && !full && (
                                <Text color={mainColor}> ...ver mais</Text>
                            )}
                        </>
                    )}
                    {!!checkin && (
                        <Text
                            size={14}
                            line={22}
                            marg={`0 0 ${showMedia ? '10px' : 0} 0`}
                        >
                            Agora em{' '}
                            <Text size={14} line={22} color="#5C7BFF">
                                {address}
                            </Text>
                        </Text>
                    )}
                </Line>
                {showMedia && (
                    <>
                        {pictures.length ? (
                            <Line
                                width={width + 'px'}
                                marg="0 20px"
                                radius={10}
                            >
                                <ImageGrid
                                    height={350}
                                    width={width - 40}
                                    images={pictures}
                                    lazy={thumbnail}
                                    loaded={shouldLoad}
                                />
                            </Line>
                        ) : (
                            <Line
                                width={width - 40 + 'px'}
                                height="340px"
                                color="#e0e0e0"
                                justify="center"
                                align="center"
                                marg="0 20px"
                                radius={10}
                                onPress={() => setShowVideo(true)}
                            >
                                {!!thumbnail && (
                                    <ImageBackground
                                        source={{ uri: thumbnail }}
                                        style={{
                                            position: 'absolute',
                                            height: 340,
                                            width: '100%'
                                        }}
                                        blurRadius={5}
                                        borderRadius={10}
                                    />
                                )}

                                <Icon
                                    name="play"
                                    width={30}
                                    height={30}
                                    color="#fff"
                                />
                            </Line>
                        )}
                    </>
                )}
            </Line>
            <Modal
                visible={!!showVideo}
                animationType="fade"
                transparent={false}
                onRequestClose={() => {
                    setShowVideo(false);
                }}
            >
                <Line justify="center" height="100%" color="#000">
                    <Float
                        top={Platform.OS === 'ios' ? '40px' : '10px'}
                        flexDir="row"
                        justify="space-between"
                        left="0"
                        align="center"
                        width="100%"
                    >
                        <Press
                            onPress={() => {
                                setShowVideo(false);
                            }}
                        >
                            <Icon name="arrowBack" color="#fff" />
                        </Press>
                    </Float>
                    {!!showVideo && (
                        <VideoPlayer
                            thumbnail={thumbnail}
                            uri={videos[0].Url}
                        />
                    )}
                </Line>
            </Modal>
        </Line>
    );
};

export default PostContent;
