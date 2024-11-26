import { dispatch } from '@context/index';
import { ICreateHelp } from '@ts/interfaces/help';
import { ILocationCTX } from '@ts/interfaces/location';
import { IRegister, IRegisterPro } from '@ts/interfaces/register';
import { ISocial } from '@ts/interfaces/social';
import { IInfo, ISearch } from '@ts/interfaces/state';
import { IUserAuth } from '@ts/interfaces/user';

export const userDispatch = (data: Partial<IUserAuth>) => {
    dispatch(({ user }) => {
        return {
            user: {
                ...user,
                ...data
            }
        };
    });
};

export const infoDispatch = (data: Partial<IInfo>) => {
    dispatch(({ info }) => {
        return {
            info: {
                ...info,
                ...data
            }
        };
    });
};

export const socialDispatch = (data: Partial<ISocial>) => {
    dispatch(({ social }) => {
        return {
            social: {
                ...social,
                ...data
            }
        };
    });
};

export const searchDispatch = (data: Partial<ISearch>) => {
    dispatch(({ search }) => {
        if (data?.location) search.notFound = false;
        if (data?.category) search.subCategory = null;

        return {
            search: {
                ...search,
                ...data
            }
        };
    });
};

export const locationDispatch = (data: Partial<ILocationCTX>) => {
    dispatch(({ location }) => {
        return {
            location: {
                ...location,
                ...data
            }
        };
    });
};

export const createHelpDispatch = (data: ICreateHelp) => {
    dispatch({ createHelp: data });
};

interface boxConfirmProps {
    title: string;
    text?: string;
    confirm: () => void;
}

export const boxConfirmDispatch = (data: boxConfirmProps | null) => {
    dispatch((state) => {
        return {
            layout: {
                ...state.layout,
                boxConfirm: data
            }
        };
    });
};

interface boxReportProps {
    title: string;
    sendReport: (denunciationDescription: string) => void;
    back: any;
}

export const boxReportDispatch = (data: boxReportProps | null) => {
    dispatch((state) => {
        return {
            layout: {
                ...state.layout,
                boxReport: data
            }
        };
    });
};

export const registerDispatch = (data: Partial<IRegister>) => {
    dispatch(({ register }) => {
        return {
            register: {
                ...register,
                ...data
            }
        };
    });
};

export const registerProDispatch = (data: Partial<IRegisterPro>) => {
    dispatch(({ registerPro }) => {
        return {
            registerPro: {
                ...registerPro,
                ...data
            }
        };
    });
};

export const pendingMessageDispatch = (
    operation: 'add' | 'delete' | 'deleteOld',
    data?: any
) => {
    dispatch(({ pendingMessages }) => {
        switch (operation) {
            case 'add':
                return {
                    pendingMessages: [data, ...pendingMessages]
                };

            case 'delete':
                return {
                    pendingMessages: pendingMessages?.filter(
                        (m) => String(m._id) !== String(data)
                    )
                };

            case 'deleteOld':
                return {
                    pendingMessages: pendingMessages?.filter(
                        (m) =>
                            Number(new Date()) - Number(new Date(m.CreatedAt)) <
                            600000
                    )
                };
        }
    });
};
