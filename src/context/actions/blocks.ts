import { captureMessage } from '@sentry/react-native';
import { showError } from '@utils/index';
import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';

export const toggleBlock = async (blockedUser: string) => {
    try {
        const success = await mutateApi({
            name: 'blockedsToggle',
            params: { blockedUser }
        });

        return success;
    } catch (err) {
        showError(err, 'toggle_block');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@toggleBlock{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
