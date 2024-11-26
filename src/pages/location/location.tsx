import React, { useCallback, useState, useEffect } from 'react';
import {
    useRoute,
    useNavigation,
    useIsFocused,
    RouteProp
} from '@react-navigation/native';

import SearchLocation from '@components/search-location';

import { Loading } from '@styles/index';

import { searchLocation } from '@context/actions/location';
import {
    searchDispatch,
    socialDispatch,
    locationDispatch
} from '@context/dispatches';

type RouteParams = {
    params: {
        next: 'Home' | 'Social' | 'SearchResult' | 'MultiProHelp';
        pass?: any;
    };
};

const Location = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();
    const { next, pass = null } = params;

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSelect = useCallback(
        async (addr) => {
            setLoading(true);

            try {
                const location = await searchLocation(addr);

                switch (next) {
                    case 'Social':
                        socialDispatch({
                            location: location,
                            from: 'search'
                        });
                        break;
                    case 'SearchResult':
                    case 'MultiProHelp':
                        searchDispatch({ location });
                        break;
                    default:
                        locationDispatch({ coords: location, from: 'search' });
                        searchDispatch({ location });
                }

                setLoading(false);

                navigation.navigate(next, pass);
            } catch (err) {
                setLoading(false);
                console.log('@location, err = ', err);
                navigation.navigate('Home');
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [navigation, params]
    );

    if (loading) return <Loading />;

    if (!isFocused) return null;

    return (
        <SearchLocation
            isModal={false}
            onSelect={handleSelect}
            typeSearch="any"
        />
    );
};

export default Location;
