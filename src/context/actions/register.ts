import SplashScreen from 'react-native-splash-screen';
import { captureMessage } from '@sentry/react-native';

import { checkAuth } from '@context/actions/info';
import { createHelp } from '@context/actions/help';
import { globalState, dispatch } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import {
    ICheckCellPhoneToken,
    ICheckEmailToken
} from '@ts/interfaces/register';

export const checkEmail = (Email: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mutateApi({
                name: 'registerCheckEmail',
                params: { Email }
            });

            resolve(response.data.Valid);
        } catch (err) {
            console.log('@check email = ', err);
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@checkEmail{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};

export const checkUsername = (UserName: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mutateApi({
                name: 'registerCheckUser',
                params: { UserName }
            });

            resolve(response.data.Valid);
        } catch (err) {
            console.error('@check username = ', err);
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@checkUsername{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};

export const sendEmailToken = (Email: string, RegisterID: string = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log('Email', Email, RegisterID);

            const response = await mutateApi({
                name: 'registerSendTokenMail',
                params: { Email, RegisterID }
            });

            if (!response.success) throw response.error;

            resolve(response.data);
        } catch (err) {
            console.log('sendEmailToken', err);
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@sendEmailToken{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
            reject(err);
        }
    });
};

export const sendCellPhoneToken = (
    RegistrationID: string,
    CellPhone: string
) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mutateApi({
                name: 'registerSendTokenSMS',
                params: {
                    RegistrationID: String(RegistrationID),
                    CellPhone
                }
            });

            if (!response.success) throw response.error;
            resolve(true);
        } catch (err) {
            console.log('sendCellPhoneToken', err);

            if (typeof err === 'string') {
                reject({ message: err });
            } else {
                const userName = globalState?.user?.Name || null;
                captureMessage(
                    `@sendCellPhoneToken{${new Date().toLocaleDateString(
                        'pt-BR'
                    )}}{${userName}}`
                );
            }
        }
    });
};

export const checkEmailToken = ({
    RegistrationID,
    Token,
    Email
}: ICheckEmailToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await mutateApi({
                name: 'registerCheckTokenMail',
                params: { RegistrationID, Email, Token }
            });

            if (!response.success) throw response.error;
            resolve(true);
        } catch (err) {
            console.log('checkEmailToken', err);
            reject({ message: err });

            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@checkEmailToken{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const checkCellPhoneTokenAndFinishRegister = ({
    Token,
    CellPhone,
    UserData,
    RegistrationID
}: ICheckCellPhoneToken) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { data, success, error } = await mutateApi({
                name: 'registerCheckTokenPhone',
                params: {
                    CellPhone,
                    Token,
                    UserData,
                    RegistrationID
                }
            });

            if (!success) throw error;

            dispatch({
                user: data
            });

            setTimeout(() => {
                checkAuth();
            }, 50);

            resolve(data);
        } catch (err) {
            console.log('checkCellPhoneTokenAndFinishRegister', err);

            reject({ message: err });

            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@checkCellPhoneTokenAndFinishRegister{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const navigateAfterAction = ({ currentParams }) => {
    return new Promise(async (resolve, reject) => {
        try {
            SplashScreen.show();

            // Diretamente do globalState, pegamos os dados que precisamos
            const { createHelp: helpData, profile } = globalState;

            switch (currentParams.next) {
                case 'Help':
                    if (helpData) {
                        const helpInfo = helpData;

                        delete helpInfo.category;
                        delete helpInfo.location;

                        const helpRes = await createHelp(helpInfo);

                        resolve({
                            route: 'HelpFull',
                            params: {
                                helpID: String(helpRes._id),
                                goHelp: true
                            }
                        });
                    }
                    break;
                case 'Profile':
                    if (profile?.list[0]) {
                        resolve({
                            route: 'Profile',
                            params: {
                                user: String(profile?.list[0]?._id)
                            }
                        });
                    }
                    break;
                case 'SearchResult':
                    resolve({
                        route: 'SearchResult',
                        params: {}
                    });
                    break;
                default:
                    reject({ message: 'Invalid navigation parameter.' });
            }
        } catch (err) {
            console.error('Error in navigateAfterAction', err);
            reject({ message: err.message || 'Navigation error' });
        }
    });
};
