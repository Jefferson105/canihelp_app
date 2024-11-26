import { captureMessage } from '@sentry/react-native';

import { sendSearchMetadata } from '@context/actions/socket';
import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';

export const incrementCategory = (categoryID) => {
    return new Promise(async (resolve, reject) => {
        try {
            await mutateApi({
                name: 'categoriesInc',
                params: {
                    _id: String(categoryID)
                }
            });

            sendSearchMetadata(categoryID);

            resolve(true);
        } catch (err) {
            console.log('incrementCategory', err);

            reject({ message: err });

            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@incrementCategory{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};
