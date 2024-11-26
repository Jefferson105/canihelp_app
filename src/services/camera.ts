import { launchCamera } from 'react-native-image-picker';

const MAX_VIDEO_DURATION_SECONDS = 30;

export const takePhoto = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await launchCamera({
                mediaType: 'photo',
                maxWidth: 600,
                maxHeight: 800,
                quality: 0.8
            });

            if (res?.assets) {
                resolve({
                    height: res.assets[0].height,
                    uri: res.assets[0].uri,
                    width: res.assets[0].width
                });
            } else {
                throw 'No image';
            }
        } catch (err) {
            reject(err);
        }
    });
};

export const recordVideo = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await launchCamera({
                mediaType: 'video',
                videoQuality: 'medium',
                durationLimit: MAX_VIDEO_DURATION_SECONDS
            });

            if (res?.assets) {
                resolve({
                    uri: res.assets[0].uri,
                    duration: res.assets[0].duration
                });
            } else {
                throw 'No video';
            }
        } catch (err) {
            reject(err);
        }
    });
};
