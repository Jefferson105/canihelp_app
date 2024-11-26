import ImageResizer from 'react-native-image-resizer';
import { captureMessage } from '@sentry/react-native';

import { deleteUpload, uploadFile } from '@services/upload';
import { mutateApi } from '@services/mutate-api';
import { globalState } from '@context/index';
import { userDispatch } from '@context/dispatches';
import { IUserUpdate } from '@ts/interfaces/user';

export const updateUser = (
    user: Partial<IUserUpdate>,
    profile = true,
    setPhoto = null
) => {
    const { user: authUser } = globalState;

    return new Promise(async (resolve, reject) => {
        try {
            if (user.Photo) {
                const resized = await ImageResizer.createResizedImage(
                    user.Photo.uri,
                    800,
                    600,
                    'JPEG',
                    100
                );

                const Url = await uploadFile({
                    fileName: user.Photo.name,
                    folder: 'users',
                    type: user.Photo.type,
                    uri: resized.uri,
                    token: authUser?.Token
                });

                user.Photo = Url as any;
            }

            const { success, data, error } = await mutateApi({
                name: 'profileUpdate',
                params: user
            });

            if (!success) throw error;

            userDispatch(data);

            if (profile) {
                const { profile } = globalState;
                if (setPhoto) setPhoto(user.Photo);
                if (profile?.mutate) profile.mutate(() => [data], false);
            }

            resolve(data);
        } catch (err) {
            if (user.Photo) {
                await deleteUpload(String(user.Photo), 'users', user.Token);
            }

            reject(err);

            const userName = user?.Name || null;
            captureMessage(
                `@updateUser{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const searchUsers = async (UserName: string) => {
    try {
        const { success, data, error } = await mutateApi({
            name: 'usersMarksSearch',
            params: {
                UserName,
                limit: 5
            }
        });

        if (!success) throw error;

        return data;
    } catch (err) {
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@searchUsers{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const subscribeNotifications = async () => {
    try {
        const { success, data, error } = await mutateApi({
            name: 'subscribeMail'
        });

        if (!success) throw error;

        userDispatch({
            MailNotification: {
                Cancelled: false
            }
        });

        return data;
    } catch (err) {
        console.error('@subscribeNotifications', err);
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@subscribeNotifications{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
