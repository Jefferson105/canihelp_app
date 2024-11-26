import { Platform } from 'react-native';
import fs, { ReadDirItem } from 'react-native-fs';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { EventEmitter } from 'events';

import { MIMES } from '@utils/mimes';

type assetsTypes = 'image' | 'video' | 'audio' | 'doc' | string;

export interface IAsset {
    name: string;
    assetType: assetsTypes;
    type: string;
    uri: string;
    path?: string;
    mtime: Date;
    size: number;
    duration?: number;
    filename?: string;
    thumb?: string;
}

interface IFilesCtrl {
    files: IAsset[];
    rawFiles: ReadDirItem[];
    accepts: assetsTypes[];
    size: number;
    page: number;
}

const emmiter = new EventEmitter();

const ANDROID_PATHS = {
    Camera: '/storage/emulated/0/DCIM/Camera/',
    Download: '/storage/emulated/0/Download/',
    ScreenShots: '/storage/emulated/0/DCIM/Screenshots/',
    WhatsApp: {
        image: [
            '/storage/emulated/0/WhatsApp/Media/WhatsApp Images/',
            '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Images'
        ]
        //video: [
        //    '/storage/emulated/0/WhatsApp/Media/WhatsApp Videos/',
        //    '/storage/emulated/0/Android/media/com.whatsapp/WhatsApp/Media/WhatsApp Videos'
        //]
    },
    Instagram: '/storage/emulated/0/Pictures/Instagram/',
    Telegram: {
        image: '/storage/emulated/0/Telegram/Telegram Images/'
        //video: '/storage/emulated/0/Telegram/Telegram Videos/'
    }
};

const IOS_PATHS = {
    Library: fs.LibraryDirectoryPath
};

const FILES_CONTROL: IFilesCtrl = {
    files: [],
    rawFiles: [],
    accepts: ['image'],
    size: 50,
    page: 0
};

const ACCEPT_FILES = {
    image: ['.jpg', '.jpeg', '.png', '.heic', '.webp'],
    audio: ['.mp3', '.aac', '.m4a', '.flac', '.wav', '.wma', '.ogg', '.opus'],
    doc: ['.pdf', '.doc', '.docx']
};

const mediaType = (media: {
    name: string;
}): { type: assetsTypes; assetType: assetsTypes } | false => {
    let extension = media?.name?.toLowerCase()?.slice(-5)?.split('.')[1];

    if (!extension) return false;

    extension = `.${extension}`;

    for (const type in ACCEPT_FILES) {
        if (
            FILES_CONTROL.accepts.indexOf(type) > -1 &&
            ACCEPT_FILES[type].includes(extension)
        )
            return { type: MIMES[extension], assetType: type };
    }

    return false;
};

const allDirFiles = (path: string): Promise<Array<ReadDirItem>> => {
    return new Promise(async (resolve, reject) => {
        try {
            const pathExists = await fs.exists(path);

            if (!pathExists) {
                resolve([]);
                return;
            }

            const allContent = (await fs.readDir(path)).sort(
                (a, b) => Number(b.mtime) - Number(a.mtime)
            );

            FILES_CONTROL.rawFiles = FILES_CONTROL.rawFiles.concat(allContent);

            resolve(allContent);
        } catch (err) {
            console.log('@allDirFiles err', err, path);
            reject(err);
        }
    });
};

const isAcceptable = (file): IAsset => {
    const type = mediaType(file);

    if (!type) return null;

    delete file.isDirectory;
    delete file.isFile;
    delete file.ctime;

    return {
        ...file,
        ...type,
        size: Number(file.size),
        uri: 'file://' + file.path
    };
};

const fetchPaths = async (paths: string[]) => {
    try {
        let currentPath = 0;
        let rawCounter = 0;

        const iterateFiles = (finalSize) => {
            return new Promise(async (resolve) => {
                for (
                    let i = rawCounter;
                    i < FILES_CONTROL.rawFiles.length;
                    i++
                ) {
                    const asset = FILES_CONTROL.rawFiles[i];

                    rawCounter += 1;

                    if (asset.isDirectory()) {
                        await allDirFiles(asset.path);
                    } else {
                        const file = isAcceptable(asset);

                        if (!file) continue;

                        FILES_CONTROL.files.push(file);

                        if (FILES_CONTROL.files.length >= finalSize) {
                            resolve(true);

                            return;
                        }
                    }
                }

                resolve(true);
            });
        };

        const iteratePaths = (finalSize) => {
            return new Promise(async (resolve) => {
                for (const path of paths.slice(currentPath)) {
                    const files = await allDirFiles(path);

                    currentPath += 1;

                    if (files.length) {
                        await iterateFiles(finalSize);
                    }
                }

                resolve(true);
            });
        };

        emmiter.addListener('page', async (page) => {
            FILES_CONTROL.page = page;
            const startSize = page * FILES_CONTROL.size;
            const finalSize = startSize + FILES_CONTROL.size;

            if (FILES_CONTROL.rawFiles.length > finalSize)
                await iterateFiles(finalSize);

            if (finalSize > FILES_CONTROL.rawFiles.length)
                await iteratePaths(finalSize);

            emmiter.emit('loadPage', FILES_CONTROL.files.slice(0, finalSize));
        });

        emmiter.emit('page', 0);
    } catch (err) {
        console.log('@fetchpaths err', err);
        emmiter.emit('error', err);
    }
};

export const getAlbuns = () => {
    return new Promise(async (resolve, reject) => {
        if (Platform.OS === 'android') {
            resolve(Object.keys(ANDROID_PATHS));
        } else {
            try {
                const assetType = 'Photos';

                const albuns = await CameraRoll.getAlbums({ assetType });

                resolve(albuns.map((album) => album.title));
            } catch (err) {
                console.log('err Get albuns', err);
                reject(err);
            }
        }
    });
};

export const getPhotosCameraRoll = ({ album, size }): Promise<IAsset[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const assetType = 'Photos';

            const photos = await CameraRoll.getPhotos({
                first: size,
                assetType,
                groupTypes: 'All',
                groupName: album || '',
                include: ['filename', 'fileSize', 'playableDuration']
            });

            resolve(
                photos.edges.map((photo) => {
                    const photoInfo: any =
                        mediaType({ name: photo.node.image.filename }) || {};

                    return {
                        name: photo.node.image.filename,
                        type: photoInfo?.type || 'image/png',
                        assetType: photoInfo?.assetType || 'image',
                        uri: photo.node.image.uri,
                        path: photo.node.image.uri,
                        mtime: new Date(photo.node.timestamp),
                        size: photo.node.image.fileSize,
                        duration: photo.node.image.playableDuration
                    };
                })
            );
        } catch (err) {
            console.log('err getPhotos', err);
            reject(err);
        }
    });
};

interface IMediaProps {
    types: assetsTypes[];
}

export const getMedias = (media: IMediaProps): typeof emmiter => {
    const { types = ['image'] } = media;

    FILES_CONTROL.accepts = types;

    const systemPaths = Platform.OS === 'android' ? ANDROID_PATHS : IOS_PATHS;

    FILES_CONTROL.files = [];
    FILES_CONTROL.rawFiles = [];
    FILES_CONTROL.page = 0;

    emmiter?.removeAllListeners();

    // event to fetch files
    emmiter.addListener('fetch', async (album) => {
        if (Platform.OS === 'android') {
            let paths = album
                ? [systemPaths[album]]
                : Object.values(systemPaths);

            paths = paths.reduce((acc, val) => {
                if (typeof val === 'string') {
                    acc.push(val);
                } else {
                    for (const type in val) {
                        if (types.indexOf(type) > -1) {
                            acc = [
                                ...acc,
                                ...(typeof val[type] === 'string'
                                    ? [val[type]]
                                    : val[type])
                            ];
                        }
                    }
                }

                return acc;
            }, []);

            if (album) {
                FILES_CONTROL.files = FILES_CONTROL.files.filter((file) =>
                    paths.some((path) => file.path.indexOf(path) > -1)
                );
                emmiter.emit(
                    'loadPage',
                    FILES_CONTROL.files.slice(0, FILES_CONTROL.size)
                );
            }

            fetchPaths(paths);
        } else {
            emmiter.addListener('page', async (page) => {
                const finalSize =
                    page * FILES_CONTROL.size + FILES_CONTROL.size;

                const photos = await getPhotosCameraRoll({
                    album,
                    size: finalSize
                });

                emmiter.emit('loadPage', photos);
            });

            emmiter.emit('page', 0);
        }
    });

    return emmiter;
};
