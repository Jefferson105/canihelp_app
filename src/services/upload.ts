import { SERVICE_URL } from '@env';
import { Logger } from '@services/logger';
import api from './api';

const logger = new Logger('UPLOAD');

type BuckerFolders =
    | 'users'
    | 'social'
    | 'shared'
    | 'portfolio'
    | 'document'
    | 'chat';

interface UploadFileProps {
    fileName: string;
    uri: string;
    type: string;
    folder: BuckerFolders;
    token: string;
    path?: string;
    data?: object;
}

export const uploadFile = async ({
    fileName,
    uri,
    type,
    folder,
    token,
    path = '/upload-file',
    data = {}
}: UploadFileProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        let res;

        try {
            logger.log(`\x1b[36m${SERVICE_URL + path}\x1b[0m`);

            const key = `${new Date().getTime().toString()}${fileName}`;

            const body = new FormData();

            const fileData = {
                File: {
                    uri,
                    type,
                    name: key
                },
                Folder: folder,
                Key: key,
                Type: type
            };

            for (const fileKey in fileData) {
                body.append(fileKey, fileData[fileKey]);
            }

            if (Object.keys(data).length)
                for (const dataKey in data) {
                    body.append(dataKey, data[dataKey]);
                }

            res = await fetch(SERVICE_URL + path, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body
            });

            const upload = await res.json();

            resolve(upload.data);
        } catch (err) {
            console.log('upload err', err.message, res);
            reject(err);
        }
    });
};

interface PostFilesUpload {
    images?: Array<string>;
    video?: string;
    token: string;
}

export const postFilesUpload = ({
    images,
    video,
    token
}: PostFilesUpload): Promise<{
    Images?: Array<string>;
    Video?: string;
    Thumb?: string;
}> => {
    return new Promise(async (resolve, reject) => {
        const body = new FormData();

        const data: any = [];

        if (images?.length) {
            for (const image of images) {
                data.push({
                    key: 'Images',
                    data: {
                        uri: image,
                        type: 'image/jpeg',
                        name: `${new Date().getTime().toString()}.jpg`
                    }
                });
            }
        }

        if (video) {
            data.push({
                key: 'Videos',
                data: {
                    uri: video,
                    type: 'video/mp4',
                    name: `video-${new Date().getTime().toString()}.mp4`
                }
            });
        }

        for (const item of data) {
            body.append(item.key, item.data);
        }

        try {
            logger.log(`\x1b[36m${SERVICE_URL + '/posts-urls'}\x1b[0m`);

            const res = await fetch(SERVICE_URL + '/posts-urls', {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                },
                body
            });

            const upload = await res.json();

            resolve(upload.data);
        } catch (err) {
            console.log('@postFilesUpload err', err);
            reject(err);
        }
    });
};

export const deleteUpload = async (
    file: string,
    folder: BuckerFolders,
    token: string
): Promise<void> => {
    let fileName = file;
    if (fileName?.includes('https://s3.us-west-1.wasabisys.com/canihelp/')) {
        fileName = fileName.split(
            `https://s3.us-west-1.wasabisys.com/canihelp/${folder}/`
        )[1];
    }

    return api(SERVICE_URL, '/upload-file', {
        headersOptions: {
            Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: {
            Folder: folder,
            FileName: fileName
        }
    });
};
