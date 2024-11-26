import React, {
    useEffect,
    useCallback,
    useState,
    useMemo,
    useRef
} from 'react';
import { RefreshControl } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import BigList from 'react-native-big-list';

import Empty from '@components/empty-data/social';
import Post from '@components/social/post';
import Filter from '@components/shared/filter';
import { SocialListHeader } from '@components/social/list-header';
import { SocialHeader } from '@components/social/header';
import { postsSkeleton } from '@components/social/social-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { SafeView, Loading } from '@styles/index';
import { mainColor } from '@styles/colors';

import {
    googleReverseGeo,
    displayAddress,
    formatAddressGoogle,
    isValidCoord
} from '@services/location';
import { getPostHeight } from '@utils/social';
import { socialDispatch } from '@context/dispatches';

const ASocial = () => {
    const isFocused = useIsFocused();
    const listRef = useRef(null);

    const {
        location: userLocation,
        social,
        user,
        info: { isConnected }
    } = useSelector(({ location, social, user, info }) => ({
        social,
        location,
        user,
        info
    }));

    const [postsRender, setPostsRender] = useState(3);

    const { coords, loading: loadingLoc } = userLocation || {};
    const { location, category, distance, from, hasNewPost, toTop } =
        social || {};

    const socialCoords = useMemo(() => {
        if (isValidCoord(location?.latitude, location?.longitude))
            return {
                Lat: String(location?.latitude),
                Lon: String(location?.longitude),
                Category: category?._id || null,
                Distance: distance
            };

        if (isValidCoord(coords?.latitude, coords?.longitude))
            return {
                Lat: String(coords?.latitude),
                Lon: String(coords?.longitude),
                Category: category?._id || null,
                Distance: distance
            };

        return null;
    }, [category, coords, distance, location]);

    const {
        data: { list: posts, pagination },
        addPage,
        fetching,
        loading,
        mutate
    } = useRequest({
        name: socialCoords ? 'posts' : !user ? 'postsRecents' : null,
        alias: 'postsList',
        params: socialCoords,
        size: 20
    });

    const { next } = pagination || {};

    const {
        data: { list: stories },
        loading: storiesLoading
    } = useRequest({
        name: 'stories'
    });

    const [viewableItemsID, setViewableItemsID] = useState<string[]>([]);
    const [inViewID, setInviewID] = useState<string[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const isLoading = useMemo(() => {
        return !posts.length && (loading || loadingLoc) && isConnected;
    }, [isConnected, loading, loadingLoc, posts]);

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            mutate();
        } finally {
            setRefreshing(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refreshing, mutate]);

    const searchFilter = async (
        distanceQuery,
        latitude,
        longitude,
        _,
        __,
        changed
    ) => {
        socialDispatch({ filter: false });

        if (
            latitude !== location?.latitude ||
            longitude !== location?.longitude ||
            distanceQuery !== distance ||
            changed
        ) {
            try {
                const filterLoc: any = { latitude, longitude };

                const { results } = await googleReverseGeo(filterLoc);

                if (results.length) {
                    filterLoc.address = formatAddressGoogle(results[0].ponents);
                    filterLoc.displayName = displayAddress(filterLoc.address);
                } else {
                    filterLoc.displayName = 'Indefinido';
                }

                socialDispatch({
                    location: filterLoc,
                    distance: distanceQuery,
                    from:
                        latitude !== location?.latitude ||
                        longitude !== location?.longitude
                            ? 'map'
                            : from
                });
            } catch (err) {
                console.log('@social, searchFilter, err = ', err);
            }
        }
    };

    const loadMorePosts = useCallback(async () => {
        let toRender = postsRender;

        if (posts.length > postsRender) {
            toRender += 3;
            setPostsRender(toRender);
        }

        if (
            loadingMore ||
            fetching ||
            loading ||
            !next ||
            toRender < posts.length
        )
            return;

        setLoadingMore(true);
        await addPage();
        setLoadingMore(false);
    }, [posts, postsRender, loadingMore, fetching, loading, next, addPage]);

    const handleViewableItemsChanged = (info) => {
        const idsInView = info.viewableItems.map(
            (item) => posts[item.index]._id
        );

        setInviewID(idsInView);
        setViewableItemsID((prev) => [
            ...prev,
            ...idsInView.filter((id) => prev.indexOf(id) === -1)
        ]);
    };

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Post
                    index={index}
                    address={item.Address}
                    help={item.Help}
                    user={item.User}
                    id={item._id}
                    description={item.Text}
                    pictures={item.Images.length ? item.Images : []}
                    thumbnail={item.SmallImage}
                    videos={item.Videos ? item.Videos : []}
                    likes={item.Likes}
                    comments={item.Comments}
                    likedByMe={item.Liked}
                    location={item.Location}
                    date={item.CreatedAt}
                    checkin={item.CheckIn}
                    markeds={item.Markeds || []}
                    distance={item.Distance}
                    shouldLoad={
                        index === 0
                            ? true
                            : viewableItemsID.indexOf(String(item._id)) > -1
                    }
                    inView={
                        inViewID.length
                            ? inViewID.slice(-1)[0] === String(item._id)
                            : index === 0
                    }
                />
            );
        },
        [viewableItemsID, inViewID]
    );

    const handleHeight = useCallback(
        (_, index) => {
            if (!posts.length) return;

            index = index || 0;
            const post = posts[index];

            return getPostHeight(post);
        },
        [posts]
    );

    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, []);

    const handleHeaderHeight = useCallback(() => {
        const storiesHeight = stories?.length || storiesLoading ? 180 : 10;
        const postsHeight = isLoading ? 600 : 0;

        return storiesHeight + postsHeight;
    }, [isLoading, stories, storiesLoading]);

    useEffect(() => {
        if (hasNewPost) socialDispatch({ hasNewPost: false });
    }, [hasNewPost, isFocused]);

    useEffect(() => {
        if (!location && coords) {
            socialDispatch({
                location: coords,
                from: 'geo'
            });
        }
    }, [location, coords]);

    useEffect(() => {
        if (toTop) {
            listRef?.current?.scrollToTop();
            socialDispatch({ toTop: false });
        }
    }, [toTop]);

    return (
        <SafeView style={{ flex: 1 }}>
            <SocialHeader />

            <BigList
                removeClippedSubviews={true}
                keyExtractor={keyExtractor}
                itemHeight={handleHeight}
                data={posts?.slice(0, postsRender)}
                renderItem={renderItem}
                onEndReached={loadMorePosts}
                onEndReachedThreshold={0.5}
                onViewableItemsChanged={handleViewableItemsChanged}
                showsVerticalScrollIndicator={false}
                renderHeader={() => (
                    <>
                        <SocialListHeader
                            stories={stories.filter((s) => !!s)}
                            loading={storiesLoading}
                        />
                        {isLoading && <Skeleton layout={postsSkeleton} />}
                        {fetching && !isLoading && isConnected && (
                            <Loading overlay={false} />
                        )}
                    </>
                )}
                headerHeight={handleHeaderHeight}
                renderFooter={() =>
                    fetching && !isLoading && isConnected ? (
                        <Loading overlay={false} />
                    ) : (
                        <></>
                    )
                }
                footerHeight={32}
                batchSizeThreshold={15}
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderEmpty={() => (
                    <>{!!(!loading && !loadingLoc) && <Empty />}</>
                )}
                ref={listRef}
            />
            <Filter
                visible={isFocused}
                onSubmit={searchFilter}
                distance={distance}
                location={location}
            />
        </SafeView>
    );
};

export default ASocial;
