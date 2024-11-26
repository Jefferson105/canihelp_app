import { useCallback, useMemo } from 'react';

import useArchive from '@hooks/archive-request';
import useRequest from '@hooks/request';

interface IRequestAndArchive {
    name: string;
    cacheFirst?: boolean;
    params: object;
    size: number;
    path: string;
    query: string;
    alias?: string;
}

const useRequestAndArchive = ({
    name,
    cacheFirst,
    params,
    size,
    path,
    query,
    alias
}: IRequestAndArchive) => {
    const {
        data: { list, pagination },
        addPage,
        fetching,
        loading
    } = useRequest({
        name,
        cacheFirst,
        params,
        size,
        alias
    });

    const fetchInArchive = useMemo(() => {
        return list.length > 500 && !pagination?.next;
    }, [list.length, pagination]);

    const {
        data: { list: listArchive, pagination: archivePag },
        addPage: addPageArchive,
        fetching: fetchingArchive,
        loading: loadingArchive
    } = useArchive({
        name: fetchInArchive ? name : null,
        alias,
        path,
        params: query,
        size
    });

    const onAddPage = useCallback(() => {
        if (fetchInArchive) addPageArchive();
        else addPage();
    }, [addPage, addPageArchive, fetchInArchive]);

    return {
        data: {
            list: list.concat(listArchive),
            pagination: fetchInArchive ? archivePag : pagination
        },
        addPage: onAddPage,
        loading: loading || loadingArchive,
        fetching: fetching || fetchingArchive
    };
};

export default useRequestAndArchive;
