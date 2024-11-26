import React, {
    useEffect,
    useMemo,
    useState,
    useCallback,
    useReducer
} from 'react';
import { Alert, KeyboardAvoidingView, Modal, Platform } from 'react-native';
import {
    useRoute,
    useNavigation,
    useIsFocused,
    RouteProp
} from '@react-navigation/native';

import Camera from '@components/camera';
import MediaPicker from '@components/media-picker/media-picker';
import CreatePostHeader from '@components/social/create-post/header';
import CreatePostBody from '@components/social/create-post/body';
import CreatePostFooter from '@components/social/create-post/footer';
import { StateProvider } from '@hooks/context';

import { SafeView, Loading, Container } from '@styles/index';

import {
    onAddImage,
    onAddVideo,
    onCameraCaptureImg,
    onCameraCaptureVideo,
    onAddAttach,
    createOption,
    cameraOnClose
} from '@context/actions/local/create-post';
import { getPost } from '@context/actions/social';
import { IAsset } from '@services/media';
import createPost from '@context/reducers/local/create-post';
import { createPost as initialData } from '@context/state';

type RouteParams = {
    params: {
        type: 'help' | 'check' | null;
        edit: any;
        from: boolean;
    };
};

const CreateAPost = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const [state, dispatchR] = useReducer(createPost, initialData);

    const { Images, Videos, loading: CreateLoading, showCamera } = state;

    const [typeCam, setTypeCam] = useState<'photo' | 'video'>('photo');
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(params.edit ? true : false);
    const [post, setPost] = useState(null);

    const canAddMoreImages = Images?.length < 4 && Videos?.length === 0;
    const canAddMoreVideos = Images?.length <= 0 && Videos?.length === 0;

    const handleModal = () => {
        if (!canAddMoreImages) {
            Alert.alert('Limite de arquivos atingido!');
            return;
        }

        setModal(!modal);
    };

    const type = useMemo(() => {
        switch (params.type) {
            case 'help':
                return {
                    type: 'help',
                    back: true,
                    handler: () => navigation.navigate('Home'),
                    title: 'Compartilhar'
                };
            case 'check':
                return {
                    type: 'check',
                    back: true,
                    handler: () =>
                        navigation.navigate('CreatePost', { type: null }),
                    title: 'Check-in'
                };
            default:
                return {
                    type: null,
                    back: false,
                    handler: null,
                    title: 'Realizar postagem'
                };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    const handleAction = useCallback(
        (files: Array<IAsset>) => {
            const imgsArr: Array<IAsset> = files.filter(
                (file) => file.assetType === 'image'
            );

            const videosArr: Array<IAsset> = files
                .filter((file) => file.assetType === 'video')
                .map((file) => {
                    if (file.uri.indexOf('ph://') === 0) {
                        const id = file.uri.replace('ph://', '').split('/')[0];
                        const ext = file.name.split('.')[1];

                        return {
                            ...file,
                            uri: `assets-library://asset/asset.${ext}?id=${id}&ext=${ext}`
                        };
                    }

                    return file;
                });

            if (imgsArr.length > 0) {
                onAddImage(imgsArr, dispatchR, state);
            }

            if (videosArr.length > 0) {
                onAddVideo(videosArr, dispatchR);
            }
        },
        [state]
    );

    const getEditpost = useCallback(async () => {
        try {
            const Info = await getPost(params.edit);
            setPost(Info);
        } catch (err) {
            console.log('@editPost, err = ', err);
            navigation.goBack();
        } finally {
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible: !(params.type === 'help' || params.type === 'check')
        });

        if (params.edit) getEditpost();

        createOption(params, dispatchR, state);

        return () => {
            navigation.setOptions({
                tabBarVisible: true
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    if (!isFocused) return null;

    return (
        <>
            <StateProvider reducer={[state, dispatchR]}>
                <SafeView>
                    <Modal
                        visible={modal}
                        onRequestClose={handleModal}
                        animationType="slide"
                        transparent={false}
                    >
                        <MediaPicker
                            maxImages={
                                Videos?.length > 0 ? 0 : 4 - Images?.length
                            }
                            maxVideos={
                                Images?.length > 0 ? 0 : 1 - Videos?.length
                            }
                            action={handleAction}
                            close={handleModal}
                            assetType={['image', 'video']}
                            setCamera={() => {
                                onAddAttach(dispatchR, state);
                                setTypeCam('photo');
                                handleModal();
                            }}
                        />
                    </Modal>
                    <CreatePostHeader />
                    {loading ? (
                        <Container pad="16px 0 0">
                            <Loading overlay={false} />
                        </Container>
                    ) : (
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : null}
                            style={{ flex: 1 }}
                        >
                            <CreatePostBody type={type} postData={post} />

                            <CreatePostFooter
                                handleModal={handleModal}
                                onAddAttach={(typeCam) => {
                                    onAddAttach(dispatchR, state);
                                    setTypeCam(typeCam);
                                }}
                                type={type}
                                canAddMoreImages={canAddMoreImages}
                                canAddMoreVideos={canAddMoreVideos}
                            />
                        </KeyboardAvoidingView>
                    )}
                </SafeView>
            </StateProvider>
            {(CreateLoading || showCamera) && (
                <>
                    {!!CreateLoading && <Loading />}
                    {!!showCamera && (
                        <Camera
                            onClose={() => {
                                dispatchR(cameraOnClose);
                            }}
                            onCaptureImg={(base64) =>
                                onCameraCaptureImg(base64, dispatchR, state)
                            }
                            onCaptureVideo={(base64, videoTime) =>
                                onCameraCaptureVideo(
                                    base64,
                                    videoTime,
                                    dispatchR
                                )
                            }
                            onAddImg={handleModal}
                            main={typeCam}
                            canAddMoreImages={canAddMoreImages}
                            canAddMoreVideos={canAddMoreVideos}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default CreateAPost;
