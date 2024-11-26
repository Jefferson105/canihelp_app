import React, { useEffect, useRef, useCallback, useMemo, memo } from 'react';
import BigList from 'react-native-big-list';
import { Dimensions } from 'react-native';

import Message from '@components/chat/message';
import useRequestAndArchive from '@hooks/request-archive-combine';
import { useSelector } from '@context/index';
import { getState } from '@hooks/context';
import Skeleton from '@components/skeleton/skeleton';
import { messagesSkeleton } from './chat-skeleton';

import { Loading, Text } from '@styles/index';

import { readMessages } from '@context/actions/chat';
import { dateWithoutHour } from '@utils/date-time';
import { amountTextLines } from '@utils/index';

const SIZE_MESSAGES = 50;

const { width } = Dimensions.get('window');

const ChatMessages = ({ conversation, archived, participant }) => {
    const flatList = useRef(null);

    const {
        info: { isConnected },
        pendingMessages,
        user: authUser
    } = useSelector(({ info, pendingMessages, user }) => ({
        info,
        user,
        pendingMessages
    }));

    const [{ id, messagesLines }, dispatchCtx] = getState();

    //const [canScroll, setScroll] = useState(false);

    // generate query params for request API
    const archiveParams = useMemo(() => {
        let params = '&conversation=' + id;

        if (conversation?.MetaDate)
            params += '&date=' + conversation?.MetaDate?.Date;
        if (archived) params += '&archived=true';

        return params;
    }, [archived, conversation, id]);

    const alias = useMemo(() => {
        if (!id) return null;

        return `messages${archived ? 'Archived' : ''}${id}`;
    }, [archived, id]);

    const {
        data: { list, pagination },
        addPage,
        loading,
        fetching
    } = useRequestAndArchive({
        name: archived ? 'messagesArchived' : id ? 'messages' : null,
        cacheFirst: true,
        alias,
        params: {
            ConversationID: id
        },
        size: SIZE_MESSAGES,
        query: archiveParams,
        path: '/archive/messsages'
    });

    // mantain peding messages
    const messages = useMemo(() => {
        let pendings = pendingMessages?.filter(
            (m) =>
                m.ConversationID === id &&
                !list.some(({ _id }) => _id === m._id) &&
                Number(new Date()) - Number(new Date(m.CreatedAt)) < 600000
        );

        return [...pendings, ...list]
            .sort(
                (a, b) =>
                    Number(new Date(b.CreatedAt)) -
                    Number(new Date(a.CreatedAt))
            )
            .filter((m) => !!m);
    }, [pendingMessages, list, id]);

    const handleViewableItemsChanged = (info) => {
        const idsInView = info.viewableItems
            .filter(
                ({ item }) => item.Type === 'image' || item.Type === 'audio'
            )
            .map(({ item }) => item._id);

        if (idsInView.length)
            dispatchCtx({
                type: 'SET_VIEWABLES',
                data: idsInView
            });
    };

    const loadMore = useCallback(async () => {
        try {
            if (!loading && !fetching && isConnected && pagination.next)
                addPage();
        } catch (err) {
            console.log('@conversation, loadMore, err = ', err);
        }
    }, [addPage, fetching, isConnected, loading, pagination]);

    const messageSpace = useCallback(
        (message) => {
            const itemPad = 10;

            const computedLines = messagesLines[message._id];

            const lines =
                typeof computedLines === 'number'
                    ? computedLines
                    : amountTextLines({
                          text: message.Message,
                          extraSpace: width * 0.2 + itemPad,
                          fontWidth: 10.5
                      });

            const discount = lines > 5 ? lines * 3 : 0;

            return (
                lines * 18 +
                itemPad +
                23 -
                (typeof computedLines === 'number' ? 0 : discount)
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Object.keys(messagesLines).length]
    );

    const handleHeight = useCallback(
        (_, index) => {
            let reference = 0;
            let dateChange = 0;

            if (!messages.length) return;

            const message = messages[index || 0];
            const nextMessage = messages[index + 1 || 1];
            const hasChangeDate =
                (nextMessage &&
                    dateWithoutHour(new Date(message.CreatedAt)) !==
                        dateWithoutHour(new Date(nextMessage.CreatedAt))) ||
                !nextMessage?.CreatedAt;

            if (hasChangeDate) dateChange = 45;
            if (message?.Reference) reference = 50;

            switch (message.Type) {
                case 'image':
                case 'video':
                    return reference + dateChange + 145;
                case 'audio':
                    return reference + dateChange + 70;
                case 'proposal':
                    return reference + dateChange + 80;
                default:
                    return messageSpace(message) + reference + dateChange;
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages?.length, messageSpace]
    );

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Message
                    _id={item._id}
                    Type={item.Type}
                    SenderID={item.Sender}
                    Participant={participant?.Name}
                    Reference={item.Reference}
                    Message={item.Message}
                    Url={item.Url}
                    Help={item.Help}
                    Status={item.Status}
                    CreatedAt={item.CreatedAt}
                    formatedTime={item.formatedTime}
                    normalTime={item.metadata?.Duration}
                    isMe={authUser?._id === item?.Sender}
                    next={
                        index === messages.length - 1
                            ? null
                            : messages[index + 1]
                    }
                    index={index}
                    thumbnail={item.SmallImage}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [messages]
    );

    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, []);

    // listening for new messages
    useEffect(() => {
        if (!messages.length || !flatList || archived) return;

        // scroll to end
        //if (canScroll && flatList.current)
        //    flatList.current.scrollToIndex({
        //        animated: true,
        //        index: 0,
        //        useNativeDriver: true
        //    });

        const lastMessage = messages[0];

        //console.log('Last received', lastMessage, authUser._id);

        // read message
        if (
            lastMessage.Sender !== authUser._id &&
            lastMessage?.Status === 'sent'
        ) {
            readMessages(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages?.length]);

    useEffect(() => {
        if (!loading) dispatchCtx({ type: 'FINISH_MESSAGES_LOADING' });
    }, [loading, dispatchCtx]);

    return (
        <BigList
            keyboardShouldPersistTaps="handled"
            removeClippedSubviews={true}
            onViewableItemsChanged={handleViewableItemsChanged}
            inverted={true}
            itemHeight={handleHeight}
            footerHeight={fetching ? 40 : 0}
            data={messages}
            renderItem={renderItem}
            batchSizeThreshold={15}
            keyExtractor={keyExtractor}
            ref={flatList}
            onScroll={({ nativeEvent }) => {
                if (!isConnected) return;

                const contentHeight =
                    nativeEvent.contentSize.height -
                    nativeEvent.layoutMeasurement.height;

                if (
                    contentHeight - nativeEvent.contentOffset.y < 10 &&
                    messages.length % 50 === 0
                ) {
                    loadMore();
                }
            }}
            renderHeader={null}
            renderFooter={() =>
                !loading && fetching ? <Loading overlay={false} /> : <></>
            }
            renderEmpty={() =>
                loading ? (
                    <Skeleton layout={messagesSkeleton} />
                ) : !isConnected ? (
                    <Text align="center">Sem conexão com a Internet</Text>
                ) : (
                    <></>
                )
            }
        />
    );
};

export default memo(ChatMessages);
