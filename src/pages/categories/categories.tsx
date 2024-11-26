import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SearchCategories from '@components/search-categories';
import { useSelector } from '@context/index';

import { Loading } from '@styles/index';

import { setCategory } from '@context/actions/categories';
import { incrementCategory } from '@context/actions/search';
import { socialDispatch } from '@context/dispatches';
import { ICategory } from '@ts/interfaces/categories';

type RouteProps = {
    params: {
        next?: 'SearchResult' | 'Social' | 'MultiProHelp' | 'Location';
    };
};

const Categories = () => {
    const navigation = useNavigation();

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { search } = useSelector(({ search }) => ({
        search
    }));

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleRecent = async (item) => {
        try {
            let recents = JSON.parse(
                await AsyncStorage.getItem('recent_searchs')
            );

            if (Array.isArray(recents))
                recents = recents
                    .filter((r) => String(r._id) !== String(item._id))
                    .slice(0, 4);
            else recents = [];

            recents.unshift(item);

            AsyncStorage.setItem('recent_searchs', JSON.stringify(recents));
        } catch (err) {
            console.log('@categories, handleRecente, err = ', err);
        }
    };

    const handleSelectCategory = async (item: ICategory) => {
        try {
            console.log('handleSelectCategory', item);

            if (
                (!item?.self || item?.Type === 'specialty') &&
                params?.next !== 'Social'
            ) {
                incrementCategory(item._id);
            }

            setLoading(true);

            handleRecent(item);

            if (params?.next === 'Social')
                socialDispatch({
                    category: {
                        _id: String(item._id),
                        Name: item.Name
                    }
                });
            else setCategory({ category: item });

            if (params?.next) {
                switch (params.next) {
                    case 'Location':
                        navigation.navigate(params.next, {
                            next: 'SearchResult'
                        });
                        break;

                    case 'MultiProHelp':
                        if (item.Group === 'transportation') {
                            navigation.navigate('TransportationProHelp', {
                                CategoryID: item._id
                            });
                        } else {
                            navigation.navigate('MultiProHelp');
                        }
                        break;

                    default:
                        navigation.navigate(params.next);
                        break;
                }
            } else {
                if (search.location) {
                    navigation.navigate('SearchResult');
                } else {
                    navigation.navigate('Location', {
                        next: 'SearchResult'
                    });
                }
            }

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log('@categories, search categories, err = ', err);
        }
    };

    if (loading) return <Loading />;

    return (
        <SearchCategories
            // isModal={false}
            toSearch={
                !params?.next ||
                params?.next === 'Location' ||
                params?.next === 'SearchResult' ||
                params?.next === 'MultiProHelp'
            }
            onSelect={(item) => handleSelectCategory(item)}
        />
    );
};

export default Categories;
