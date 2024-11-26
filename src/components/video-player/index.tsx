import React, { useEffect, useRef, useState, memo } from 'react';
import {
    ActivityIndicator,
    Animated,
    Dimensions,
    Platform
} from 'react-native';
import Video from 'react-native-video';
import { useIsFocused } from '@react-navigation/native';

import { Container, Float, Press, Text } from '@styles/index';
import { Close, Pause, Play } from '@styles/icons';
import { millisToMinutesAndSeconds } from '@utils/index';
import { mainColor } from '@styles/colors';

const { width } = Dimensions.get('window');
const sliderWidth = width - 20;

interface VideoPlayerProps {
    uri: string;
    removeVideo?: () => void;
    thumbnail?: string;
    duration?: number;
    inView?: boolean;
}

let showControlTimer = null;

const VideoPlayer = ({
    uri,
    removeVideo,
    inView,
    thumbnail
}: VideoPlayerProps) => {
    const isFocused = useIsFocused();

    const playerRef = useRef(null);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const [isVideoLoading, setIsVideoLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [totalTime, setTotalTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [started, setStarted] = useState(false);

    const onLoad = (load) => {
        setTotalTime(load.duration);
        setIsVideoLoading(false);
    };

    const onSelect = async (value) => {
        playerRef.current.seek(value);
        setCurrentTime(value);
    };

    const stopPlayer = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        // IOS bug react-native-video
        if (Platform.OS === 'ios') {
            setTimeout(() => {
                playerRef?.current?.seek(0);
            }, 50);
        } else {
            playerRef?.current?.seek(0);
        }
    };

    const onShowControls = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start();

        clearInterval(showControlTimer);

        showControlTimer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
            }).start();
        }, 3000);
    };

    const pausePlayer = async () => {
        setStarted(true);
        onShowControls();
        setIsPlaying(!isPlaying);
    };

    useEffect(() => {
        if (isVideoLoading || !playerRef.current) return;

        if (!inView) {
            setIsPlaying(false);
        }
    }, [inView, isVideoLoading]);

    useEffect(() => {
        if (!isFocused && playerRef.current) {
            setIsPlaying(false);
        }
    }, [isFocused]);

    return (
        <Container
            align="center"
            justify="center"
            height="340px"
            width="100%"
            activeOpacity={1}
            onPress={onShowControls}
        >
            {removeVideo && (
                <Float
                    top="15px"
                    right="15px"
                    bg="rgba(52, 52, 52, 0.8)"
                    radius={999}
                    pad="10px"
                >
                    <Press onPress={() => removeVideo()}>
                        <Close color="#e7e7e7" height={20} width={20} />
                    </Press>
                </Float>
            )}
            {(isVideoLoading || !started) && (
                <Container
                    color="#4948487f"
                    width="60px"
                    height="60px"
                    justify="center"
                    align="center"
                    radius={60}
                    zIndex={1}
                    pad={`0 0 0 ${isVideoLoading ? '' : '5px'}`}
                    onPress={() => !isVideoLoading && pausePlayer()}
                >
                    {isVideoLoading ? (
                        <ActivityIndicator size="large" color="#fff" />
                    ) : (
                        <Play color="#fff" width={25} height={25} />
                    )}
                </Container>
            )}

            <Video
                source={{ uri }}
                ref={playerRef}
                style={{
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    borderRadius: 10
                }}
                poster={thumbnail}
                posterResizeMode="cover"
                paused={!isPlaying}
                resizeMode="cover"
                controls={false}
                onProgress={({ currentTime: curTime }) => {
                    setCurrentTime(curTime);
                }}
                onLoad={onLoad}
                onEnd={stopPlayer}
                onError={(err) => console.log('error loading video', err, uri)}
            />

            <Animated.View
                style={{
                    position: 'absolute',
                    bottom: -10,
                    left: 0,
                    width: '100%',
                    opacity: fadeAnim
                }}
            >
                <Container
                    align="center"
                    pad="20px 0"
                    color="#00000090"
                    width="100%"
                >
                    <Container width="100%" pad="0 10px">
                        <Container
                            height="5px"
                            width="100%"
                            color="#ddd"
                            radius={2}
                            onPress={({ nativeEvent }) => {
                                const percentTouch =
                                    (nativeEvent.locationX / sliderWidth) * 100;

                                onSelect(totalTime * (percentTouch / 100));
                            }}
                        >
                            <Container
                                height="100%"
                                radius={2}
                                width={(currentTime / totalTime) * 100 + '%'}
                                color={mainColor}
                            />
                        </Container>
                        <Container
                            width="100%"
                            dir="row"
                            justify="space-between"
                        >
                            <Text color="#fff" size={12}>
                                {millisToMinutesAndSeconds(currentTime * 1000)}
                            </Text>
                            <Text color="#fff" size={12}>
                                {millisToMinutesAndSeconds(totalTime * 1000)}
                            </Text>
                        </Container>
                    </Container>

                    <Container align="center" width="100%">
                        <Press onPress={pausePlayer} pad="0 0 10px 0">
                            {isPlaying ? (
                                <Pause
                                    color="#fff"
                                    width={30}
                                    height={30}
                                    circle={false}
                                />
                            ) : (
                                <Play color="#fff" width={30} height={30} />
                            )}
                        </Press>
                    </Container>
                </Container>
            </Animated.View>
        </Container>
    );
};

export default memo(VideoPlayer, (prevProps, nextProps) => {
    return prevProps.inView === nextProps.inView;
});
