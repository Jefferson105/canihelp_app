import { captureMessage } from '@sentry/react-native';
import { showError } from '@utils/index';
import { globalState, dispatch } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import { searchDispatch } from '@context/dispatches';

export const getCategories = async () => {
    try {
        const { success, data, error } = await mutateApi({
            name: 'categoriesDefault'
        });

        if (!success) throw error;
        dispatch({ categories: data });
    } catch (err) {
        showError(err, 'getCategories');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@getCategoriess{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const saveSpecialty = async () => {
    return new Promise(async (resolve, reject) => {
        const { registerPro } = globalState;

        try {
            const { success, data, error } = await mutateApi({
                name: 'categoriesAddSpecialty',
                params: {
                    Categories: registerPro.specialties
                        .filter((c: any) => c.new)
                        .map((s: any) => ({ Name: s.Name }))
                }
            });

            if (!success) throw error;

            resolve(data);
        } catch (err) {
            showError(err, 'save_specialty');
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@saveSpecialty{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject();
        }
    });
};

export const relationSpecialty = async (params) => {
    try {
        const { success, data, error } = await mutateApi({
            name: 'categoriesSaveRelations',
            params
        });

        if (!success) throw error;

        return data;
    } catch (err) {
        showError(err, 'relation_specialty');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@relationSpecialty{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

export const setCategory = ({ category, sub = false }) => {
    if (category?.Group === 'remote') {
        searchDispatch({
            distance: 999,
            maxDistance: 999
        });
    } else {
        searchDispatch({
            distance: 50,
            maxDistance: 120
        });
    }

    if (sub) {
        searchDispatch({ subCategory: sub });
    } else {
        searchDispatch({ category });
    }
};
