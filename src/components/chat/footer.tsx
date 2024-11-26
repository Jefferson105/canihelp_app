import React, { useState, useRef } from 'react';
import { Alert, Modal, Animated, TextInput } from 'react-native';

import Microphone from '@components/chat/microphone';
import MediaPicker from '@components/media-picker/media-picker';
import PostRef from '@components/chat/post-ref';
import { useSelector } from '@context/index';
import { getState } from '@hooks/context';

import { Container, Press, Input, Float, BorderVertical } from '@styles/index';
import { Icon } from '@styles/icon';

import { sendMessage } from '@context/actions/chat';
import { checkConnect } from '@utils/index';
import { ISendMessage } from '@ts/interfaces/chat';

interface FooterChatProps {
    creator: string;
}

let lastDateSend = null;
let lastText = '';

const FooterChat = ({ creator }: FooterChatProps) => {
    const opacity = useRef(new Animated.Value(0)).current;
    const input = useRef<TextInput | null>(null);

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const [
        { recording, showPicker, ref, id, messagesFiniLoading },
        dispatchCtx
    ] = getState();

    const [text, setText] = useState('');
    const [optCam, setOptCam] = useState(false);
    const [sending, setSending] = useState(false);

    const handlePicker = (show) => {
        dispatchCtx({
            type: 'SHOW_PICKER',
            data: show
        });
    };

    const handleCloseRef = () => {
        dispatchCtx({ type: 'SET_REF', data: null });
    };

    const handleSendMessage = async () => {
        try {
            if (!text) return Alert.alert('Insira um texto');

            lastDateSend = new Date();
            lastText = text;

            setSending(true);
            setText('');

            const message: ISendMessage = {
                ConversationID: id,
                Message: text.trim(),
                Type: 'message'
            };

            if (ref) {
                message.Reference = {
                    Type: 'post',
                    ResourceID: String(ref.postId),
                    Content: ref.description
                };
                handleCloseRef();
            }

            sendMessage(message);
        } catch (err) {
            console.log('@footer, sendMessage, err = ', err);
        }
    };

    return (
        <Container
            marg="0 0 10px 0"
            style={{ borderTopColor: '#AAAAAA80', borderTopWidth: 1 }}
        >
            {ref && (
                <PostRef
                    testID={'test-unsend-ref'}
                    name={creator}
                    close={handleCloseRef}
                    text={ref.description || ''}
                    from="footer"
                />
            )}

            <Container dir="row" align="center" pad="0 5px">
                <Input
                    testID="test-send-chat"
                    background="#CACACA30"
                    top={10}
                    mBottom={false}
                    multiline={true}
                    border={false}
                    placeholder="Enviar mensagem…"
                    placeholderTextColor="#4e4e4e8f"
                    value={sending ? '' : text}
                    align="center"
                    width={null}
                    flex={1}
                    height={40}
                    maxHeight={120}
                    onChangeText={(message: string) => {
                        if (message.slice(-2) === '\n\n') return;

                        let sinceLastSend =
                            Number(new Date()) - Number(lastDateSend);

                        if (sinceLastSend > 300) {
                            setSending(false);

                            if (lastText && message.indexOf(lastText) > -1)
                                return;

                            setText(message);
                        } else {
                            setText('');
                            input.current.clear();
                        }
                    }}
                    ref={input}
                />

                {!!id && messagesFiniLoading && (
                    <>
                        {!text || sending ? (
                            <>
                                <Press
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        handlePicker.bind({}, true)
                                    )}
                                    pad="10px 9px 0 18px"
                                >
                                    <Icon
                                        name="attach"
                                        width={24}
                                        height={24}
                                    />
                                </Press>
                                <Container
                                    pad="10px 9px 0 9px"
                                    onPress={() => {
                                        Animated.timing(opacity, {
                                            toValue: optCam ? 0 : 1,
                                            duration: 300,
                                            useNativeDriver: true
                                        }).start();
                                        setOptCam(!optCam);
                                    }}
                                >
                                    {optCam && (
                                        <Animated.View
                                            style={{
                                                backgroundColor: '#fff',
                                                position: 'absolute',
                                                top: -100,
                                                borderRadius: 5,
                                                opacity
                                            }}
                                        >
                                            <Container
                                                pad="10px"
                                                onPress={checkConnect.bind(
                                                    {},
                                                    isConnected,
                                                    () => {
                                                        dispatchCtx({
                                                            type: 'SHOW_CAMERA',
                                                            data: 'photo'
                                                        });

                                                        Animated.timing(
                                                            opacity,
                                                            {
                                                                toValue: optCam
                                                                    ? 0
                                                                    : 1,
                                                                duration: 300,
                                                                useNativeDriver:
                                                                    true
                                                            }
                                                        ).start();
                                                        setOptCam(!optCam);
                                                    }
                                                )}
                                            >
                                                <Icon name="camera" />
                                            </Container>
                                            <BorderVertical type="bottom" />
                                            <Container
                                                pad="10px"
                                                onPress={checkConnect.bind(
                                                    {},
                                                    isConnected,
                                                    () => {
                                                        dispatchCtx({
                                                            type: 'SHOW_CAMERA',
                                                            data: 'video'
                                                        });

                                                        Animated.timing(
                                                            opacity,
                                                            {
                                                                toValue: optCam
                                                                    ? 0
                                                                    : 1,
                                                                duration: 300,
                                                                useNativeDriver:
                                                                    true
                                                            }
                                                        ).start();
                                                        setOptCam(!optCam);
                                                    }
                                                )}
                                            >
                                                <Icon
                                                    name="camera"
                                                    type="film"
                                                />
                                            </Container>
                                        </Animated.View>
                                    )}
                                    <Icon
                                        name="doublePic"
                                        width={24}
                                        height={24}
                                    />
                                </Container>
                                <Container
                                    testID="test-start-audio"
                                    onPress={() =>
                                        dispatchCtx({
                                            type: 'SET_RECORDING',
                                            data: true
                                        })
                                    }
                                    color="#ff69735e"
                                    align="center"
                                    justify="center"
                                    radius={40}
                                    marg="5px 2px 0 5px"
                                >
                                    <Icon
                                        name="saveAudio"
                                        width={38}
                                        height={38}
                                    />
                                </Container>
                            </>
                        ) : (
                            <Press
                                testID="test-send-message"
                                onPress={handleSendMessage}
                                pad="6px 4px 0 12px"
                            >
                                <Icon
                                    name="sendMessage"
                                    width={36}
                                    height={36}
                                />
                            </Press>
                        )}
                    </>
                )}
            </Container>
            <Modal
                visible={showPicker}
                onRequestClose={handlePicker.bind({}, false)}
                animationType="slide"
                transparent={false}
            >
                <MediaPicker
                    setCamera={() => {
                        handlePicker(false);
                        dispatchCtx({ type: 'SHOW_CAMERA', data: 'photo' });
                    }}
                    maxImages={1}
                    maxVideos={1}
                    action={(image) => {
                        dispatchCtx({
                            type: 'SET_EXPANDED_MEDIA',
                            data: {
                                type: 'image',
                                url: image[0].uri,
                                preview: true,
                                meta: image[0],
                                from: 'picker'
                            }
                        });
                    }}
                    close={handlePicker.bind({}, false)}
                    assetType={['video', 'image']}
                />
            </Modal>
            <Modal
                visible={recording}
                onRequestClose={() =>
                    dispatchCtx({ type: 'SET_RECORDING', data: false })
                }
                animationType="slide"
                transparent={true}
            >
                <Float width="100%" pad="0" bottom="0" left="0">
                    <Microphone
                        conversationID={id}
                        onFinishRecording={() =>
                            dispatchCtx({
                                type: 'SET_RECORDING',
                                data: false
                            })
                        }
                    />
                </Float>
            </Modal>
        </Container>
    );
};

export default FooterChat;
