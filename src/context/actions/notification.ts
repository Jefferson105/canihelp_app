import { globalState } from '@context/index';
import { captureMessage } from '@sentry/react-native';
import { showError } from '@utils/index';
import { mutateApi } from '@services/mutate-api';

export const readNotification = (id: string) => async () => {
    const { list, mutate } = globalState.notifications || {};

    try {
        if (mutate)
            mutate(
                () =>
                    list.map((n) =>
                        n._id === id ? { ...n, Viewed: true } : n
                    ),
                false
            );

        const { success, error } = await mutateApi({
            name: 'notificationsRead',
            params: { notificationID: id }
        });

        if (!success) throw error;
    } catch (err) {
        showError(err, 'read_notification');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@toggleBlock{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
