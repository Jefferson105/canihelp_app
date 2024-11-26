import React, { useCallback, useState } from 'react';
import { useRoute, RouteProp } from '@react-navigation/native';

import Empty from '@components/empty-data/ratings';
import RatingNavigation from '@components/profile/rating-navigation';
import { useSelector } from '@context/index';
import useRequestAndArchive from '@hooks/request-archive-combine';

import {
    SafeView,
    Container as Line,
    List,
    NavHeader,
    Loading
} from '@styles/index';

import RatingItem from '@components/ratings/item';

type RouteParams = {
    params: {
        user?: string;
    };
};

const Ratings = () => {
    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({
        info,
        user
    }));

    const [active, setActive] = useState('professional');

    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const isMe = user?._id === params.user;

    const {
        data: { list: proRatings, pagination },
        addPage,
        loading,
        fetching
    } = useRequestAndArchive({
        name: 'ratingsPro',
        params: { user: params.user },
        path: '/archive/ratings',
        //TODO: control cache
        cacheFirst: false,
        query: `&user=${user?._id}&type=professional`,
        size: 20
    });

    const {
        data: { list: clientRatings, pagination: paginationClient },
        addPage: addPageClient,
        fetching: fetchingClient,
        loading: loadingClient
    } = useRequestAndArchive({
        name: 'ratingsClient',
        params: { user: params.user },
        path: '/archive/ratings',
        //TODO: control cache
        cacheFirst: false,
        query: `&user=${user?._id}&type=client`,
        size: 20
    });

    const loadMoreRatings = useCallback(() => {
        if (active === 'Profissional') {
            if (!loading && !fetching && isConnected && pagination.next)
                addPage();
        } else {
            if (
                !loadingClient &&
                !fetchingClient &&
                isConnected &&
                paginationClient.next
            )
                addPageClient();
        }
    }, [
        active,
        addPage,
        addPageClient,
        fetching,
        fetchingClient,
        isConnected,
        loading,
        loadingClient,
        pagination.next,
        paginationClient.next
    ]);

    const renderItem = useCallback(({ item }) => {
        return <RatingItem rating={item} />;
    }, []);

    const keyExtractor = useCallback((_, i) => {
        return i.toString();
    }, []);

    return (
        <SafeView>
            <NavHeader justify="center" title="Avaliações" />
            <Line pad="0 20px 0px 20px" width="100%">
                {!![...proRatings, ...clientRatings]?.length && (
                    <Line pad="0 0 -2px 0" dir="row">
                        <RatingNavigation
                            type={'professional'}
                            text={'Profissional'}
                            active={active}
                            set={setActive}
                        />
                        <RatingNavigation
                            type={'client'}
                            text={'Cliente'}
                            active={active}
                            set={setActive}
                        />
                    </Line>
                )}
                <List
                    style={{
                        width: '100%'
                    }}
                    data={
                        active === 'professional' ? proRatings : clientRatings
                    }
                    onEndReached={loadMoreRatings}
                    onEndReachedThreshold={0.1}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                    ListEmptyComponent={!loading && <Empty isMe={isMe} />}
                    ListFooterComponent={
                        loading && (
                            <Line marg="8px 0 0 0">
                                <Loading overlay={false} />
                            </Line>
                        )
                    }
                    contentContainerStyle={{ paddingBottom: 100 }}
                />
            </Line>
        </SafeView>
    );
};

export default Ratings;
