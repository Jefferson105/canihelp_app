import { captureMessage } from '@sentry/react-native';

import { showError } from '@utils/index';
import { mutateApi } from '@services/mutate-api';
import { globalState } from '@context/index';

export const toggleContact = async (userData) => {
    try {
        mutateApi({
            name: 'contactsToggle',
            params: { ContactID: userData._id }
        });
    } catch (err) {
        showError(err, 'toggle_contact');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@toggleContact{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
