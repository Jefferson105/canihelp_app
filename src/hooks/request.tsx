import { useCallback, useEffect, useReducer, useState } from 'react';

import { useSelector, useDispatch, globalState } from '@context/index';
import { Logger } from '@services/logger';
import { API_URL } from '@env';
import useRequestReducer, {
    SET_DATA,
    SET_ERROR,
    SET_FETCHED,
    SET_FETCHING,
    SET_LOADING
} from '@context/reducers/local/request';

const logger = new Logger('API');

interface IPropsRequest {
    name: string | null;
    alias?: string | null;
    params?: Record<string, any>;
    type?: 'default' | 'cursor';
    size?: number;
    cacheFirst?: boolean;
    refetching?: boolean;
}

// TODO: update page in state
let page = 0;
const online = {};

const useRequest = ({
    name,
    params = {},
    alias = null,
    type = 'default',
    size = 30,
    cacheFirst = true,
    refetching = true
}: IPropsRequest) => {
    const dispatch = useDispatch();

    const contextkey = alias || name;

    const {
        user,
        info: { isConnected },
        [contextkey]: cachedData
    } = useSelector((state) => ({
        user: state.user,
        info: state.info,
        [contextkey]: state[contextkey]
    }));

    const token = user?.Token;

    const [{ data, loading, fetching, fetched, error }, dispatchR] = useReducer(
        useRequestReducer,
        {
            data: { list: [], pagination: {} },
            loading: !!name,
            fetching: !!name,
            fetched: false,
            error: null
        }
    );

    const [rParams, setParams] = useState(params || {});

    const mutate = useCallback(
        async (mutator?: Function, revalidate = true) => {
            if (!name) {
                dispatchR({ type: SET_LOADING, data: false });
                dispatchR({ type: SET_FETCHING, data: false });
                return;
            }

            // set cached data if exists
            if (loading && cachedData?.list?.length && cacheFirst) {
                dispatchR({ type: SET_DATA, data: cachedData });
                dispatchR({ type: SET_LOADING, data: false });
                dispatchR({ type: SET_FETCHING, data: false });

                if (!refetching) return;
            }

            // send cached data to mutator
            if (mutator) {
                const mutatedList = mutator(globalState[contextkey].list);

                dispatchR({
                    type: SET_DATA,
                    data: {
                        ...data,
                        list: mutatedList
                    }
                });
                dispatch({
                    [contextkey]: {
                        ...data,
                        list: mutatedList,
                        mutate
                    }
                });
            }

            if (!isConnected) {
                dispatchR({ type: SET_LOADING, data: false });
                dispatchR({ type: SET_FETCHING, data: false });
                return;
            }

            if (!revalidate) return;

            try {
                let paginatedData = [];
                let pagination = {};

                switch (type) {
                    default:
                        for (let i = 0; i <= page; i++) {
                            const url = API_URL + name;

                            logger.log(`\x1b[36m${url}\x1b[0m`);
                            const response = await fetch(url, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: 'Bearer ' + token
                                },
                                body: JSON.stringify({
                                    pagination: { size, page: i },
                                    params
                                })
                            });

                            const res = await response.json();

                            if (res.success === false) throw res.err;

                            paginatedData = paginatedData.concat(res.data);

                            if (i === page) pagination = res.pagination;
                        }
                }

                dispatchR({ type: SET_FETCHED, data: null });

                const finalData = {
                    list: paginatedData,
                    pagination
                };

                dispatch({
                    [contextkey]: { ...finalData, mutate }
                });
                dispatchR({ type: SET_DATA, data: finalData });
            } catch (err) {
                console.log('Error function', err, name);
                dispatchR({ type: SET_ERROR, data: err });
                logger.error(JSON.stringify(err));
            } finally {
                dispatchR({ type: SET_LOADING, data: false });
                dispatchR({ type: SET_FETCHING, data: false });
            }
        },
        [
            name,
            loading,
            cachedData,
            cacheFirst,
            isConnected,
            refetching,
            data,
            dispatch,
            contextkey,
            type,
            token,
            size,
            params
        ]
    );

    const addPage = useCallback(() => {
        page += 1;
        dispatchR({ type: SET_FETCHING, data: true });
        mutate();
    }, [mutate]);

    useEffect(() => {
        page = 0;

        if (online[contextkey]) mutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isConnected) {
            /*
                call mutate if contextkey is false
                also works as first call
            */
            if (!online[contextkey]) {
                online[contextkey] = new Date();
                mutate();
            }
        } else {
            // set contextkey to false
            online[contextkey] = false;
        }
    }, [contextkey, isConnected, mutate]);

    useEffect(() => {
        // mutate again if params change
        if (JSON.stringify(params) !== JSON.stringify(rParams) && name) {
            dispatchR({ type: SET_LOADING, data: true });
            dispatchR({ type: SET_FETCHING, data: true });
            setParams(params);

            /*
                Call mutate only if current time is diferent from first call time
                TODO: improve this approach
            */
            if (Number(new Date()) - Number(online[contextkey]) > 50) mutate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params, rParams]);

    return {
        data,
        addPage,
        error,
        loading,
        fetching,
        mutate,
        page,
        fetched
    };
};

export default useRequest;
