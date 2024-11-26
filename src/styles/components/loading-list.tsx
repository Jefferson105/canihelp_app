import React from 'react';

import { Loading, Text } from '@styles/index';
import { useSelector } from '@context/index';

interface LoadingListPros {
    loading: boolean;
    data: Array<object>;
    empty?: (open?) => JSX.Element;
    openCamera?: () => void;
}

const LoadingList = ({
    loading,
    data,
    empty: Empty,
    openCamera
}: LoadingListPros) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    if (!loading) {
        if (!data?.length)
            return (
                <Empty
                    open={() => {
                        openCamera();
                    }}
                />
            );

        return null;
    }

    if (data?.length && !isConnected) return null;

    if (isConnected) return <Loading overlay={false} />;
    else
        return (
            <Text>
                Sem conexão com {isConnected ? 'a Internet' : 'o servidor'}
            </Text>
        );
};

export default LoadingList;
