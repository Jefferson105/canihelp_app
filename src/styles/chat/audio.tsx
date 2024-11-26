import React from 'react';
import { Dimensions } from 'react-native';

import { Container, Text, Press } from '@styles/index';
import { Icon } from '@styles/icon/';
import { mainColor } from '@styles/colors';

import { IUser } from '@ts/interfaces/user';

const { width } = Dimensions.get('window');
const sliderWidth = ((width - 40) / 2 - 52) * 0.9;

interface AudioProps {
    isMe: boolean;
    pause: () => void;
    onSliderChange: (value: number) => void;
    currentTime: number;
    formatedTime: string | undefined;
    sender?: IUser;
    isPaused: boolean;
    totalTime: number;
    Date: JSX.Element;
}

const Audio = ({
    isMe,
    pause,
    onSliderChange,
    currentTime,
    formatedTime,
    totalTime,
    isPaused,
    Date
}: AudioProps) => {
    return (
        <Container align={isMe ? 'flex-end' : 'flex-start'} width="100%">
            <Container
                width="50%"
                color={isMe ? mainColor : '#fff'}
                border={`1px solid ${isMe ? mainColor : '#7a7a7a20'}`}
                align="center"
                dir="row"
                radius={10}
                pad="5px"
            >
                <Container
                    width="40px"
                    height="40px"
                    dir="row"
                    align="center"
                    justify="center"
                    border={`1px solid ${isMe ? '#fff' : '#00000050'}`}
                    radius={40}
                >
                    <Press
                        onPress={pause}
                        pad={`0 0 0 ${isPaused ? '5px' : '0'}`}
                    >
                        {isPaused ? (
                            <Icon
                                name="play"
                                width={16}
                                height={20}
                                color={isMe ? '#fff' : undefined}
                            />
                        ) : (
                            <Icon
                                name="stop"
                                width={16}
                                height={20}
                                color={isMe ? '#fff' : undefined}
                            />
                        )}
                    </Press>
                </Container>
                <Container flex={1} marg="0 0 0 10px">
                    <Container
                        marg="10px 0 0 0"
                        width="90%"
                        height="6px"
                        color={isMe ? '#fff' : '#A7A7A740'}
                        radius={2}
                        activeOpacity={1}
                        onPress={({ nativeEvent }) => {
                            const percentTouch =
                                (nativeEvent.locationX / sliderWidth) * 100;

                            onSliderChange(totalTime * (percentTouch / 100));
                        }}
                    >
                        <Container
                            height="6px"
                            radius={2}
                            color={isMe ? '#cecece' : '#A7A7A780'}
                            width={(currentTime / totalTime) * 100 + '%'}
                            style={{
                                bottom: 0
                            }}
                        />
                    </Container>
                    <Text size={12} color={isMe ? '#fff' : '#4e4e4e'}>
                        {formatedTime}
                    </Text>
                </Container>
                {Date}
            </Container>
        </Container>
    );
};

export default Audio;
