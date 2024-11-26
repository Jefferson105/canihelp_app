import React, { useEffect, useState } from 'react';
import { OneSignal, LogLevel } from 'react-native-onesignal';
import SplashScreen from 'react-native-splash-screen';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { readNotification } from '@context/actions/notification';
import { updateUser } from '@context/actions/user';
import { addMessage } from '@context/actions/chat';
import { TNotificationTypes } from '@ts/types/notifications';

interface IPushPayload {
    id?: string;
    type?: string;
    notificationID?: string;
}
const push: IPushPayload | null = null;

OneSignal.Debug.setLogLevel(LogLevel.Verbose);

const appId = 'ac0253b6-94e0-41e4-8a87-38a13474cfbe';
OneSignal.initialize(appId);

const Push = () => {
    const navigation = useNavigation();

    const {
        info: { isConnected, checkingAuth },
        user,
        createHelp
    } = useSelector(({ info, user, createHelp }) => ({
        info,
        user,
        createHelp
    }));

    const [isAuthenticated] = useState(!!user);

    useEffect(() => {
        if (isAuthenticated) {
            (async () => {
                try {
                    const hasPerm =
                        await OneSignal.Notifications.getPermissionAsync();

                    if (!hasPerm) {
                        await OneSignal.Notifications.requestPermission(true);
                    }

                    const [pushToken, pushId] = await Promise.all([
                        OneSignal.User.pushSubscription.getTokenAsync(),
                        OneSignal.User.pushSubscription.getIdAsync()
                    ]);

                    const currentToken = user?.PushToken;

                    if (
                        currentToken?.Token !== pushToken ||
                        currentToken?.User !== pushId
                    ) {
                        updateUser(
                            {
                                PushToken: {
                                    Token: pushToken,
                                    User: pushId
                                }
                            },
                            false
                        );
                    }
                } catch (err) {
                    console.log('@home, err on getDeviceState = ', err);
                }
            })();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    const handleSwitchNavigation = async (
        type: TNotificationTypes,
        id: string
        // notificationID: string
    ) => {
        switch (type) {
            case 'chat':
                navigation.navigate('Conversation', {
                    id,
                    archived: false
                });
                break;
            case 'help':
                navigation.navigate('Proposal', {
                    from: 'Help',
                    helpID: id
                });
                break;
            case 'help_proposal':
                navigation.navigate('Proposal', {
                    from: 'Help',
                    helpID: id[0],
                    proposalID: id[1]
                });
                break;
            case 'like_post':
            case 'mark_post':
            case 'mark_comment':
            case 'post_help':
                navigation.navigate('Post', {
                    post: id
                });
                break;
            case 'comment_post':
                navigation.navigate('Post', {
                    post: id
                });
                break;
            case 'saw_profile':
            case 'like_profile':
            case 'follow_profile':
                navigation.navigate('Profile', {
                    user: id
                });
                break;
            /*  case 'proposal_accepted':
                navigation.navigate('HelpReceived', {
                    HelpID: id
                });
                break;*/
            case 'rating_client':
                navigation.navigate('Notifications');
                break;
            case 'rating_professional':
                navigation.navigate('Notifications');
                break;
            case 'individual_proposal_accepted':
            case 'proposal':
                navigation.navigate('Proposal', {
                    from: 'ReceivedProposal',
                    helpID: id
                });
                break;
            default:
                navigation.navigate('Notifications');
        }
    };

    useEffect(() => {
        if (push && isConnected) {
            // getNotificationTypeRoute
            const { id, type, notificationID }: IPushPayload = push;

            if (notificationID) {
                readNotification(notificationID);
            }

            setTimeout(() => {
                handleSwitchNavigation(
                    type as TNotificationTypes,
                    id
                    //notificationID
                );
            }, 100);
        } else {
            if (!createHelp && !checkingAuth) SplashScreen.hide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isConnected, checkingAuth]);

    useEffect(() => {
        OneSignal.Notifications.addEventListener('click', (ev) => {
            const data: {
                id?: string;
                type?: TNotificationTypes;
                extra?: Record<string, unknown>;
            } = ev.notification.additionalData;

            if (data?.type === 'chat' && data?.extra?._id) {
                addMessage(data.extra);
            }

            console.log('Data', data);

            handleSwitchNavigation(data.type, data.id);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <></>;
};

export default Push;
