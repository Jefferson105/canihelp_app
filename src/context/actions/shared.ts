import { captureMessage } from '@sentry/react-native';

import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import {
    TDenunciationPostTitle,
    TDenunciationUserTitle
} from '@ts/types/denunciations';

interface IDenunciateActionDTO {
    ReceiverID: string;
    Type: 'User' | 'Post';
    Title: TDenunciationPostTitle | TDenunciationUserTitle;
    Description?: string;
    ResourceID?: string;
}

export const denunciateAction = async ({
    Description,
    ReceiverID,
    Type,
    Title,
    ResourceID
}: IDenunciateActionDTO) => {
    try {
        const { user } = globalState;

        const data = {
            SenderId: user._id,
            Description,
            ReceiverID,
            Type,
            Title,
            ...(ResourceID && { ResourceID: String(ResourceID) })
        };

        const res = await mutateApi({
            name: 'denunciationsCreate',
            params: { data: data }
        });

        if (!res) throw 'Create denunciation error';

        return res;
    } catch (err) {
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@denunciateAction{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
