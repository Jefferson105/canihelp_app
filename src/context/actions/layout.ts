import { dispatch } from '@context/index';
import { IToastMessage } from '@ts/interfaces/state';

export const addToast = ({
    type,
    title,
    description,
    showProgress = false,
    visibleTime = 3000,
    action,
    actionLabel
}: IToastMessage) => {
    const id = new Date().getTime().toString();

    const toast = {
        id,
        type,
        title,
        description,
        showProgress,
        visibleTime,
        action,
        actionLabel
    };

    dispatch(({ layout }) => {
        return {
            layout: {
                ...layout,
                toast: [...layout.toast, toast]
            }
        };
    });

    return id;
};

export const removeToast = (data) => {
    dispatch(({ layout }) => {
        return {
            layout: {
                ...layout,
                toast: layout.toast.filter((toast) => toast.id !== data)
            }
        };
    });
};
