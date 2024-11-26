import React, { memo, useCallback, useMemo } from 'react';
import { ImageBackground } from 'react-native';

import AudioPlay from '@components/chat/audio';
import PostRef from '@components/chat/post-ref';
import { getState } from '@hooks/context';

import {
    Message,
    Small,
    Image,
    Container,
    ProposalMessage,
    Text as Font,
    Float
} from '@styles/index';
import { Icon } from '@styles/icon';

import { dateWithoutHour } from '@utils/date-time';
import { IUser } from '@ts/interfaces/user';
import { IMessage } from '@ts/interfaces/chat';
import { MessageStatus } from '@ts/types/chat';

interface MessageItemProps extends Partial<IMessage> {
    next: any;
    thumbnail?: string;
    inView?: boolean;
    SenderID: IUser;
    Reference?: {
        Type: string;
        ResourceID: string;
        Content: string;
    };
    Participant: string;
    normalTime: any;
    isMe: boolean;
    index: number;
}

const iconsDim = {
    height: 17,
    width: 17
};

const MessageStatusIcon: {
    [key in MessageStatus]: (color?: string) => JSX.Element;
} = {
    pending: (color) => (
        <Icon name="clock" height={15} width={15} color={color} />
    ),
    sent: (color) => (
        <Icon
            name="doubleV"
            {...iconsDim}
            color={color || '#b9b9b9'}
            singleV={true}
        />
    ),
    received: (color) => (
        <Icon name="doubleV" {...iconsDim} color={color || '#b9b9b9'} />
    ),
    read: () => <Icon name="doubleV" height={15} width={15} color="#00E584" />
};

const MessageItem = ({
    _id,
    Type,
    SenderID,
    Message: Text,
    Url = null,
    thumbnail = null,
    CreatedAt,
    Status,
    formatedTime = null,
    Reference,
    Participant,
    Help,
    normalTime,
    isMe,
    next,
    index
}: MessageItemProps) => {
    const [{ viewables }, dispatchCtx] = getState();

    const loaded = useMemo(() => {
        if (index < 9) return true;

        return viewables.indexOf(_id) > -1;
    }, [_id, index, viewables]);

    const date = useMemo(() => {
        const newDate = new Date(CreatedAt);

        const hours = newDate.getHours();
        const minutes = newDate.getMinutes();

        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
            2,
            '0'
        )}`;
    }, [CreatedAt]);

    const DateHour = useCallback(() => {
        const isOutside = Type === 'image' || Type === 'video';

        return (
            <Container align="center" marg="-5px 0 0 0" dir="row">
                {isMe && (
                    <Container marg="0px 2px 0px auto">
                        {MessageStatusIcon[Status](
                            !isOutside ? '#fff' : undefined
                        )}
                    </Container>
                )}

                <Font size={10} color={isMe && !isOutside ? '#fff' : undefined}>
                    {date}
                </Font>
            </Container>
        );
    }, [Status, date, isMe, Type]);

    const DateChange = useCallback(() => {
        const msgDate = dateWithoutHour(new Date(CreatedAt));

        // Display time for the first Message
        if (!next?.CreatedAt) {
            return (
                <Container marg="-15px 0 0 0" width="100%" align="center">
                    <Small fontStyle="italic">{msgDate}</Small>
                </Container>
            );
        } else {
            //Check if the messages are from the same day
            const nextDate = new Date(next?.CreatedAt);

            if (msgDate !== dateWithoutHour(nextDate))
                return (
                    <Container marg="-15px 0 0 0" width="100%" align="center">
                        <Small fontStyle="italic">{msgDate}</Small>
                    </Container>
                );
        }

        return <></>;
    }, [CreatedAt, next]);

    const Video = useCallback(() => {
        return (
            <Container
                onPress={() => {
                    dispatchCtx({
                        type: 'SET_EXPANDED_MEDIA',
                        data: { type: 'video', url: Url }
                    });
                }}
                width="120px"
                height="120px"
                color="#f0f0f0"
                justify="center"
                align="center"
                radius={10}
            >
                <ImageBackground
                    source={{ uri: thumbnail }}
                    style={{
                        width: 120,
                        height: 120,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    blurRadius={5}
                    borderRadius={10}
                />
                <Icon name="play" width={30} height={30} color="#fff" />
            </Container>
        );
    }, [Url, dispatchCtx, thumbnail]);

    const ImageItem = useCallback(
        () => (
            <Container
                onPress={() => {
                    dispatchCtx({
                        type: 'SET_EXPANDED_MEDIA',
                        data: { type: 'image', url: Url }
                    });
                }}
                width="120px"
                height="120px"
                color="#f0f0f0"
                justify="center"
                align="center"
                radius={10}
            >
                <ImageBackground
                    source={{ uri: thumbnail }}
                    style={{
                        width: 120,
                        height: 120,
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    blurRadius={5}
                    borderRadius={10}
                />
                {loaded && (
                    <Image
                        radius={10}
                        width={120}
                        height={120}
                        source={{ uri: Url }}
                    />
                )}
            </Container>
        ),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [loaded]
    );

    const Audio = useCallback(() => {
        return (
            <AudioPlay
                Url={Url}
                formatedTime={formatedTime}
                isMe={isMe}
                sender={SenderID}
                normalTime={normalTime}
                shouldLoad={loaded}
                Date={
                    <Float pad="0" right="7px" bottom="-5px">
                        <DateHour />
                    </Float>
                }
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded, DateHour]);

    const Proposal = useCallback(() => {
        return (
            <ProposalMessage
                HelpID={Help}
                isMe={isMe}
                Date={
                    <Float pad="0" right="7px" bottom="-5px">
                        <DateHour />
                    </Float>
                }
            />
        );
    }, [DateHour, Help, isMe]);

    const MessageText = useCallback(
        () => (
            <Message
                id={_id}
                message={Text}
                isMe={isMe}
                Date={
                    <Float pad="0" right="7px" bottom="-5px">
                        <DateHour />
                    </Float>
                }
            />
        ),
        [DateHour, Text, isMe, _id]
    );

    return (
        <Container
            flex={1}
            color="#FAFAFA"
            align={isMe ? 'flex-end' : 'flex-start'}
            marg="0 20px"
        >
            <DateChange />
            {Reference && (
                <PostRef
                    testID="test-send-ref"
                    name={isMe ? Participant : 'Você'}
                    text={Reference.Content}
                    id={Reference.ResourceID}
                    from="messages"
                />
            )}

            {Type === 'audio' && <Audio />}
            {Type === 'video' && <Video />}
            {Type === 'image' && <ImageItem />}
            {Type === 'proposal' && <Proposal />}
            {Type === 'message' && <MessageText />}

            {!!(Type === 'image' || Type === 'video') && <DateHour />}
        </Container>
    );
};

export default memo(MessageItem, () => {
    return false;
});
