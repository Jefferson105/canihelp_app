import React from 'react';
import { Platform } from 'react-native';

import { Text, Container } from '@styles/index';
import { mainColor } from '@styles/colors';

import { getState } from '@hooks/context';

interface MessageProps {
    message: string;
    isMe: boolean;
    Date: JSX.Element;
    id: string;
}

const Message = ({ message, isMe, Date, id }: MessageProps) => {
    const [, dispatchCtx] = getState();

    return (
        <Container align={isMe ? 'flex-end' : 'flex-start'} width="100%">
            <Container
                maxWidth="80%"
                minWidth="50%"
                color={isMe ? mainColor : '#fff'}
                border={`1px solid ${isMe ? mainColor : '#7a7a7a20'}`}
                justify="center"
                pad="0 0 10px 0"
                bBottomL={isMe ? '15px' : '0'}
                bBottomR={!isMe ? '15px' : '0'}
                bTopL="15px"
                bTopR="15px"
            >
                <Container align="flex-start" radius={15} marg="5px 10px">
                    <Text
                        color={isMe ? '#fff' : '#4E4E4E'}
                        align="left"
                        size={15}
                        line={Platform.OS === 'ios' ? 20 : 17}
                        onTextLayout={(ev) =>
                            dispatchCtx({
                                type: 'ADD_MESSAGE_LINES',
                                data: {
                                    id,
                                    lines: ev.nativeEvent.lines.length
                                }
                            })
                        }
                    >
                        {message}
                    </Text>
                </Container>
                {Date}
            </Container>
        </Container>
    );
};

export default Message;
