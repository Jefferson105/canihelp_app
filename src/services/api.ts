import { API_URL } from '@env';

import { Logger, ReqColor } from '@services/logger';

const logger = new Logger('API');

interface CustomConfigDTO {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    body?: object;
    headersOptions?: object;
}

async function api(
    url: string = API_URL,
    endpoint: string,
    customConfig: CustomConfigDTO
) {
    const { body, method, headersOptions } = customConfig;
    try {
        logger.log(
            `[${ReqColor[customConfig.method]}${
                customConfig.method
            }\x1b[0m] ==> ${url + endpoint} `
        );
        const response = await fetch(`${url}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...headersOptions
            },
            method,
            body: JSON.stringify(body)
        });
        const responseFormated = await response.json();
        return responseFormated;
    } catch (err) {
        logger.error(`@fetch err ${url + endpoint} = `, err);
        return err;
    }
}

export default api;
