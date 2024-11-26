import { captureMessage } from '@sentry/react-native';

import { showError } from '@utils/index';
import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import { ISendRating } from '@ts/interfaces/ratings';

export const createRating = async ({
    Description,
    EvaluatedID,
    Total,
    isProReview,
    Agility,
    Cordiality,
    Price,
    Professionalism,
    Punctuality,
    Quality,
    Help
}: ISendRating) => {
    const { list, mutate } = globalState.notifications || {};

    try {
        const { success, data, error } = await mutateApi({
            name: 'ratingsCreate',
            params: {
                Description,
                EvaluatedID,
                Total,
                isProReview,
                Agility,
                Cordiality,
                Price,
                Professionalism,
                Punctuality,
                Quality,
                Help
            }
        });

        const type = isProReview ? 'rating_professional' : 'rating_client';

        if (mutate) {
            globalState.notifications.list = list.filter(
                (n) => !(n.HelpID === String(Help) && n.Type === type)
            );
        }

        if (!success) throw new Error(error);

        return data.RatingID;
    } catch (err) {
        showError(err, 'createRating');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@createRating{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
