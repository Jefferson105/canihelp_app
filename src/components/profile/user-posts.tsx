import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Post from '@components/social/post/index';
import Skeleton from '@components/skeleton/skeleton';
import uPostsSkeleton from './user-posts-skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { Container, Text, Button, EmptyProfile, Loading } from '@styles/index';

const UserPosts = ({ cacheUser }) => {
    const navigation = useNavigation();

    const {
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ profile, user }) => ({
        profile,
        user
    }));

    const [inViewID, setInviewID] = useState<string[]>([]);
    const [viewableItemsID, setViewableItemsID] = useState<string[]>([]);
    const [pressNext, setPress] = useState<boolean>(false);

    const isEdit = profile._id === user?._id;

    const { data, addPage, loading, fetching } = useRequest({
        name: 'postsUser',
        params: { user: profile._id },
        cacheFirst: cacheUser !== profile._id
    });

    const { list, pagination } = data;

    const handleViewableItemsChanged = useRef(
        ({ viewableItems }: { viewableItems: ViewToken[] }) => {
            const idsInView = viewableItems.map((item) => {
                return String(item.item._id);
            });

            setInviewID(idsInView);
            setViewableItemsID((prev) => [
                ...prev,
                ...idsInView.filter((id) => prev.indexOf(id) === -1)
            ]);
        }
    );
    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Post
                    index={index}
                    key={item._id}
                    address={item.Address}
                    user={item.User}
                    id={item._id}
                    description={item.Text}
                    pictures={item.Images.length ? item.Images : []}
                    videos={item.Videos ? item.Videos : []}
                    likes={item.Likes}
                    comments={item.Comments}
                    likedByMe={item.Liked}
                    date={item.CreatedAt}
                    location={item.Location}
                    help={item.Help}
                    checkin={item.CheckIn}
                    markeds={item.Markeds || []}
                    thumbnail={item.SmallImage}
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
        [inViewID, viewableItemsID]
    );

    const keyExtractor = useCallback((item) => {
        return String(item._id);
    }, []);

    if (loading) return <Skeleton fromUpost={true} layout={uPostsSkeleton} />;

    return (
        <Container width="100%" marg="17px 0 22px 0">
            <Container width="100%" dir="row" marg="0 20px 16px 20px">
                <Text family="Circularstd-Medium">Posts</Text>
                {isEdit && (
                    <Container
                        marg="0 40px 0 auto"
                        onPress={() => {
                            navigation.navigate('CreatePost', {
                                type: null
                            });
                        }}
                    >
                        <Text size={15} family="Circularstd-Medium">
                            Adicionar
                        </Text>
                    </Container>
                )}
            </Container>

            <FlatList
                data={pressNext ? list : list.slice(0, 1)}
                style={{ width: '100%' }}
                onViewableItemsChanged={handleViewableItemsChanged.current}
                ListFooterComponent={fetching && <Loading overlay={false} />}
                ListEmptyComponent={
                    <EmptyProfile
                        icon="posts"
                        text={
                            isEdit
                                ? 'Você ainda não possui posts.'
                                : `${profile.Name} ainda não possui posts.`
                        }
                    />
                }
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />

            {!!(pagination.next || (!pressNext && list.length > 1)) && (
                <Button
                    height={56}
                    size={12}
                    disabled={fetching}
                    onPress={() => {
                        if (!pressNext) {
                            setPress(true);
                            return;
                        }

                        addPage();
                    }}
                    text={'Ver mais posts'}
                />
            )}
        </Container>
    );
};

export default UserPosts;
