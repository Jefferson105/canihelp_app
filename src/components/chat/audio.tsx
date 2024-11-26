import React, {
    memo,
    Reducer,
    useCallback,
    useEffect,
    useReducer,
    useRef
} from 'react';
import { useIsFocused } from '@react-navigation/native';
import Video from 'react-native-video';

import { Audio as AudioSlide } from '@styles/index';

import creatAudio, {
    SET_CURRENT_TIME,
    SET_PAUSE,
    SET_TOTAL_TIME,
    IAudioState
} from '@context/reducers/local/create-audio';
import { IUser } from '@ts/interfaces/user';
import { millisToMinutesAndSeconds } from '@utils/index';

interface AudioPlayProps {
    Url: string;
    isMe: boolean;
    formatedTime: string | undefined;
    sender?: IUser;
    normalTime?: any;
    shouldLoad: boolean;
    Date: JSX.Element;
}

let currentUrl = null;

const AudioPlay = ({
    Url,
    isMe,
    sender,
    normalTime,
    shouldLoad,
    Date
}: AudioPlayProps) => {
    const isFocused = useIsFocused();
    const video = useRef(null);

    const [state, dispatchR] = useReducer<Reducer<IAudioState, any>>(
        creatAudio,
        {
            currentTime: 0,
            totalTime: normalTime / 1000,
            pause: true,
            loading: false
        }
    );

    const { currentTime, pause, totalTime } = state;

    const onSelect = async (value) => {
        if (video?.current) {
            video.current.seek(value);
            dispatchR({
                type: SET_CURRENT_TIME,
                data: value
            });
        }
    };

    const stopPlayer = useCallback(async () => {
        if (video?.current) {
            dispatchR({ type: SET_PAUSE, data: true });
            dispatchR({
                type: SET_CURRENT_TIME,
                data: 0
            });
            //video.current.seek(0);
        }
    }, []);

    const pausePlayer = async () => {
        if (pause) {
            currentUrl = Url;
            dispatchR({ type: SET_PAUSE, data: false });
        } else {
            dispatchR({ type: SET_PAUSE, data: true });
        }
    };

    //Stop audio on leave chat
    useEffect(() => {
        if (!isFocused) {
            stopPlayer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    useEffect(() => {
        if (currentUrl !== Url && !pause) {
            stopPlayer();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUrl, pause]);

    return (
        <>
            {shouldLoad && (
                <Video
                    //audioOnly={true}
                    ref={video}
                    source={{ uri: Url }}
                    onError={(err) => console.log('@audio err', err)}
                    paused={pause}
                    onLoad={(load) =>
                        dispatchR({ type: SET_TOTAL_TIME, data: load.duration })
                    }
                    onEnd={stopPlayer}
                    onProgress={({ currentTime: curTime }) =>
                        dispatchR({
                            type: SET_CURRENT_TIME,
                            data: curTime
                        })
                    }
                    ignoreSilentSwitch="ignore"
                />
            )}
            <AudioSlide
                sender={sender}
                isMe={isMe}
                pause={pausePlayer}
                onSliderChange={onSelect}
                totalTime={totalTime || 0}
                currentTime={currentTime || 0}
                formatedTime={millisToMinutesAndSeconds(totalTime * 1000)}
                isPaused={pause}
                Date={Date}
            />
        </>
    );
};

export default memo(AudioPlay, (prevProps, nextProps) => {
    return prevProps.shouldLoad === nextProps.shouldLoad;
});
