import React, { useCallback, useEffect, useState } from 'react';
import { Modal, Platform, View, Image, StyleSheet } from 'react-native';
import ImageResizer from 'react-native-image-resizer';

import VideoPlayer from '@components/video-player';
import { getState } from '@hooks/context';

import { Float, Press } from '@styles/index';
import { Icon } from '@styles/icon';

import { sendMessage } from '@context/actions/chat';
import { IAsset } from '@services/media';
import { mainColor } from '@styles/colors';
import { ISendMessage } from '@ts/interfaces/chat';

const ExpandImageChat = () => {
    const [{ expandedMedia, ref, id }, dispatchCtx] = getState();

    const [thumb, setThumb] = useState(null);

    const handleSendMedia = async (file: IAsset) => {
        const metaUrls = await thumb;

        dispatchCtx({
            type: 'SET_EXPANDED_MEDIA',
            data: null
        });

        try {
            const message: ISendMessage = {
                ConversationID: id,
                Message: file.assetType === 'image' ? 'Imagem' : 'Video',
                File: file,
                Type: file.assetType === 'image' ? 'image' : 'video',
                Mime: file.type,
                Extension: file.type.split('/')[1]
            };

            if (file.assetType === 'video') {
                message.metadata = {
                    Duration: file.duration || 10,
                    Size: Number(file.size)
                };
            }

            if (ref) {
                message.Reference = {
                    Type: 'post',
                    ResourceID: String(ref.postId),
                    Content: ref.description
                };
                dispatchCtx({ type: 'SET_REF', data: null });
            }

            if (metaUrls) {
                message.SmallImage = metaUrls.thumb;

                if (metaUrls.url) message.File.uri = metaUrls.url;
            }

            await sendMessage(message);
        } catch (err) {
            console.log('@footer, sendImage, err = ', err);
        }
    };

    const sendImage = () => {
        handleSendMedia(
            expandedMedia.meta
                ? expandedMedia.meta
                : {
                      name: expandedMedia.url.split('/cache/')[1],
                      uri: expandedMedia.url,
                      type: 'image/png',
                      assetType: 'image',
                      mtime: new Date(),
                      size: 5000
                  }
        );
    };

    const sendVideo = () => {
        handleSendMedia({
            name: expandedMedia.url.split('/cache/')[1],
            uri: expandedMedia.url,
            type: 'video/mp4',
            duration: expandedMedia.duration ? expandedMedia.duration : 10,
            size: 550,
            assetType: 'video',
            mtime: new Date()
        });
    };

    const getFormatedUrl = useCallback(() => {
        if (expandedMedia?.url?.indexOf('ph://') === 0) {
            const id = expandedMedia.url.replace('ph://', '').split('/')[0];
            const ext = expandedMedia?.meta?.name.split('.')[1];

            return `assets-library://asset/asset.${ext}?id=${id}&ext=${ext}`;
        }

        return expandedMedia?.url;
    }, [expandedMedia]);

    useEffect(() => {
        if (expandedMedia && expandedMedia?.url?.indexOf('https://') === -1) {
            if (expandedMedia?.type === 'image') {
                setThumb(
                    new Promise(async (resolve, reject) => {
                        try {
                            const small = await ImageResizer.createResizedImage(
                                expandedMedia.url,
                                300,
                                300,
                                'JPEG',
                                15
                            );

                            resolve({
                                url: expandedMedia.url,
                                thumb: small.uri
                            });
                        } catch (err) {
                            reject(err);
                        }
                    })
                );
            }
        } else {
            setThumb(null);
        }
    }, [expandedMedia]);

    return (
        <Modal
            visible={!!expandedMedia}
            transparent={true}
            animationType="fade"
            onRequestClose={() => {
                dispatchCtx({
                    type: 'SHOW_CAMERA',
                    data: false
                });
                dispatchCtx({
                    type: 'SET_EXPANDED_MEDIA',
                    data: null
                });
            }}
        >
            <View style={styles.view}>
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
                            switch (expandedMedia.from) {
                                case 'camera':
                                    dispatchCtx({
                                        type: 'SHOW_CAMERA',
                                        data:
                                            expandedMedia.type === 'image'
                                                ? 'photo'
                                                : 'video'
                                    });
                                    break;
                                case 'picker':
                                    dispatchCtx({
                                        type: 'SHOW_PICKER',
                                        data: true
                                    });
                                    break;
                            }

                            dispatchCtx({
                                type: 'SET_EXPANDED_MEDIA',
                                data: null
                            });
                        }}
                    >
                        <Icon name="arrowBack" color="#fff" />
                    </Press>
                    <Press
                        onPress={() => {
                            dispatchCtx({
                                type: 'SHOW_CAMERA',
                                data: false
                            });
                            dispatchCtx({
                                type: 'SHOW_PICKER',
                                data: false
                            });
                            dispatchCtx({
                                type: 'SET_EXPANDED_MEDIA',
                                data: null
                            });
                        }}
                    >
                        <Icon name="close" color="#fff" />
                    </Press>
                </Float>
                {expandedMedia?.type === 'image' && (
                    <Image
                        resizeMode="contain"
                        source={{
                            uri: getFormatedUrl()
                        }}
                        style={styles.image}
                    />
                )}
                {expandedMedia?.type === 'video' && (
                    <VideoPlayer uri={getFormatedUrl()} />
                )}
                {!!expandedMedia?.preview && (
                    <Float
                        bottom={Platform.OS === 'ios' ? '40px' : '10px'}
                        right="0"
                    >
                        <Press
                            bg={mainColor}
                            width={50}
                            height={50}
                            radius={50}
                            onPress={() => {
                                if (expandedMedia?.type === 'image') {
                                    sendImage();
                                } else {
                                    sendVideo();
                                }
                            }}
                        >
                            <Icon name="sendMessage" width={36} height={36} />
                        </Press>
                    </Float>
                )}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    view: {
        backgroundColor: '#000',
        height: '100%',
        justifyContent: 'center'
    },
    image: {
        flex: 1
    }
});

export default ExpandImageChat;
