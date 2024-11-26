import { captureException } from '@sentry/react-native';
import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { launchCamera } from 'react-native-image-picker';

interface CameraAppProps {
    onClose: () => void;
    onCaptureImg: (any: any) => void;
    onCaptureVideo?: (uri: string, time: number) => void;
    onAddImg?: () => void;
    main?: 'photo' | 'video';
    canAddMoreImages?: boolean;
    canAddMoreVideos?: boolean;
}

const MAX_VIDEO_DURATION_SECONDS = 30;

const CameraApp = ({
    onClose,
    onCaptureImg,
    onCaptureVideo,
    main = 'photo'
}: CameraAppProps) => {
    useEffect(() => {
        (async () => {
            try {
                if (main === 'photo') {
                    const res = await launchCamera({
                        mediaType: 'photo',
                        maxWidth: 600,
                        maxHeight: 800,
                        quality: 0.8
                    });

                    if (res?.assets) {
                        onCaptureImg({
                            height: res.assets[0].height,
                            uri: res.assets[0].uri,
                            width: res.assets[0].width
                        });
                    }
                } else {
                    const res = await launchCamera({
                        mediaType: 'video',
                        videoQuality: 'medium',
                        durationLimit: MAX_VIDEO_DURATION_SECONDS
                    });

                    if (res?.assets) {
                        onCaptureVideo(
                            res.assets[0].uri,
                            res.assets[0].duration
                        );
                    }
                }
            } catch (err) {
                console.log('@camera err ', main, err);
                Alert.alert('Erro ao capturar nova foto', err);
                captureException(err);
            } finally {
                onClose();
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [main]);

    return <></>;
};

export default CameraApp;
