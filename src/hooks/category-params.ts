import { useMemo } from 'react';

import { useSelector } from '@context/index';
import { getChildCategories } from '@utils/search';

const useCategoryParams = (filter) => {
    const {
        search: { category, location, subCategory, distance, online, review },
        categories
    } = useSelector(({ search, categories }) => ({
        search,
        categories
    }));

    const childCategories = useMemo(() => {
        if (category?.ParentID) return [];

        return category?.Childs;
    }, [category]);

    const currentCategory = useMemo(() => {
        if (!category) return null;

        if (category?.self) return category?.similars;

        if (subCategory && childCategories && childCategories[filter]) {
            return getChildCategories(
                categories,
                childCategories[filter]?._id
            )?.map((c) => c._id);
        }

        if (category.Type === 'primary') {
            return getChildCategories(categories, category._id)?.map(
                (c) => c._id
            );
        }

        return category._id;
    }, [category, subCategory, childCategories, filter, categories]);

    return {
        params: {
            CategoryID: currentCategory,
            Main: category?.self ? null : category?._id,
            distance: parseInt(distance || 50, 10),
            review,
            online,
            Location: location?.latitude
                ? {
                      Lat: Number(location?.latitude),
                      Lon: Number(location?.longitude)
                  }
                : null
        },
        childCategories,
        currentCategory: category
    };
};

export default useCategoryParams;
