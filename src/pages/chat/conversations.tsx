import React, { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import BigList from 'react-native-big-list';

import Conversation from '@components/chat/conversation';
import Empty from '@components/empty-data/chat';
import { chatSkeleton } from '@components/chat/chat-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';
import Unlogged from '@components/empty-data/unlogged';

import {
    SafeView,
    NavHeader,
    BorderVertical,
    Loading,
    Container
} from '@styles/index';
import { mainColor } from '@styles/colors';
import { iconRegistry } from '@styles/icon';

import { pendingMessageDispatch } from '@context/dispatches';

const AMessages = () => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        user: userAuth,
        hasUnreadMessages
    } = useSelector(({ info, user, hasUnreadMessages }) => ({
        user,
        info,
        hasUnreadMessages
    }));
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: { list, pagination },
        loading,
        fetching,
        mutate,
        addPage
    } = useRequest({
        name: userAuth ? 'conversations' : null,
        size: 15
    });

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            await Promise.all([mutate(), hasUnreadMessages.mutate()]);
            setRefreshing(false);
        } catch (err) {
            console.log('@messages, onRefresh, err = ', err);
        }
    }, [hasUnreadMessages, mutate]);

    const getInfo = useCallback(
        (item) => {
            const user = item.Participants.find(
                (participant) => participant._id !== userAuth._id
            );

            let booleanOnlineValue = user?.Online;

            if (typeof booleanOnlineValue !== 'boolean') {
                booleanOnlineValue = booleanOnlineValue === 1 ? true : false;
            }

            return {
                name: user.Name,
                category: user.MainCategory
                    ? user.MainCategory.Label
                        ? user.MainCategory.Label
                        : user.MainCategory.Name
                    : null,
                photo: user.Photo,
                username: user.UserName ? user.UserName : user.Name,
                online: booleanOnlineValue
            };
        },

        [userAuth?._id]
    );

    const handleOpenChat = useCallback(
        (item) => {
            if (!isConnected) {
                Alert.alert('Verifique sua conexão');
                return;
            }

            navigation.navigate('Conversation', {
                id: String(item._id),
                archived: false
            });
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isConnected]
    );

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <Conversation
                    id={item._id}
                    unread={item.Unread}
                    lastMessage={item.LastMessage}
                    {...getInfo(item)}
                    openChat={() => handleOpenChat(item)}
                    date={item.LastMessage?.CreatedAt}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [list]
    );

    const keyExtractor = useCallback((item) => {
        return String(item._id);
    }, []);

    const onEndReached = async () => {
        if (pagination?.next && !loading && !fetching) {
            await addPage();
            return;
        }
    };

    useEffect(() => {
        pendingMessageDispatch('deleteOld');
    }, []);

    if (!userAuth) {
        return (
            <SafeView>
                <Container flex={1} align="center">
                    <BorderVertical marg="6px 24px 0 24px" type="bottom">
                        <NavHeader
                            pad="0px"
                            big={true}
                            title={'Chat'}
                            back={false}
                            bg="#FAFAFA"
                        />
                    </BorderVertical>
                    <Container flex={1} justify="center">
                        <Unlogged
                            icon={<iconRegistry.chatEmpty />}
                            title=" para ver mensagens"
                        />
                    </Container>
                </Container>
            </SafeView>
        );
    }

    if (!list.length && loading)
        return (
            <SafeView>
                <Skeleton layout={chatSkeleton} />
            </SafeView>
        );

    return (
        <SafeView>
            <BorderVertical marg="6px 24px 0 24px" type="bottom">
                <NavHeader
                    pad="0px"
                    big={true}
                    title="Chat"
                    back={false}
                    bg="#FAFAFA"
                />
            </BorderVertical>

            <BigList
                keyExtractor={keyExtractor}
                itemHeight={100}
                getItemLayout={(_, index) => ({
                    length: 100,
                    offset: 100 * index,
                    index
                })}
                data={list
                    .filter((c) => !!c?.LastMessage)
                    .sort(
                        (a, b) =>
                            new Date(b.LastMessage?.CreatedAt).valueOf() -
                            new Date(a.LastMessage?.CreatedAt).valueOf()
                    )}
                renderHeader={null}
                renderEmpty={() => (!loading ? <Empty /> : <></>)}
                renderFooter={() =>
                    fetching ? <Loading overlay={false} /> : <></>
                }
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderItem={renderItem}
                onEndReached={onEndReached}
            />
        </SafeView>
    );
};

export default AMessages;
