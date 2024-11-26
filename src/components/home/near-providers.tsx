import React, { useCallback } from 'react';
import { FlatList } from 'react-native';

import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { BoxProvider, NavSection } from '@styles/index';

const NearProviders = () => {
    const { location, user } = useSelector(({ location, user }) => ({
        location,
        user
    }));

    const {
        data: { list: providers }
    } = useRequest({
        name: location?.coords && user ? 'nearProviders' : null,
        params: {
            Lat: location?.coords?.latitude,
            Lon: location?.coords?.longitude
        }
    });

    const renderItem = useCallback(({ item, index }) => {
        return <BoxProvider {...item} index={index} />;
    }, []);

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    if (!providers.length) return null;

    return (
        <NavSection title="Profissionais Próximos" size={16}>
            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 37 }}
                data={providers}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
            />
        </NavSection>
    );
};

export default NearProviders;
