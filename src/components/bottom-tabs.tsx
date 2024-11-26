import React, { useState, useEffect, useCallback, cloneElement } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ASocial from '@pages/social/social';
import AConversations from '@pages/chat/conversations';
import Help from '@pages/help';
import AAccount from '@pages/user/account';
import AHome from '@pages/home';
import ProfessionalSearchResult from '@pages/search/professional-search-result';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { Container } from '@styles/layout';
import { Icon } from '@styles/icon';
import { socialDispatch } from '@context/dispatches';

const Tab = createBottomTabNavigator();

interface TabBarIconProps {
    route: {
        name: string;
    };
    tintColor: {
        focused: boolean;
    };
    hasChat: boolean;
    hasNotification: boolean;
    hasPost: boolean;
    hasHelp: boolean;
    user: any;
}

let page = 'home';

const TabBarIcon: React.FC<TabBarIconProps> = ({
    route,
    tintColor,
    hasChat,
    hasNotification,
    hasPost,
    hasHelp
}) => {
    const navigation = useNavigation();

    const { postsList } = useSelector(({ postsList, user }) => ({
        postsList,
        user
    }));

    const [Button, setButton] = useState<any>(<Icon name="search" />);
    const [showNotification, setShowNotifications] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);

    useEffect(() => {
        switch (route.name) {
            case 'Social':
                setButton(<Icon name="social" />);
                setShowNotifications(hasPost);
                break;

            case 'Conversations':
                setButton(<Icon name="chat" />);
                setShowNotifications(hasChat);
                break;

            case 'Account':
                setButton(<Icon name="profileIcon" />);
                setShowNotifications(hasNotification);
                break;

            case 'Helps':
                setButton(<Icon name="helpTab" />);
                setShowNotifications(hasHelp);
                break;

            default:
                setButton(<Icon name="search" />);
        }
    }, [hasChat, hasNotification, hasPost, route.name, hasHelp]);

    //TODO check why navigation it's been called multipleTimes
    const handleSwitchPage = async () => {
        switch (route.name) {
            case 'HomeStack':
                navigation.navigate('HomeStack');
                break;
            case 'Social':
                if (page === route.name && postsList?.mutate && !loadingPosts) {
                    setLoadingPosts(true);
                    socialDispatch({ toTop: true });
                    await postsList?.mutate();
                    setLoadingPosts(false);
                }
                navigation.navigate('Social');
                break;
            case 'Conversations':
                navigation.navigate('Conversations');
                break;
            case 'Account':
                navigation.navigate('Account');
                break;
            case 'Helps':
                navigation.navigate('Helps');
                break;

            default:
                return;
        }

        page = route.name;
    };

    if (route.name === 'SearchResult') return <></>;

    return (
        <Container align="center">
            <Container
                color={showNotification ? '#FF6F5C' : 'transparent'}
                height="10px"
                width="10px"
                radius={100}
                style={{
                    borderColor: '#FFF',
                    borderWidth: 1
                }}
            />

            <TouchableOpacity
                testID={`test-icon-${route.name}`}
                onPress={handleSwitchPage}
                accessible={true}
                accessibilityLabel="Navigation button"
            >
                {cloneElement(Button, {
                    color: tintColor.focused ? '#FF6F5C' : '#B9B9B9'
                })}
            </TouchableOpacity>
        </Container>
    );
};

const HomeStack = createStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen name="Home" component={AHome} />
            <HomeStack.Screen
                name="SearchResult"
                component={ProfessionalSearchResult}
            />
        </HomeStack.Navigator>
    );
}

const Tabs = () => {
    const { user, social } = useSelector(({ social, user }) => ({
        social,
        user
    }));

    const {
        data: {
            list: [hasUnreadMessages]
        },
        fetched
    } = useRequest({
        name: user ? 'hasUnreadMessages' : null
    });

    const {
        data: {
            list: [hasNotifications]
        },
        fetched: notifFetched
    } = useRequest({
        name: user && fetched ? 'unreadNotifications' : null
    });

    const {
        data: {
            list: [helpsUnread]
        },
        fetched: unredFetched
    } = useRequest({
        name: user && notifFetched ? 'hasUnreadHelps' : null
    });

    const {
        data: {
            list: [hasUnreadProposals]
        },
        fetched: proposalFetched
    } = useRequest({
        name: user && unredFetched ? 'hasUnreadProposals' : null
    });

    const {
        data: {
            list: [helpsFinishedUnread]
        }
    } = useRequest({
        name: user && proposalFetched ? 'hasUnreadFinished' : null
    });

    const tab = useCallback(
        (route, tintColor) => {
            return (
                <TabBarIcon
                    tintColor={tintColor}
                    hasChat={hasUnreadMessages}
                    hasNotification={hasNotifications}
                    hasPost={social.hasNewPost}
                    hasHelp={
                        hasUnreadProposals || helpsFinishedUnread || helpsUnread
                    }
                    route={route}
                    user={user}
                />
            );
        },
        [
            hasUnreadMessages,
            hasNotifications,
            social.hasNewPost,
            hasUnreadProposals,
            helpsFinishedUnread,
            helpsUnread,
            user
        ]
    );

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: tab.bind({}, route),
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: Platform.OS === 'android' ? 60 : 80
                }
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen
                name="Conversations"
                component={AConversations}
                initialParams={{
                    conversation: null
                }}
            />
            <Tab.Screen name="Social" component={ASocial} />
            <Tab.Screen name="Helps" component={Help} />
            <Tab.Screen name="Account" component={AAccount} />
        </Tab.Navigator>
    );
};

export default Tabs;
