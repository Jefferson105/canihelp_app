import { captureMessage } from '@sentry/react-native';

import { Logger } from '@services/logger';
import { API_URL, APP_VERSION } from '@env';
import { globalState } from '@context/index';

const logger = new Logger('API MUTATE');

interface mutateApiProps {
    name: string;
    params?: object;
}

export const mutateApi = async ({
    name,
    params = {}
}: mutateApiProps): Promise<{ success?: boolean; data?: any; error?: any }> =>
    new Promise(async (resolve, reject) => {
        const user = globalState?.user;

        try {
            logger.log(`\x1b[36m${API_URL + name}\x1b[0m`);

            const response = await fetch(`${API_URL}${name}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user?.Token}_version=${APP_VERSION}`
                },
                method: 'POST',
                body: JSON.stringify({
                    params
                })
            });

            const responseFormated = await response.json();

            if (!responseFormated.success) throw responseFormated.error;

            resolve(responseFormated);
        } catch (err) {
            reject(err);
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@mutateApi{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
