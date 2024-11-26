import React, { useState, useCallback } from 'react';
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    RefreshControl
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import UserRender from '@components/search/user';
import Empty from '@components/empty-data/professional';
import Filter from '@components/shared/filter';
import Header from '@components/search/header';
import { useSelector } from '@context/index';
import useCategoryParams from '@hooks/category-params';
import useRequest from '@hooks/request';

import {
    SafeView,
    Container as Line,
    Text,
    BorderVertical,
    Tag,
    Loading
} from '@styles/index';
import { mainColor } from '@styles/colors';

import { searchLocation } from '@context/actions/location';
import { setCategory } from '@context/actions/categories';
import { searchDispatch, socialDispatch } from '@context/dispatches';

const ProfessionalSearchResult = () => {
    const isFocused = useIsFocused();
    const {
        search: {
            category,
            location,
            subCategory,
            distance,
            maxDistance,
            online,
            review
        },
        info: { isConnected }
    } = useSelector(({ search, info }) => ({
        search,
        info
    }));

    const [refreshing, setRefreshing] = useState(false);
    const [filter, setFilter] = useState(null);
    const [all, setAll] = useState(true);

    const { params, childCategories, currentCategory } =
        useCategoryParams(filter);

    const {
        data: { list: professionals, pagination },
        addPage,
        fetching,
        loading,
        mutate
    } = useRequest({
        name: 'usersSearch',
        cacheFirst: false,
        params,
        size: 50
    });

    const onRefresh = useCallback(async () => {
        setRefreshing(true);

        try {
            mutate();
        } catch (err) {
            console.log('@professional-search-result, onRefresh, err = ', err);
        } finally {
            setRefreshing(false);
        }
    }, [mutate]);

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Line dir="row" marg="10px 10px 0px 0px">
                    {index === 0 && (
                        <Line dir="row" marg="0px 10px 0px 24px">
                            <Tag
                                backGroundColor={all ? '#FF6F5C' : '#fff'}
                                borderColor="#fa1616"
                                text="Todos"
                                press={() => {
                                    setAll(true);
                                    setFilter(null);
                                }}
                            />
                        </Line>
                    )}

                    <Tag
                        backGroundColor={index === filter ? '#FF6F5C' : '#fff'}
                        borderColor="#fa1616"
                        text={item.Name}
                        press={() => {
                            if (index !== filter) {
                                setFilter(index);
                                if (all) setAll(false);

                                setCategory({
                                    category: item._id ? item : null,
                                    sub: true
                                });
                            }
                        }}
                    />
                </Line>
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filter]
    );

    const renderItemS = useCallback(
        ({ item }) => {
            return (
                <UserRender
                    item={item}
                    category={category}
                    subCategory={subCategory}
                    childCategories={childCategories}
                />
            );
        },
        [category, childCategories, subCategory]
    );

    const keyExtractor = useCallback((_, i) => {
        return i.toString();
    }, []);

    const keyExtractorS = useCallback((item) => {
        if (item?._id) {
            return item._id;
        }
        return Math.random().toString();
    }, []);

    const searchFilter = async (
        distance,
        latitude,
        longitude,
        onlineSearch,
        reviewSearch
    ) => {
        socialDispatch({ filter: false });

        try {
            const location = await searchLocation({
                latitude,
                longitude
            });

            searchDispatch({
                distance,
                online: onlineSearch,
                review: reviewSearch
            });
            searchDispatch({ location });
        } catch (err) {
            console.log(
                '@professional-search-result, searchFilter, err = ',
                err
            );
        }
    };

    const onScroll = ({
        nativeEvent
    }): NativeSyntheticEvent<NativeScrollEvent> => {
        if (!isConnected) return;

        const contentHeight =
            nativeEvent.contentSize.height -
            nativeEvent.layoutMeasurement.height;

        if (
            contentHeight - nativeEvent.contentOffset.y < 50 &&
            !fetching &&
            !loading &&
            professionals.length < pagination.total
        ) {
            addPage();
        }
    };

    return (
        <SafeView>
            <Header
                hasProfessionals={professionals.length}
                currentCategory={currentCategory}
                filter={filter}
            />
            <BorderVertical type="bottom" />
            <Line color="#fff">
                <FlatList
                    data={childCategories}
                    keyExtractor={keyExtractor}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    renderItem={renderItem}
                />
            </Line>
            {!!(pagination.total > 0) && (
                <Line color="#fff" pad="10px 24px">
                    <Text size={14}>
                        <Text color="#FF6F5C" size={14}>
                            {pagination.total < 10
                                ? '0' + pagination.total
                                : pagination.total}
                        </Text>{' '}
                        resultados
                        {' em '}
                        <Text
                            size={14}
                            weight="bold"
                            decoration={
                                currentCategory?.self ? 'underline' : 'none'
                            }
                        >
                            {currentCategory?.Name}
                        </Text>
                    </Text>
                </Line>
            )}
            <Filter
                visible={isFocused}
                distance={distance || 50}
                location={location}
                online={online}
                review={review}
                professional={true}
                onSubmit={searchFilter}
                maxDistance={maxDistance}
            />

            <FlatList
                onScroll={onScroll}
                style={{ paddingLeft: 24, paddingRight: 24 }}
                contentContainerStyle={{ paddingBottom: 70 }}
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    (loading || fetching) && <Loading overlay={false} />
                }
                ListEmptyComponent={!loading && !fetching && <Empty />}
                data={professionals}
                keyExtractor={keyExtractorS}
                renderItem={renderItemS}
            />
        </SafeView>
    );
};

export default ProfessionalSearchResult;
