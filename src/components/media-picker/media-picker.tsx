import React, {
    useState,
    useCallback,
    useReducer,
    Reducer,
    useEffect,
    useMemo
} from 'react';
import { PermissionsAndroid, Alert, Platform, Dimensions } from 'react-native';
import BigList from 'react-native-big-list';

import Empty from '@components/empty-data/images';
import PickerHeader from '@components/media-picker/header';
import { ModalOptionsProps } from '@components/generic-modal';
import ModalAlbum from '@components/media-picker/modal-album';

import { Container, Image, Float, LoadingList, SafeView } from '@styles/index';
import { Icon } from '@styles/icon';

import { getAlbuns, getMedias } from '@services/media';

import creatMediaPiker, {
    SET_VIEWABLES,
    MAX_ASSET_SIZE,
    PICKS_LOADING,
    REMOVE_PICKED,
    SET_ALBUNS,
    SET_PAGINATION,
    SET_PHOTOS,
    SET_PICK,
    SET_PICKED,
    IPicks
} from '@context/reducers/local/create-media-piker';

const hasAndroidPermission = async () => {
    const permissionRead =
        Number(Platform.Version) >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

    const hasPermissionRead = await PermissionsAndroid.check(permissionRead);

    if (hasPermissionRead) return true;

    const statusR = await PermissionsAndroid.request(permissionRead, {
        title: 'Canihelp',
        message:
            'Para utilizar esse recurso é necessário o app ter acesso ao armazenamento do dispositivo.',
        buttonPositive: 'OK',
        buttonNegative: 'Cancelar'
    });

    if (statusR === 'granted') return true;
    else {
        Alert.alert(
            'Permissão necessária',
            'O app não tem permissão para acessar este recurso.'
        );
        throw 'not allowed';
    }
};

const cameraIcon = {
    press: true,
    name: 'Camera'
};

const { width } = Dimensions.get('window');

const MEDIA_SIZE = width * 0.305;

type MediaPickerProps = {
    maxImages: number;
    maxVideos?: number;
    action: any;
    close?: () => void;
    assetType: Array<'image' | 'video' | 'audio' | 'doc'>;
    setCamera?: () => void;
};

const MediaPicker = ({
    maxImages = 1,
    maxVideos = 0,
    action,
    close,
    setCamera,
    assetType
}: MediaPickerProps) => {
    const [selectedAlbum, setAlbum] = useState(null);
    const [albumModal, setAlbumModal] = useState(false);
    const [media, setMedia] = useState(null);

    const [state, dispatchR] = useReducer<Reducer<IPicks, any>>(
        creatMediaPiker,
        {
            List: [cameraIcon],
            PicksList: [],
            Pagination: {
                page: 0,
                size: 50,
                next: false
            },
            viewables: [],
            loading: false,
            albuns: []
        }
    );

    const handleAlbumModal = useCallback(async () => {
        setAlbumModal(!albumModal);
    }, [albumModal]);

    const handleViewableItemsChanged = (info) => {
        const inView = info.viewableItems.map((view) => view.item.path);
        const newViews = inView.filter(
            (v) => state.viewables.indexOf(v) === -1
        );

        if (newViews.length)
            dispatchR({
                type: SET_VIEWABLES,
                data: [...state.viewables, ...newViews]
            });
    };

    const checkIsPicked = useCallback(
        (item) => {
            const isPicked = state.PicksList.some((s) => s.name === item.name);

            if (isPicked) {
                dispatchR({
                    type: REMOVE_PICKED,
                    data: item
                });

                dispatchR({
                    type: SET_PICK,
                    data: {
                        name: item.name,
                        picked: false
                    }
                });

                return true;
            }

            return false;
        },
        [state.PicksList]
    );

    const checkIfIsAbleToAddItem = useCallback(
        (item) => {
            // tamanho do arquivo
            if (item.size > MAX_ASSET_SIZE) {
                Alert.alert(
                    `Arquivo muito grande. Limite de ${
                        MAX_ASSET_SIZE / 10000000
                    }MB`
                );
                return false;
            }

            // Quantidade de videos (1 video, 0 imagens)
            if (
                item.assetType === 'video' &&
                state.PicksList.length >= maxVideos
            ) {
                Alert.alert(
                    'Atenção',
                    `Você só pode adicionar ${maxImages} fotos ${
                        maxVideos > 0 && `ou ${maxVideos} video`
                    }`
                );
                return false;
            }

            if (item.assetType === 'video' && maxVideos <= 0) {
                Alert.alert(
                    'Atenção',
                    `Você só pode adicionar ${maxImages} fotos ${
                        maxVideos > 0 && `ou ${maxVideos} video`
                    }`
                );
                return false;
            }

            if (
                item.assetType === 'image' &&
                state.PicksList.some((picked) => picked.assetType === 'video')
            ) {
                Alert.alert(
                    'Atenção',
                    `Você só pode adicionar ${maxImages} fotos ${
                        maxVideos > 0 && `ou ${maxVideos} video`
                    }`
                );
                return false;
            }

            if (item.assetType === 'image' && maxImages <= 0) {
                Alert.alert(
                    'Atenção',
                    `Você só pode adicionar ${maxImages} fotos ou 1 video`
                );
                return false;
            }

            // quantidade de imagens
            if (maxImages > 1 && state.PicksList.length >= maxImages) {
                Alert.alert(
                    `O maximo de imagens que você pode selecionar são ${maxImages}`
                );
                return false;
            }

            return true;
        },
        [maxImages, maxVideos, state.PicksList]
    );

    const handlePick = useCallback(
        (item) => {
            if (item.name === 'Camera') {
                setCamera();
                return;
            }

            const alreadyPicked = checkIsPicked(item);
            if (alreadyPicked) return;

            const lastPick = state.PicksList[0];

            if (maxImages === 1 && lastPick) {
                dispatchR({
                    type: REMOVE_PICKED,
                    data: lastPick
                });

                dispatchR({
                    type: SET_PICK,
                    data: {
                        name: lastPick.name,
                        picked: false
                    }
                });
            }

            const isAbleToPickItem = checkIfIsAbleToAddItem(item);
            if (!isAbleToPickItem) return false;

            dispatchR({
                type: SET_PICKED,
                data: [item]
            });

            dispatchR({
                type: SET_PICK,
                data: {
                    name: item.name,
                    picked: true
                }
            });
        },
        [
            checkIfIsAbleToAddItem,
            checkIsPicked,
            maxImages,
            setCamera,
            state.PicksList
        ]
    );

    const loadMore = () => {
        if (!state.Pagination.next || state.loading) return;

        const nextPage = state.Pagination.page + 1;

        dispatchR({
            type: PICKS_LOADING,
            data: true
        });

        dispatchR({
            type: SET_PAGINATION,
            data: { page: nextPage }
        });

        media.emit('page', nextPage);
    };

    const getAlbunPhotos = useCallback(
        (album) => {
            if (album) setAlbum(album);
            else setAlbum(null);

            dispatchR({
                type: SET_PAGINATION,
                data: { page: 0, next: false }
            });

            dispatchR({
                type: SET_PHOTOS,
                data: [cameraIcon]
            });

            handleAlbumModal();
        },
        [handleAlbumModal]
    );

    const AlbumModalOptions: Array<ModalOptionsProps> = useMemo(() => {
        return state.albuns.map((item) => {
            return {
                onPress: () => getAlbunPhotos(item),
                text: item,
                show: true
            };
        });
    }, [getAlbunPhotos, state.albuns]);

    useEffect(() => {
        (async () => {
            try {
                if (Platform.OS !== 'ios') await hasAndroidPermission();

                const albuns = await getAlbuns();

                dispatchR({
                    type: SET_ALBUNS,
                    data: albuns
                });

                dispatchR({
                    type: PICKS_LOADING,
                    data: true
                });

                const emmiter = getMedias({
                    types: assetType
                });

                setMedia(emmiter);

                emmiter.emit('fetch', selectedAlbum);

                emmiter.addListener('loadPage', (photos) => {
                    dispatchR({
                        type: SET_PHOTOS,
                        data: [cameraIcon, ...photos]
                    });

                    dispatchR({
                        type: SET_PAGINATION,
                        data: { next: photos.length % 50 === 0 }
                    });

                    dispatchR({
                        type: PICKS_LOADING,
                        data: false
                    });

                    if (photos.length <= 50) {
                        dispatchR({
                            type: SET_VIEWABLES,
                            data: photos.slice(0, 20).map((photo) => photo.path)
                        });
                    }
                });
            } catch (err) {
                console.log('@Media picker err', err);
                close();
            }
        })();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedAlbum]);

    useEffect(() => {
        return () => {
            media?.removeAllListeners();
        };
    }, [media]);

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <Container
                    onPress={() => {
                        handlePick(item);
                    }}
                    justify="center"
                    align="center"
                    marg="4px"
                    width={MEDIA_SIZE + 'px'}
                    height={MEDIA_SIZE + 'px'}
                    border={`5px solid ${item?.picked ? '#FF6F5C' : '#fff'}`}
                >
                    {item.picked && (
                        <Float top="0" right="0">
                            <Icon name="pickedImage" />
                        </Float>
                    )}

                    {!!(
                        state?.viewables?.indexOf(item.path) > -1 || item?.press
                    ) && (
                        <Image
                            height={MEDIA_SIZE - 5}
                            width={MEDIA_SIZE - 5}
                            source={
                                item.press
                                    ? {
                                          uri: 'https://s3.us-west-1.wasabisys.com/canihelp/app-assets/Camera.png'
                                      }
                                    : { uri: item.uri }
                            }
                        />
                    )}
                </Container>
            );
        },
        [handlePick, state?.viewables]
    );

    const keyExtractor = useCallback((item) => {
        return item?.name;
    }, []);

    return (
        <SafeView>
            <PickerHeader
                Picks={state.PicksList}
                action={action}
                close={() => {
                    close();
                }}
                handleModal={handleAlbumModal}
                albumName={selectedAlbum}
                albuns={state.albuns}
            />
            <BigList
                data={state.List}
                numColumns={3}
                itemHeight={MEDIA_SIZE}
                getItemLayout={(_, index) => ({
                    length: MEDIA_SIZE,
                    offset: MEDIA_SIZE * index,
                    index
                })}
                onEndReached={loadMore}
                onEndReachedThreshold={0.1}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onViewableItemsChanged={handleViewableItemsChanged}
                removeClippedSubviews={true}
                renderHeader={null}
                renderEmpty={null}
                renderFooter={() => (
                    <LoadingList
                        loading={state.loading}
                        data={state.List}
                        empty={Empty}
                        openCamera={() => {
                            setCamera();
                        }}
                    />
                )}
                footerHeight={20}
            />
            {state.albuns.length > 0 && (
                <ModalAlbum
                    isVisible={albumModal}
                    onClose={handleAlbumModal}
                    options={[
                        {
                            onPress: () => getAlbunPhotos(null),
                            text: 'Todos',
                            show: true
                        },
                        ...AlbumModalOptions
                    ]}
                />
            )}
        </SafeView>
    );
};

export default MediaPicker;
