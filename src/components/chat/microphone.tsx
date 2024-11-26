import React, {
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import { Alert, Animated, PermissionsAndroid, Platform } from 'react-native';
import FileSystem from 'react-native-fs';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { captureException } from '@sentry/react-native';

import { getState } from '@hooks/context';

import { Text, Container } from '@styles/index';
import { Icon } from '@styles/icon';

import { sendMessage } from '@context/actions/chat';
import { mainColor } from '@styles/colors';
import { millisToMinutesAndSeconds } from '@utils/index';
import { ISendMessage } from '@ts/interfaces/chat';

const audioRecorderPlayer = new AudioRecorderPlayer();
let globalStatus = 'default';

interface MicrophoneProps {
    onFinishRecording: () => void;
    conversationID: string;
}

const Microphone = ({ onFinishRecording, conversationID }: MicrophoneProps) => {
    const scale = useRef(new Animated.Value(0)).current;

    const [{ ref }, dispatchCtx] = getState();

    const [timer, setTimer] = useState('00:00');
    const [timeInMiliSecs, setTimeInMiliSecs] = useState(0);
    const [uri, setUri] = useState(null);
    const [status, setStatus] = useState<
        'default' | 'recording' | 'stoped' | 'playing'
    >('default');

    const bottomText = useMemo(() => {
        switch (status) {
            case 'recording':
                return 'Toque parar de gravar';
            case 'stoped':
                return 'Toque para ouvir';
            case 'playing':
                return 'Toque para pausar';
            default:
                return 'Toque para iniciar';
        }
    }, [status]);

    const stopRecord = useCallback(async () => {
        try {
            setStatus('stoped');
            const url = await audioRecorderPlayer.stopRecorder();
            audioRecorderPlayer.removeRecordBackListener();

            setUri(url);
        } catch (err) {
            console.log('@footer, stopRecord, err = ', err);
            captureException(err);
        }
    }, []);

    const startRecord = useCallback(async () => {
        try {
            await audioRecorderPlayer.startRecorder();

            audioRecorderPlayer.addRecordBackListener((e) => {
                setTimer(millisToMinutesAndSeconds(e.currentPosition));

                setTimeInMiliSecs(e.currentPosition);

                if (e.currentPosition >= 120000) stopRecord();
            });
        } catch (err) {
            captureException(err);
        }
    }, [stopRecord]);

    const closeAudio = async () => {
        audioRecorderPlayer.stopPlayer();
        setTimer('00:00');
        setTimeInMiliSecs(0);
        setStatus('default');
    };

    const playAudio = useCallback(async () => {
        try {
            await audioRecorderPlayer.startPlayer();

            audioRecorderPlayer.addPlayBackListener((e) => {
                setTimer(millisToMinutesAndSeconds(e.currentPosition));

                setTimeInMiliSecs(e.currentPosition);

                if (e.currentPosition >= e.duration) {
                    setStatus('stoped');
                    audioRecorderPlayer.stopPlayer();
                }
            });
        } catch (err) {
            captureException(err);
        }
    }, []);

    const pauseAudio = useCallback(() => {
        audioRecorderPlayer.pausePlayer();
    }, []);

    const sendRecord = async () => {
        try {
            // don't send audio smaller than 1s
            if (timeInMiliSecs < 1000) return;

            onFinishRecording();

            const { size } = await FileSystem.stat(uri);

            const lastDotIndex = uri.lastIndexOf('.');
            const extension = uri.slice(lastDotIndex + 1);

            const message: ISendMessage = {
                ConversationID: conversationID,
                Message: 'Audio',
                File: {
                    name: `${new Date().getTime().toString()}.${extension}`,
                    uri,
                    type: 'audio/' + extension,
                    duration: timeInMiliSecs,
                    size: Number(size),
                    mtime: new Date(),
                    assetType: 'audio'
                },
                Type: 'audio',
                metadata: {
                    Duration: timeInMiliSecs,
                    Size: Number(size)
                },
                Extension: extension,
                Mime: 'audio/' + extension
            };

            if (ref) {
                message.Reference = {
                    Type: 'post',
                    ResourceID: String(ref.postId),
                    Content: ref.description
                };
                dispatchCtx({ type: 'SET_REF', data: null });
            }

            sendMessage(message);
        } catch (err) {
            console.log('@microphone, sendRecord, err = ', err);
            captureException(err);
        }
    };

    const pulseAnimate = useCallback(
        (animate) => {
            Animated.timing(scale, {
                toValue: animate ? 3 : 0,
                duration: 400,
                useNativeDriver: true
            }).start(() => {
                if (globalStatus === 'recording') pulseAnimate(!animate);
            });
        },
        [scale]
    );

    const pressButton = useCallback(() => {
        switch (status) {
            case 'recording':
                globalStatus = 'stoped';
                stopRecord();
                break;
            case 'stoped':
                setStatus('playing');
                playAudio();
                break;
            case 'playing':
                setStatus('stoped');
                pauseAudio();
                break;
            default:
                globalStatus = 'recording';
                setStatus('recording');
                startRecord();
                pulseAnimate(true);
        }
    }, [pauseAudio, playAudio, pulseAnimate, startRecord, status, stopRecord]);

    const getPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                let perms;

                if (Number(Platform.Version) >= 33) {
                    perms = ['READ_MEDIA_IMAGES', 'RECORD_AUDIO'];
                } else {
                    perms = [
                        'WRITE_EXTERNAL_STORAGE',
                        'READ_EXTERNAL_STORAGE',
                        'RECORD_AUDIO'
                    ];
                }

                const grants = await PermissionsAndroid.requestMultiple(
                    perms.map((p) => PermissionsAndroid.PERMISSIONS[p])
                );

                if (
                    perms.every(
                        (p) =>
                            grants[`android.permission.${p}`] ===
                            PermissionsAndroid.RESULTS.GRANTED
                    )
                ) {
                    //console.log('Permissions granted');
                } else {
                    Alert.alert(
                        'Permissão necessária',
                        'O app não tem permissão para acessar este recurso.'
                    );
                    throw 'not granted';
                }
            } catch (err) {
                console.warn(err);
                onFinishRecording();
            }
        }
    };

    useLayoutEffect(() => {
        getPermissions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container
            color="#fafafa"
            pad="18px 0 18px 0"
            justify="center"
            align="center"
            width="100%"
        >
            <Container
                width="100%"
                dir="row"
                justify="space-around"
                align="flex-end"
            >
                <Container opacity={status === 'recording' ? '0' : '1'}>
                    <Container
                        align="center"
                        justify="center"
                        width="50px"
                        onPress={() => {
                            switch (status) {
                                case 'default':
                                    onFinishRecording();
                                    break;
                                case 'stoped':
                                case 'playing':
                                    closeAudio();
                                    break;
                            }
                        }}
                    >
                        <Container
                            align="center"
                            justify="center"
                            width="40px"
                            height="40px"
                            color="#C3C3C3"
                            pad="0"
                            radius={40}
                        >
                            <Icon
                                name="close"
                                color="#fff"
                                width={20}
                                height={20}
                            />
                        </Container>
                        <Text size={12}>
                            {status === 'default' ? 'Cancelar' : 'Apagar'}
                        </Text>
                    </Container>
                </Container>

                <Text marg="0 0 20px 0" size={12}>
                    {timer}
                </Text>
                <Container
                    opacity={
                        status === 'stoped' || status === 'playing' ? '1' : '0'
                    }
                >
                    <Container
                        align="center"
                        justify="center"
                        width="50px"
                        onPress={() => {
                            if (status === 'stoped' || status === 'playing') {
                                sendRecord();
                                closeAudio();
                            }
                        }}
                    >
                        <Container
                            testID="test-audio-send"
                            align="center"
                            justify="center"
                            width="40px"
                            height="40px"
                            color={mainColor}
                            pad="0"
                            radius={40}
                        >
                            <Icon
                                name="sendMessage"
                                color="#fff"
                                width={30}
                                height={30}
                            />
                        </Container>
                        <Text size={12}>Enviar</Text>
                    </Container>
                </Container>
            </Container>
            <Container
                marg="-15px 0 0 0"
                width="100%"
                justify="center"
                align="center"
            >
                <Container
                    testID="test-audio-button"
                    dir="row"
                    width="80px"
                    height="80px"
                    color={mainColor}
                    radius={80}
                    align="center"
                    justify="center"
                    onPress={pressButton}
                >
                    {status === 'default' && (
                        <Container
                            color="#ffb7ae"
                            width="30px"
                            height="30px"
                            radius={30}
                        />
                    )}
                    {status === 'stoped' && (
                        <Icon
                            name="playOut"
                            color="#ffffff80"
                            width={30}
                            height={30}
                        />
                    )}
                    {status === 'recording' && (
                        <>
                            <Animated.View
                                style={[
                                    {
                                        position: 'absolute',
                                        top: 30,
                                        left: 30,
                                        width: 20,
                                        height: 20,
                                        borderRadius: 100,
                                        backgroundColor: '#ffffff30'
                                    },
                                    { transform: [{ scale }] }
                                ]}
                            />
                            <Container
                                color="#ffb7ae"
                                width="30px"
                                height="30px"
                                zIndex={1}
                            />
                        </>
                    )}
                    {status === 'playing' && (
                        <Icon
                            name="pause"
                            color="#ffffff80"
                            width={30}
                            height={30}
                        />
                    )}
                </Container>
            </Container>
            <Text size={12}>{bottomText}</Text>
        </Container>
    );
};

export default Microphone;
