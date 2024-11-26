import { useCallback, useEffect, useReducer, useState } from 'react';

import { useSelector, useDispatch } from '@context/index';

import { Logger } from '@services/logger';
import { SERVICE_URL } from '@env';
import archiveReducer, {
    SET_DATA,
    SET_ERROR,
    SET_FETCHING,
    SET_LOADING
} from '@context/reducers/local/archive-request';

const logger = new Logger('ARCHIVE REQUEST');

interface IPropsRequest {
    name: string | null;
    path: string | null;
    alias?: string | null;
    params?: string;
    type?: 'default' | 'cursor';
    size?: number;
    cacheFirst?: boolean;
    refetching?: boolean;
}

// TODO: update page in state
let page = 0;

const useArchive = ({
    name,
    path,
    params = '',
    alias = null,
    type = 'default',
    size = 30,
    cacheFirst = true,
    refetching = true
}: IPropsRequest) => {
    const dispatch = useDispatch();

    const contextkey = (alias || name) + 'archive';

    const { user, [contextkey]: cachedData } = useSelector((state) => ({
        user: state.user,
        [contextkey]: state[contextkey]
    }));

    const token = user?.Token;

    const [{ data, loading, fetching, error }, dispatchR] = useReducer(
        archiveReducer,
        {
            data: { list: [], pagination: {} },
            loading: true,
            fetching: true,
            error: null
        }
    );

    const [rParams, setParams] = useState(params);

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
                const mutatedList = mutator(cachedData?.list);

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

            if (!revalidate) return;

            try {
                let paginatedData = [];
                let pagination = {};

                switch (type) {
                    default:
                        for (let i = 0; i <= page; i++) {
                            const url =
                                SERVICE_URL +
                                path +
                                `?page=${i}&size=${size}` +
                                params;

                            logger.log(`${name} = \x1b[36m${url}\x1b[0m`);
                            const response = await fetch(url, {
                                method: 'GET',
                                headers: {
                                    Authorization: 'Bearer ' + token
                                }
                            });

                            const res = await response.json();

                            if (res.success === false) throw res.err;

                            paginatedData = paginatedData.concat(res.data);

                            if (i === page) pagination = res.pagination;
                        }
                }

                const finalData = {
                    list: paginatedData,
                    pagination
                };

                dispatch({ [contextkey]: { ...finalData, mutate } });
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
            cacheFirst,
            cachedData,
            contextkey,
            data,
            dispatch,
            loading,
            name,
            params,
            path,
            refetching,
            size,
            type,
            token
        ]
    );

    const addPage = useCallback(() => {
        switch (type) {
            default:
                page += 1;
                dispatchR({ type: SET_FETCHING, data: true });
                mutate();
        }
    }, [mutate, type]);

    useEffect(() => {
        (async () => {
            page = 0;
            mutate();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rParams]);

    useEffect(() => {
        // mutate again if params change
        if (params !== rParams) {
            dispatchR({ type: SET_LOADING, data: true });
            dispatchR({ type: SET_FETCHING, data: true });
            setParams(params);
        }
    }, [params, rParams]);

    return {
        data,
        addPage,
        error,
        loading,
        fetching,
        mutate,
        page
    };
};

export default useArchive;
