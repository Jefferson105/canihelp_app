import ImageResizer from 'react-native-image-resizer';

import { showError } from '@utils/index';
import { captureMessage } from '@sentry/react-native';
import { deleteUpload, uploadFile } from '@services/upload';
import { mutateApi } from '@services/mutate-api';
import { globalState } from '@context/index';

export const addPortfolio = (imageData) => {
    return new Promise(async (resolve, reject) => {
        if (!imageData?.length) {
            reject('No image data provided.');
            return;
        }

        const {
            profile: {
                list: [profile],
                mutate
            },
            user
        } = globalState;

        const Images = imageData.map((img, i) => ({
            _id: String(Date.now()) + i,
            Url: img.uri,
            isLoading: true
        }));

        // Real-time update
        profile.Portfolio = [...profile.Portfolio, ...Images];

        mutate(() => [profile], false);

        try {
            // TODO: send all data with a single request
            for (let i = 0; i < imageData.length; i++) {
                const image = imageData[i];

                const resized = await ImageResizer.createResizedImage(
                    image.uri,
                    800,
                    600,
                    'JPEG',
                    100
                );

                const url = await uploadFile({
                    fileName: image.name,
                    folder: 'portfolio',
                    type: image.type,
                    uri: resized.uri,
                    token: user.Token
                });

                Images[i].Url = url;
            }

            const { data } = await mutateApi({
                name: 'profileAddPortfolio',
                params: { Images }
            });

            console.log('Portfolio', data);

            profile.Portfolio = data;

            mutate(() => [profile], false);

            resolve(true);
        } catch (err) {
            if (File.length > 0) {
                for (const image of imageData) {
                    await deleteUpload(image.Url, 'portfolio', user.Token);
                }
            }
            showError(err, 'add_portfolio');
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@addPortfolio{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};

export const removePortfolio = (id: string) => {
    return new Promise(async (resolve, reject) => {
        const {
            profile: {
                list: [profile],
                mutate
            }
        } = globalState;

        try {
            const portfolio = profile.Portfolio.filter(
                (portfolio) => portfolio._id !== id
            );

            profile.Portfolio = portfolio;

            mutate(() => [profile], false);

            await mutateApi({
                name: 'profileRemovePortfolio',
                params: { id: String(id) }
            });

            resolve(true);
        } catch (err) {
            console.log('remove_portfolio', err);
            showError(err, 'remove_portfolio');
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@removePortfolio{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};

export const followProfile = (UserID: string) => {
    return new Promise(async (resolve, reject) => {
        const {
            profile: {
                list: [profile],
                mutate
            }
        } = globalState;

        const { Following, Follows } = profile;

        try {
            mutate(
                () => [
                    {
                        ...profile,
                        Following: !Following,
                        Follows: Following ? Follows - 1 : Follows + 1
                    }
                ],
                false
            );

            await mutateApi({
                name: 'profileFollow',
                params: { FollowID: UserID }
            });

            resolve(true);
        } catch (err) {
            showError(err, 'follow_profile');
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@followProfile{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};
