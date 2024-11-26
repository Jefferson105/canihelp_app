import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { RefreshControl, FlatList, ScrollView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { useRoute, RouteProp } from '@react-navigation/native';

import Header from '@components/profile/header';
import Portfolio from '@components/profile/portfolio';
import About from '@components/profile/about';
import UserInfo from '@components/profile/user-info';
import Rating from '@components/profile/rating';
import Services from '@components/profile/services';
import Location from '@components/profile/location';
import UserPosts from '@components/profile/user-posts';
import ProfileChat from '@components/profile/chat';
import Stats from '@components/profile/user-stats';
import Badges from '@components/profile/user-badges';
import Categories from '@components/profile/categories';
import profileSkeleton from '@components/profile/profile-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import CameraApp from '@components/camera';
import useRequest from '@hooks/request';
import { useSelector } from '@context/index';

import { SafeView, Container, NavHeader } from '@styles/index';
import { mainColor } from '@styles/colors';

type RouteProps = {
    params: {
        user: string;
    };
};

const Profile = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [camera, setCamera] = useState(false);

    const [action, setAction] = useState({
        capture: () => null
    });

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const { profile } = useSelector(({ profile }) => ({ profile }));

    const profileID = profile?.list[0] ? profile?.list[0]?._id : null;

    const { loading: loadingProfile, mutate } = useRequest({
        name: 'profile',
        cacheFirst: params.user === profileID,
        params: {
            ProfileID: params.user
        }
    });

    const handleCamera = (action) => {
        setAction({ capture: action });
        setCamera(true);
    };

    const loading = useMemo(() => {
        if (loadingProfile) return true;

        return params.user !== profileID;
    }, [loadingProfile, params.user, profileID]);

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            await mutate();
        } finally {
            setRefreshing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing, params.user]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    if (loading)
        return (
            <SafeView>
                <ScrollView
                    testID="testSkeleton"
                    style={{ backgroundColor: '#FAFAFA' }}
                >
                    <NavHeader />
                    <Skeleton layout={profileSkeleton} />
                </ScrollView>
            </SafeView>
        );

    return (
        <SafeView>
            <Header />
            <FlatList
                testID="scrollView"
                data={[]}
                renderItem={null}
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    <>
                        <Portfolio handleCamera={handleCamera} />
                        <Container pad="20px">
                            <UserInfo handleCamera={handleCamera} />
                            <Categories />
                            <Badges />
                            <Stats />
                            <Location />
                            <About />
                            <Services />
                            <Rating cacheUser={params.user} />
                        </Container>
                        <UserPosts cacheUser={params.user} />
                    </>
                }
            />
            <ProfileChat />
            {camera && (
                <CameraApp
                    onClose={() => {
                        setCamera(false);
                    }}
                    onCaptureImg={action.capture}
                />
            )}
        </SafeView>
    );
};

export default Profile;
