import React, { useState, useCallback, useEffect } from 'react';
import { RefreshControl } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import BigList from 'react-native-big-list';

import Empty from '@components/empty-data/notification';
import Notification from '@components/notification/notification';
import notificationSkeleton from '@components/notification/notification-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import {
    SafeView,
    NavHeader,
    Press,
    Text,
    BorderVertical,
    Loading
} from '@styles/index';
import { mainColor } from '@styles/colors';

import { amountTextLines, checkConnect, timeParse } from '@utils/index';
import { mutateApi } from '@services/mutate-api';
import { readNotification } from '@context/actions/notification';
import { INotification } from '@ts/interfaces/notifications';

const ANotifications = () => {
    const { navigate } = useNavigation();
    const isFocused = useIsFocused();
    const {
        info: { isConnected },
        unreadNotifications,
        user
    } = useSelector(({ info, unreadNotifications, user }) => ({
        info,
        unreadNotifications,
        user
    }));

    const [refreshing, setRefreshing] = useState(false);

    const { data, addPage, fetching, loading, mutate } = useRequest({
        name: user ? 'notifications' : null
    });

    const { list: notifications, pagination } = data;

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);

            await mutate();

            setRefreshing(false);
        } catch (err) {
            console.log('@notifications, onRefresh, err = ', err);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing]);

    const onPressNotification = async (notification: INotification) => {
        if (!notification?.Viewed) {
            readNotification(notification._id);

            if (unreadNotifications?.mutate)
                unreadNotifications.mutate(
                    () => [unreadNotifications.list[0] - 1],
                    false
                );
        }

        switch (notification.Type) {
            case 'saw_profile':
            case 'like_profile':
            case 'follow_profile':
                navigate('Profile', {
                    user: notification.Other._id
                });
                break;

            case 'rating_client':
                navigate('WriteClientReview', {
                    ProfileID: notification.Other._id,
                    helpID: notification.HelpID,
                    RatingID: notification.RatingID
                        ? notification.RatingID
                        : null
                });
                break;

            case 'rating_professional':
                navigate('WriteReview', {
                    ProfileID: notification.Other._id,
                    helpID: notification.HelpID,
                    RatingID: notification.RatingID
                        ? notification.RatingID
                        : null
                });
                break;
            case 'like_post':
            case 'mark_post':
            case 'mark_comment':
            case 'post_help':
            case 'comment_post':
                navigate('Post', {
                    post: notification.Post
                });

                break;
            case 'proposal_rejected':
            case 'proposal_accepted':
                if (notification.HelpID)
                    navigate('Proposal', {
                        from: 'SentProposal',
                        helpID: notification.HelpID,
                        proposalID: notification.ProposalID
                    });
                break;
            case 'individual_proposal_accepted':
                if (notification.HelpID)
                    navigate('Proposal', {
                        from: 'ReceivedProposal',
                        helpID: notification.HelpID
                    });
                break;
            case 'cani_message':
                navigate('Notification');
                break;
            default:
                null;
        }
    };

    const handleHeight = useCallback(
        (_, index) => {
            if (!notifications.length) return;

            return (
                60 +
                amountTextLines({
                    text:
                        notifications[index || 0].Other.Name +
                        notifications[index || 0].Text,
                    extraSpace: 100
                }) *
                    16
            );
        },
        [notifications]
    );

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Notification
                    testID={`test-index-${index}`}
                    userName={item.Other.Name}
                    notificationText={item.Text}
                    timeFromCreation={timeParse(item.CreatedAt).toString()}
                    photo={item.Other.Photo}
                    showUnread={!item?.Viewed}
                    onPressNotification={checkConnect.bind(
                        {},
                        isConnected,
                        () => onPressNotification(item)
                    )}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    const loadMoreNotifications = useCallback(async () => {
        if (pagination?.next && !loading && !fetching) {
            addPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pagination?.next, loading, fetching]);

    if (!isFocused) return <></>;

    const compareNotifications = (n1, n2) => {
        if (new Date(n1?.CreatedAt) < new Date(n2?.CreatedAt)) {
            return 1;
        }
        return -1;
    };

    const notificationsToShow = notifications
        ?.map((notification) => ({
            ...notification,
            Other: notification.Other
        }))
        ?.sort(compareNotifications);

    if (!notifications.length && loading)
        return (
            <SafeView>
                <Skeleton layout={notificationSkeleton} />
            </SafeView>
        );

    return (
        <SafeView>
            <BorderVertical type="bottom">
                <NavHeader
                    title="Notificações"
                    bg="#FAFAFA"
                    pad="0 60px 0 10px"
                    right={
                        notifications.length > 1 && (
                            <Press
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    async () => {
                                        mutateApi({
                                            name: 'notificationsReadAll'
                                        });

                                        mutate(
                                            () =>
                                                notifications.map((n) => ({
                                                    ...n,
                                                    Viewed: true
                                                })),
                                            false
                                        );
                                        unreadNotifications.mutate(
                                            () => [0],
                                            false
                                        );
                                    }
                                )}
                            >
                                <Text
                                    color="#323232"
                                    size={14}
                                    decoration="underline"
                                >
                                    Marcar como lidas
                                </Text>
                            </Press>
                        )
                    }
                    big={true}
                />
            </BorderVertical>

            <BigList
                testID="biglist"
                keyExtractor={keyExtractor}
                itemHeight={handleHeight}
                data={notificationsToShow}
                renderItem={renderItem}
                onEndReachedThreshold={0.1}
                onEndReached={loadMoreNotifications}
                renderFooter={() => fetching && <Loading overlay={false} />}
                renderEmpty={() => <Empty />}
                renderHeader={null}
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </SafeView>
    );
};

export default ANotifications;
