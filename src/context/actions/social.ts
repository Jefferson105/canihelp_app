import { Alert } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import { captureMessage } from '@sentry/react-native';

import { coordsDistance } from '@services/location';
import { deleteUpload, postFilesUpload } from '@services/upload';
import { showError } from '@utils/index';
import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import {
    ICreateComment,
    ICreatePost,
    IDeleteComment,
    IEditComment,
    IUpdatePost
} from '@ts/interfaces/social';

export const getPost = async (postId: string) => {
    const { postsList, user } = globalState;

    try {
        const post = postsList?.list?.find(
            (p) => String(p._id) === String(postId)
        );

        if (!post) {
            const { success, error, data } = await mutateApi({
                name: 'post',
                params: {
                    PostID: String(postId)
                }
            });

            if (!success) throw new Error(error);

            return data;
        }
        return post;
    } catch (err) {
        console.log('@social, err = ', err);
        const userName = user?.Name || null;
        captureMessage(
            `@getPost{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
    }
};

export const postsIterator = (iterator, operation = 'map') => {
    const { postsList, postsUser, post, stories } = globalState;

    if (postsList?.mutate)
        postsList?.mutate(() => postsList.list[operation](iterator), false);

    if (postsUser?.mutate)
        postsUser?.mutate(() => postsUser.list[operation](iterator), false);

    if (post?.mutate) post?.mutate(() => post.list[operation](iterator), false);

    if (stories?.mutate)
        stories?.mutate(() => stories.list[operation](iterator), false);
};

export const createPost = (post: ICreatePost) => {
    return new Promise(async (resolve, reject) => {
        const { social, user, location } = globalState;

        const Lat =
            post.Location?.lat ||
            social.location?.latitude ||
            location.coords.latitude;

        const Lon =
            post.Location?.lon ||
            social.location?.longitude ||
            location.coords.longitude;

        let Images = [];
        let Video = null;
        let hasFiles = false;
        let SmallImage = null;

        try {
            if (!Lat || !Lon) {
                Alert.alert('Escolha uma localização antes de postar');
                throw new Error('Escolha uma localização antes de postar');
            }

            if (post.Images.length) {
                hasFiles = true;

                const [images] = await Promise.all([
                    Promise.all(
                        post.Images.map((image) =>
                            ImageResizer.createResizedImage(
                                image?.uri,
                                800,
                                600,
                                'JPEG',
                                100
                            )
                        )
                    )
                ]);

                Images = images.map((image) => image.uri);
            }

            // add videos
            if (post.Videos.length) {
                hasFiles = true;
                Video = post.Videos[0].uri;
            }

            if (hasFiles) {
                const files = await postFilesUpload({
                    images: Images,
                    video: Video,
                    token: user.Token
                });

                if (files.Images?.length && !files.Video)
                    Images = files.Images.map((image) => ({ Url: image }));

                if (files.Video) {
                    Video = [{ Url: files.Video }];
                    if (files?.Thumb) SmallImage = files?.Thumb;
                }
            }

            const { success, data, error } = await mutateApi({
                name: 'postsCreate',
                params: {
                    ...post,
                    Images,
                    SmallImage,
                    Videos: Video || [],
                    Location: { Lat: String(Lat), Lon: String(Lon) }
                }
            });

            if (!success || error) throw new Error(error);

            const distance = coordsDistance(
                data.Location.Lat,
                data.Location.Lon,
                social.location?.latitude,
                social.location?.longitude
            );

            data.Distance = distance;

            const { postsList } = globalState;

            if (postsList?.mutate)
                postsList.mutate(() => [data, ...postsList.list], false);

            resolve(data._id);
        } catch (err) {
            // Remove Images
            if (Images.length > 0) {
                for (const image of Images) {
                    await deleteUpload(image.Url, 'social', user.Token);
                }
            }

            // Remove Videos
            if (Video) {
                await deleteUpload(Video, 'social', user.Token);
            }

            console.log('create post err = ', err);

            reject(err);

            const userName = user?.Name || null;
            captureMessage(
                `@createPost{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const editPost = (post: IUpdatePost) => {
    return new Promise(async (resolve, reject) => {
        const { user } = globalState;

        try {
            const { success, data, error } = await mutateApi({
                name: 'postsEdit',
                params: post
            });

            if (!success || error) throw error;

            const mapper = (p) => {
                if (p._id === data._id) return { ...p, ...data };
                return p;
            };

            postsIterator(mapper);

            resolve(data._id);
        } catch (err) {
            console.log('editPost error', err);
            reject(err);
            const userName = user?.Name || null;
            captureMessage(
                `@editPost{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const deletePost = async (PostID: string) => {
    const { user } = globalState;

    try {
        const filter = (p) => String(p._id) !== String(PostID);

        postsIterator(filter, 'filter');

        await mutateApi({
            name: 'postsDelete',
            params: {
                PostID: String(PostID)
            }
        });
    } catch (err) {
        showError(err, 'delete_post');
        const userName = user?.Name || null;
        captureMessage(
            `@deletePost{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

const likePostCtrl = {
    requesting: false
};

export const likePost = async (PostID: string) => {
    const { user } = globalState;

    if (likePostCtrl.requesting) return;

    try {
        likePostCtrl.requesting = true;

        const mapper = (p) => {
            if (String(p._id) === String(PostID)) {
                p.Likes = p.Liked ? p.Likes - 1 : p.Likes + 1;
                p.Liked = !p.Liked;
            }

            return p;
        };

        postsIterator(mapper);

        await mutateApi({
            name: 'postsLike',
            params: {
                PostID
            }
        });

        likePostCtrl.requesting = false;
    } catch (err) {
        console.error(err, 'like_post');
        showError(err, 'like_post');
        const userName = user?.Name || null;
        captureMessage(
            `@likePost{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
    }
};

/*
    ---- COMMENTS -----
*/

const handleCommentsCounter = async ({ PostID, operation }) => {
    const mapper = (p) => {
        if (String(p._id) === String(PostID)) {
            p.Comments = p.Comments + operation;
        }

        return p;
    };

    postsIterator(mapper);
};

export const createComment = async ({
    PostID,
    Text,
    Markeds
}: ICreateComment) => {
    const {
        comments: { mutate, list },
        user
    } = globalState;

    try {
        handleCommentsCounter({ PostID, operation: 1 });

        const fakeId = Math.random().toString(36).substr(2, 10);
        const commentData = {
            _id: fakeId,
            Markeds,
            Text,
            Fake: true,
            User: user,
            PostID
        };

        mutate(() => [commentData, ...list], false);

        const { success, data, error } = await mutateApi({
            name: 'commentsCreate',
            params: {
                PostID: String(PostID),
                Markeds: Markeds.map((m) => m._id),
                Text
            }
        });

        if (!success) throw error;

        commentData._id = data._id;
        commentData.Fake = false;

        mutate(() => [commentData, ...list], false);

        return true;
    } catch (err) {
        showError(err, 'create_comment');
        const userName = user?.Name || null;
        captureMessage(
            `@createComment{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const deleteComment = async ({ CommentID, PostID }: IDeleteComment) => {
    const {
        comments: { mutate, list },
        user
    } = globalState;

    try {
        mutate(
            () => list.filter((c) => String(c._id) !== String(CommentID)),
            false
        );
        handleCommentsCounter({ PostID, operation: -1 });

        const { success, error } = await mutateApi({
            name: 'commentsDelete',
            params: {
                CommentID: String(CommentID)
            }
        });

        if (!success) throw error;
    } catch (err) {
        showError(err, 'delete_comment');
        const userName = user?.Name || null;
        captureMessage(
            `@deleteComment{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const editComment = async ({
    PostID,
    CommentID,
    Text,
    Markeds
}: IEditComment) => {
    const {
        comments: { mutate, list },
        user
    } = globalState;

    try {
        const params = {
            PostID: String(PostID),
            CommentID: String(CommentID),
            Text,
            Markeds
        };

        mutate(
            () =>
                list.map((c) =>
                    String(c._id) === String(CommentID)
                        ? { ...c, ...params }
                        : c
                ),
            false
        );

        const { success, error } = await mutateApi({
            name: 'commentsEdit',
            params
        });

        if (!success) throw error;
    } catch (err) {
        console.log(JSON.stringify(err, null, 2));
        showError(err, 'edit_comment');
        const userName = user?.Name || null;
        captureMessage(
            `@editComment{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const viewStory = async (postId: string) => {
    const { stories } = globalState;

    try {
        if (stories.list.find((s) => s._id === postId)?.Read) return;

        stories.mutate(
            () =>
                stories.list.map((s) => {
                    if (s._id === postId)
                        return {
                            ...s,
                            Readers: s.Readers + 1,
                            Read: true
                        };

                    return s;
                }),
            false
        );

        await mutateApi({
            name: 'storiesRead',
            params: { PostID: postId }
        });
    } catch (err) {
        console.log('view story error = ', err);
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@viewStory{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
    }
};
