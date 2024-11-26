import React, { useCallback, useMemo } from 'react';
import { FlatList } from 'react-native';

import Category from '@components/home/category';
import { useSelector } from '@context/index';

const Categories = () => {
    const { categories } = useSelector(({ categories }) => ({
        categories
    }));

    const list = useMemo(() => {
        return categories
            .filter((c) => c.Type === 'primary')
            .map((c) => ({
                ...c,
                Childs: categories.filter(
                    (category) => category.ParentID === c._id
                )
            }))
            .sort((a, b) => a.Name.localeCompare(b.Name));
    }, [categories]);

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Category
                item={item}
                index={index}
                bgColor={
                    item.Styles?.BgColor ? item?.Styles?.BgColor : undefined
                }
                iconColor={
                    item.Styles?.IconColor ? item?.Styles?.IconColor : undefined
                }
            />
        );
    }, []);

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
            data={list}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
        />
    );
};

export default Categories;
