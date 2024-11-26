import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, RefreshControl, Dimensions, FlatList } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Footer from '@components/social/footer';
import { FullImagesCarousel } from '@components/social/post/images-carousel';
import Post from '@components/social/post';
import Comment from '@components/social/comment';
import postSkeleton from '@components/social/post/post-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import {
    SafeView,
    Loading,
    NavHeader,
    Container,
    Title,
    Text
} from '@styles/index';
import { mainColor } from '@styles/colors';
import KeyboardView from '@components/keyboardview';

type RouteParams = {
    params: {
        post: string;
        from?: string;
    };
};

const { width } = Dimensions.get('screen');

const APost = () => {
    const { goBack, navigate } = useNavigation();
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const {
        postsList,
        post: currentPost,
        comments: currentComments,
        user
    } = useSelector(({ postsList, post, comments, user }) => ({
        postsList,
        post,
        comments,
        user
    }));

    const [refreshing] = useState(false);
    const [isEditingComment, setIsEditingComment] = useState(false);
    const [isModalImagesOpen, setIsModalImagesOpen] = useState(false);

    const postId = params ? params.post : null;

    const { error, loading: loadingPost } = useRequest({
        name: 'post',
        cacheFirst: currentPost?.list?.length
            ? currentPost?.list[0]?._id === postId
            : false,
        params: {
            PostID: postId
        }
    });

    const post = useMemo(() => {
        if (currentPost?.list?.length && currentPost?.list[0]?._id === postId) {
            return currentPost.list[0];
        } else {
            return postsList?.list?.find((p) => p?._id === postId);
        }
    }, [currentPost, postsList?.list, postId]);

    const {
        data: commentData,
        fetching: isFetchingComments,
        loading: commentLoading,
        mutate,
        addPage
    } = useRequest({
        name: 'comments',
        cacheFirst: currentComments?.list?.length
            ? currentPost?.list[0]?._id === postId
            : false,
        params: {
            PostID: postId
        },
        size: 20
    });

    const comments = useMemo(() => commentData.list || [], [commentData.list]);

    const loadMoreComments = async () => {
        if (
            commentData &&
            commentData?.pagination?.next &&
            !commentLoading &&
            !isFetchingComments
        ) {
            await addPage();
        }
    };

    const onRefresh = async () => {
        await mutate();
    };

    const renderItem = useCallback(({ item }) => {
        return (
            <Comment
                isFake={item.Fake || false}
                user_picture={item.User.Photo}
                user_name={item.User.UserName}
                user_id={item?.User?._id}
                comment={item.Text}
                markeds={item.Markeds || []}
                user={item.User}
                date={item.CreatedAt}
                name={item.User.Name}
                id={item?._id}
                postId={postId}
                key={item?._id}
                setIsEditingComment={setIsEditingComment}
            />
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, []);

    const notFound = useMemo(() => {
        return !loadingPost && !post;
    }, [loadingPost, post]);

    const loading = useMemo(() => {
        if (!post) return true;

        return post?._id !== postId;
    }, [post, postId]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (error) goBack();
    }, [error, goBack]);

    if (loading && !notFound)
        return (
            <SafeView>
                <NavHeader title="Post" justify="center" />
                <Skeleton layout={postSkeleton} />
            </SafeView>
        );

    return (
        <SafeView>
            <KeyboardView>
                <NavHeader
                    title="Post"
                    justify="center"
                    backHandler={() =>
                        params?.from === 'stories'
                            ? navigate('Social')
                            : goBack()
                    }
                />

                {notFound ? (
                    <Container align="center" marg="20px 0 0 0">
                        <Text>Esse post não existe mais</Text>
                    </Container>
                ) : (
                    <FlatList
                        testID="scrollView"
                        contentContainerStyle={{
                            paddingTop: 15,
                            paddingBottom: 10
                        }}
                        //itemHeight={getCommentHeight}
                        //headerHeight={getHeaderHeight}
                        ListHeaderComponent={
                            <View style={{ flex: 1 }}>
                                <Post
                                    index={0}
                                    full={true}
                                    user={post.User}
                                    address={post.Address}
                                    id={post._id}
                                    description={post.Text}
                                    pictures={
                                        post.Images.length ? post.Images : []
                                    }
                                    videos={post.Videos ? post.Videos : []}
                                    likes={post.Likes}
                                    comments={post.Comments}
                                    likedByMe={post.Liked}
                                    date={post.CreatedAt}
                                    help={post.Help}
                                    checkin={post.CheckIn}
                                    thumbnail={post.SmallImage}
                                    borderBottomColor="#e4e4e4"
                                    marg="0"
                                    goBackAfterDelete={true}
                                    onPressImages={() =>
                                        setIsModalImagesOpen(true)
                                    }
                                    markeds={post.Markeds || []}
                                    shouldLoad={true}
                                    inView={true}
                                    location={post.Location}
                                />
                                <View
                                    style={{
                                        paddingHorizontal: 20,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginVertical: 20
                                    }}
                                >
                                    <Title size={16} align="left">
                                        Comentários
                                    </Title>
                                </View>
                            </View>
                        }
                        data={comments}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        onEndReached={loadMoreComments}
                        onEndReachedThreshold={0.1}
                        removeClippedSubviews={true}
                        refreshControl={
                            <RefreshControl
                                colors={[mainColor]}
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        ListEmptyComponent={
                            !commentLoading &&
                            !isFetchingComments && (
                                <Container
                                    width={width - 40 + 'px'}
                                    pad="20px"
                                    justify="center"
                                    align="center"
                                    marg="0 20px 60px 20px"
                                >
                                    <Text>Ainda sem comentários</Text>
                                    {user ? (
                                        <Text>
                                            Seja o primeiro a interagir!
                                        </Text>
                                    ) : (
                                        <Container
                                            onPress={() => navigate('SignUp')}
                                        >
                                            <Text>
                                                Para interagir,{' '}
                                                <Text
                                                    color={mainColor}
                                                    decoration="underline"
                                                >
                                                    cadastre-se
                                                </Text>
                                            </Text>
                                        </Container>
                                    )}
                                </Container>
                            )
                        }
                        ListFooterComponent={
                            (commentLoading || isFetchingComments) && (
                                <Loading overlay={false} />
                            )
                        }
                    />
                )}

                {!notFound && (
                    <>
                        {!!(
                            !isEditingComment &&
                            !isModalImagesOpen &&
                            user
                        ) && <Footer post={post._id} />}

                        <FullImagesCarousel
                            images={post.Images.map((img) => img.Url)}
                            onPressClose={() => setIsModalImagesOpen(false)}
                            isVisible={isModalImagesOpen}
                        />
                    </>
                )}
            </KeyboardView>
        </SafeView>
    );
};

export default APost;
