import React, { useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Conversation from '@components/chat/conversation';
import Empty from '@components/empty-data/chat';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { NavHeader, SafeView, Loading, Container } from '@styles/index';

import { checkConnect } from '@utils/index';

const AArchivedMessages = () => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({
        info,
        user
    }));

    const {
        data: { list: chatList, pagination },
        addPage,
        fetching,
        loading
    } = useRequest({
        name: 'conversationsArchived',
        size: 10
    });

    const conversations = useMemo(() => {
        return [
            ...chatList.sort(
                (a, b) =>
                    Number(new Date(b.CreatedAt)) -
                    Number(new Date(a.CreatedAt))
            )
            // .filter((c) => !!c.LastMessage)
        ].sort(
            (a, b) =>
                Number(new Date(a.CreatedAt)) - Number(new Date(b.CreatedAt))
        );
    }, [chatList]);

    const getInfo = useCallback(
        (item) => {
            const userF = item.Participants.find((p) => p._id !== user._id);

            return {
                name: userF.Name,
                category: userF.MainCategory ? userF.MainCategory.Name : null,
                photo: userF.Photo,
                username: userF._id,
                user: userF
            };
        },
        [user]
    );

    const renderItem = useCallback(({ item }) => {
        return (
            <Conversation
                testID={`test-${item._id}`}
                id={item._id}
                arquived={true}
                {...getInfo(item)}
                isHelp={false}
                openChat={checkConnect.bind({}, isConnected, () =>
                    navigation.navigate('Conversation', {
                        id: item._id,
                        user: getInfo(item).user,
                        archived: true
                    })
                )}
                date={item.CreatedAt}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    const onEndReached = async () => {
        if (pagination && pagination.next && !loading && !fetching) {
            addPage();
            return;
        }
    };

    return (
        <SafeView>
            <NavHeader title="Mensagens arquivadas" />
            {loading ? (
                <Container width="100%" marg="50% 0">
                    <Loading overlay={false} />
                </Container>
            ) : (
                <FlatList
                    style={{
                        flex: 1,
                        paddingTop: 25
                    }}
                    data={conversations}
                    ListEmptyComponent={<Empty archived={true} />}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    contentContainerStyle={{ paddingBottom: 30 }}
                    onEndReached={onEndReached}
                />
            )}
        </SafeView>
    );
};

export default AArchivedMessages;
