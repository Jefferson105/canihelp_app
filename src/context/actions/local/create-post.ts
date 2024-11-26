import { Alert } from 'react-native';

import {
    SET_EDIT,
    SET_CAMERA,
    SET_TEXT,
    SET_IMAGES,
    SET_VIDEOS,
    SET_POST_LOC,
    SET_LOADING,
    SET_MARKEDS,
    REMOVE_MARKED,
    SET_INFO,
    ADD_MARKED
} from '@context/types';

import { displayAddress } from '@services/location';

import { createPost, editPost } from '@context/actions/social';
import { addToast, removeToast } from '@context/actions/layout';
import { userCategory } from '@utils/index';
import { IAsset } from '@services/media';
import { globalState } from '@context/index';

export const cameraOnClose = { type: SET_CAMERA, data: false };

export const onAddImage = (
    images: Array<IAsset>,
    dispatch: Function,
    state
) => {
    dispatch({
        type: SET_VIDEOS,
        data: []
    });

    dispatch({
        type: SET_IMAGES,
        data: state.Images.concat(images)
    });
};

export const onAddVideo = (videos: Array<IAsset>, dispatch: Function) => {
    dispatch({
        type: SET_IMAGES,
        data: []
    });

    dispatch({
        type: SET_VIDEOS,
        data: videos
    });
};

export const onCameraCaptureImg = (
    data: { uri: string },
    dispatch: Function,
    createPost
) => {
    dispatch({
        type: SET_IMAGES,
        data: [
            ...createPost.Images,
            {
                ctime: new Date(),
                name: data.uri.split('/cache/')[1],
                uri: data.uri,
                type: 'image/jpeg',
                assetType: 'image'
            }
        ]
    });

    dispatch({ type: SET_CAMERA, data: false });
};

export const onCameraCaptureVideo = (
    uri: string,
    videoTime: number,
    dispatch: Function
) => {
    dispatch({
        type: SET_VIDEOS,
        data: [
            {
                name: uri.split('/cache/')[1],
                uri: uri,
                type: 'video/mp4',
                duration: videoTime
            }
        ]
    });
    dispatch({ type: SET_CAMERA, data: false });
};

export const onAddAttach = (dispatch: Function, createPost) => {
    if (createPost.Images.length >= 5) Alert.alert('Maximo de 5 imagens');
    else dispatch({ type: SET_CAMERA, data: true });
};

export const removeImage = (i: number, dispatch: Function, createPost) => {
    dispatch({
        type: SET_IMAGES,
        data: createPost.Images.filter((_: any, idx: number) => idx !== i)
    });
};

export const removeVideo = (i = 0, dispatch: Function, createPost) => {
    dispatch({
        type: SET_VIDEOS,
        data: createPost.Videos.filter((_: any, idx: number) => idx !== i)
    });
};

export const createOption = (params, dispatch: Function, createPost) => {
    const { createHelp, search, user } = globalState;

    const isCheck = params.type === 'check';

    if (params.type === 'help') {
        dispatch({ type: SET_TEXT, data: createHelp?.Description });
        dispatch({
            type: SET_INFO,
            data: {
                address:
                    displayAddress(createHelp.location?.displayName) ||
                    createPost.info?.address,
                category: createHelp.category?.Name
            }
        });
    }

    if (isCheck) {
        dispatch({
            type: SET_INFO,
            data: {
                address: displayAddress(search.location.address, true),
                category: userCategory(user)
            }
        });
    }

    if (!params.edit) {
        dispatch({
            type: SET_TEXT,
            data:
                params.type === 'help'
                    ? createHelp?.Description
                    : isCheck
                      ? globalState.createPost.Text
                      : ''
        });
        dispatch({
            type: SET_IMAGES,
            data: isCheck ? globalState.createPost.Images : []
        });
        dispatch({
            type: SET_VIDEOS,
            data: isCheck ? globalState.createPost.Videos : []
        });
        dispatch({ type: SET_EDIT, data: false });
        dispatch({
            type: SET_MARKEDS,
            data: isCheck ? globalState.createPost.Markeds : []
        });
    }
};

export const createOptionBody = (
    params,
    postData,
    dispatch: Function,
    createPost
) => {
    const { createHelp, search, user } = globalState;
    let lastAction = {};

    if (params.type === 'help') {
        lastAction = { type: SET_TEXT, data: createHelp?.Description };
        dispatch(lastAction);
        lastAction = {
            type: SET_INFO,
            data: {
                address:
                    displayAddress(createHelp?.location?.displayName) ||
                    createPost.info?.address,
                category: createHelp?.category?.Name
            }
        };
        dispatch(lastAction);
    }

    if (params.type === 'check') {
        lastAction = {
            type: SET_INFO,
            data: {
                address: displayAddress(search.location.address, true),
                category: userCategory(user)
            }
        };
        dispatch(lastAction);
    }

    if (params.edit) {
        const post = postData;

        if (params.type === 'help') {
            lastAction = {
                type: SET_INFO,
                data: {
                    address: post.Address || createPost.info.address,
                    category: post.Help?.Category?.Name
                }
            };
            dispatch(lastAction);
        }

        lastAction = { type: SET_TEXT, data: post.Text };
        dispatch(lastAction);

        lastAction = {
            type: SET_IMAGES,
            data: post.Images.map((img) => ({ uri: img.Url || img.uri }))
        };
        dispatch(lastAction);

        lastAction = {
            type: SET_VIDEOS,
            data: post.Videos.map((vd) => ({ uri: vd.Url }))
        };
        dispatch(lastAction);

        lastAction = {
            type: SET_POST_LOC,
            data: {
                Lat: String(post.Location.Lat),
                Lon: String(post.Location.Lon)
            }
        };
        dispatch(lastAction);

        lastAction = { type: SET_EDIT, data: params.edit };
        dispatch(lastAction);

        lastAction = {
            type: SET_MARKEDS,
            data: post.Markeds
        };
        dispatch(lastAction);
    } else {
        lastAction = {
            type: SET_TEXT,
            data: params.type === 'help' ? createHelp?.Description : ''
        };
        dispatch(lastAction);

        lastAction = {
            type: SET_IMAGES,
            data: []
        };
        dispatch(lastAction);

        lastAction = { type: SET_VIDEOS, data: [] };
        dispatch(lastAction);

        lastAction = { type: SET_EDIT, data: false };
        dispatch(lastAction);
    }

    return lastAction;
};

export const addMark = (item) => ({
    type: ADD_MARKED,
    data: item
});

export const removeMark = (item) => ({ type: REMOVE_MARKED, data: item.id });

export const publishPost = async (
    params,
    navigation,
    dispatchCtx: Function,
    crPost
) => {
    const { createHelp, location, postsList } = globalState;

    if (!crPost?.Text && params.type !== 'check' && !params.search) {
        Alert.alert('Texto obrigatório');
        return;
    }

    const getLocation = () => {
        switch (params.type) {
            case 'help':
                return {
                    lat: createHelp.location?.latitude,
                    lon: createHelp.location?.longitude
                };

            case 'check':
                return {
                    lat: location?.coords?.latitude,
                    lon: location?.coords?.longitude
                };
            default:
                return null;
        }
    };

    try {
        const ToastID = addToast({
            type: 'info',
            title: crPost.edit ? 'Editando...' : 'Enviando...',
            showProgress: true,
            visibleTime: null,
            actionLabel: 'Visualizar'
        });

        dispatchCtx({ type: SET_LOADING, data: true });

        let Address = null;
        let Help = null;

        if (params.type === 'help') {
            Address = createHelp.location?.displayName;
            Help = {
                ...(createHelp.category?.self
                    ? {
                          CategoryID: null,
                          Label: createHelp.category?.Name
                      }
                    : { CategoryID: String(createHelp.category?._id) }),
                Urgency: createHelp.Urgency
            };
        }

        if (params.type === 'check') {
            Address = location?.coords?.displayName;
        }

        const Markeds = crPost.Markeds.map((m) => m._id);

        if (crPost.edit) {
            editPost({
                Text: crPost.Text,
                Markeds,
                PostID: String(crPost.edit),
                Location: crPost.Location
            })
                .then((PostID) => {
                    removeToast(ToastID);

                    addToast({
                        type: 'success',
                        title: 'Post editado com sucesso!',
                        actionLabel: 'Visualizar',
                        visibleTime: 5000,
                        action: () =>
                            navigation.navigate('Post', {
                                post: PostID
                            })
                    });

                    if (postsList?.mutate) postsList.mutate();
                })
                .catch(() => {
                    removeToast(ToastID);

                    addToast({
                        title: 'Descule, algo deu errado!',
                        description: 'Tente novamente mais tarde',
                        type: 'error'
                    });
                });
        } else {
            createPost({
                Address,
                Markeds,
                Text: crPost.Text,
                Images: crPost.Images,
                Videos: crPost.Videos,
                Help,
                CheckIn: params.type === 'check',
                Location: getLocation()
            })
                .then((PostID) => {
                    removeToast(ToastID);

                    addToast({
                        type: 'success',
                        title: 'Seu post foi publicado',
                        actionLabel: 'Visualizar',
                        visibleTime: 5000,
                        action: () =>
                            navigation.navigate('Post', {
                                post: PostID
                            })
                    });
                })
                .catch(() => {
                    console.log('error');
                    removeToast(ToastID);

                    addToast({
                        title: 'Descule, algo deu errado!',
                        description: 'Tente novamente mais tarde',
                        type: 'error'
                    });
                });
        }

        dispatchCtx({ type: SET_TEXT, data: '' });
        dispatchCtx({ type: SET_IMAGES, data: [] });
        dispatchCtx({ type: SET_VIDEOS, data: [] });
        dispatchCtx({ type: SET_EDIT, data: false });
        dispatchCtx({
            type: SET_MARKEDS,
            data: []
        });

        navigation.navigate('Social');
    } catch (err) {
        console.log('@create-post, publishPost, err = ', err);
    } finally {
        dispatchCtx({ type: SET_LOADING, data: false });
    }
};
