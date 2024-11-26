import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, AppState, Platform } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { io, Socket } from 'socket.io-client';
import SplashScreen from 'react-native-splash-screen';
import { captureMessage } from '@sentry/react-native';

import { sendQueueMessages } from '@context/actions/chat';
import { SERVICE_URL } from '@env';
import { getCategories } from '@context/actions/categories';
import { socketListeners } from '@context/actions/socket';
import { UNLOG } from '@constants/index';
import { updateUser } from '@context/actions/user';
import { globalState, dispatch } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import {
    infoDispatch,
    userDispatch,
    boxConfirmDispatch,
    locationDispatch
} from '@context/dispatches';

export const login = async (User: string, Password: string) => {
    try {
        const { data, success } = await mutateApi({
            name: 'usersLogin',
            params: { User, Password }
        });

        if (!success) throw 'email:E-mail ou senha estão incorretos';

        dispatch({ user: data });

        setTimeout(() => {
            checkAuth(true);
        }, 50);

        return data;
    } catch (err) {
        console.log('login err = ', err);
        Alert.alert(typeof err === 'string' ? err : 'Verifique email e senha.');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@login{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
        throw err;
    }
};

let socket: Socket = null;

export const logout = async () => {
    try {
        SplashScreen.show();
        socket?.disconnect();
        dispatch('reset');
        await Promise.all([
            mutateApi({
                name: 'profileUpdate',
                params: { PushToken: null }
            }),
            AsyncStorage.multiRemove([
                '@Canihelp:token',
                'root',
                '@Canihelp:QueueMessages',
                'recent_searchs'
            ])
        ]);
    } catch (err) {
        console.log('@auth -> error on logout', err);
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@login{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
    } finally {
        SplashScreen.hide();
    }
};

export const checkAuth = (isLogin: boolean = false) => {
    return new Promise(async (resolve) => {
        try {
            const {
                user,
                info: { isConnected }
            } = globalState;

            if (!user?.Token) throw 'Unlloged';

            if (!isConnected) return;

            const authUser = await mutateApi({
                name: 'user'
            });

            if (!authUser) throw 'unauth';

            userDispatch(authUser.data);

            socket = io(SERVICE_URL, {
                reconnection: true,
                autoConnect: true,
                query: {
                    token: user.Token
                }
            });

            socket.on(UNLOG, () => {
                socket?.close();
                logout();
                Alert.alert(
                    'Outro login',
                    'Detectamos um outro login na sua conta'
                );
            });

            socketListeners(socket);

            if (isLogin) socket.emit('LOGIN', { platform: Platform.OS });

            updateUser(
                {
                    LastLogin: new Date()
                },
                false
            );

            resolve('auth');
        } catch (err) {
            const { user } = globalState;

            if (!user || !Object?.keys(user)?.length)
                dispatch({
                    user: null
                });

            locationDispatch({ loading: false });

            resolve('unauth');
            const userName = user?.Name || null;
            captureMessage(
                `@checkAuth{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        } finally {
            infoDispatch({ checkingAuth: false });
            getCategories();
        }
    });
};

const refetchingFeatures = () => {
    const { categories } = globalState;

    if (!categories?.length) getCategories();

    socket?.connect();
};

export const appListeners = () => {
    AppState.addEventListener('change', (nextAppState) => {
        if (globalState.layout.boxConfirm) boxConfirmDispatch(null);

        if (!socket) return;

        if (nextAppState === 'active') {
            console.log('App active');

            refetchingFeatures();
        } else {
            socket?.disconnect();
        }
    });

    NetInfo.addEventListener(async (nState) => {
        if (nState.isInternetReachable) {
            const { isConnected } = globalState.info;

            // refetch data only if previous state is false
            if (!isConnected) refetchingFeatures();

            infoDispatch({ isConnected: true });

            const queueMessages = await AsyncStorage.getItem(
                '@Canihelp:QueueMessages'
            );

            if (queueMessages) {
                sendQueueMessages(JSON.parse(queueMessages));
            }
        } else {
            try {
                await mutateApi({ name: 'ping' });
                infoDispatch({ isConnected: true });
            } catch {
                infoDispatch({ isConnected: false });
                const userName = globalState?.user?.Name || null;
                captureMessage(
                    `@login{${new Date().toLocaleDateString(
                        'pt-BR'
                    )}}{${userName}}`
                );
            }
        }
    });
};
