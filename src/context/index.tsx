import React, {
    createContext,
    useContext,
    useMemo,
    useEffect,
    useState,
    useReducer,
    Dispatch
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';

import flexReducer, { ActionType } from '@context/reducer';
import { rootState, registerPro } from '@context/state';

import { appListeners, checkAuth } from '@context/actions/info';
import { IState } from '@ts/interfaces/state';

export let globalState: IState = rootState;
export let dispatch: Dispatch<ActionType> = () => {};

export const StateContext = createContext<[IState, Function]>([
    rootState,
    Function
]);

export const StateProvider = ({
    children
}: {
    children: JSX.Element | React.ReactNode;
}) => {
    const [state, dispatchReducer] = useReducer(flexReducer, rootState);
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        dispatch = dispatchReducer;

        (async () => {
            const root = JSON.parse(await AsyncStorage.getItem('root'));

            const { isInternetReachable } = await NetInfo.fetch();

            dispatch({
                ...rootState,
                ...root,
                info: {
                    ...(root?.info ? root.info : rootState.info),
                    isConnected:
                        typeof isInternetReachable === 'boolean'
                            ? isInternetReachable
                            : true,
                    firstAccess: !root,
                    storageChecked: true
                }
            });

            setVerified(true);

            appListeners();
            checkAuth();
        })();
    }, [dispatchReducer]);

    useEffect(() => {
        globalState = state;

        if (!verified) return;

        AsyncStorage.setItem(
            'root',
            JSON.stringify({
                ...state,
                verification: {
                    type: null,
                    selfie: null,
                    doc_front: null,
                    doc_back: null,
                    contract: null,
                    doc_type: null,
                    proof: null
                },
                info: {
                    ...state.info,
                    onlineUsers: [],
                    checkingAuth: true,
                    firstAccess: false,
                    storageChecked: false
                },
                layout: rootState.layout,
                help: null,
                registerPro
            })
        );
    }, [state, verified]);

    return (
        <StateContext.Provider value={[state, dispatchReducer]}>
            {children}
        </StateContext.Provider>
    );
};

export const useAppState = () => useContext(StateContext);

export const useSelector = (fn: (obj: IState) => any): any => {
    const [state] = useContext(StateContext);

    return useMemo(() => {
        return fn(state);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state]);
};

export const useDispatch = () => {
    return dispatch;
};
