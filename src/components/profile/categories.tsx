import React, { useMemo } from 'react';

import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';
import { checkConnect } from '@utils/index';

import { Container, Tag } from '@styles/index';
import { setCategory } from '@context/actions/categories';
import { incrementCategory } from '@context/actions/search';

const Categories = () => {
    const navigation = useNavigation();
    const {
        profile: {
            list: [profile]
        },
        info: { isConnected }
    } = useSelector(({ profile, info }) => ({
        profile,
        info
    }));

    const subCategories = useMemo(() => {
        return profile?.Categories?.filter((item) => !item.IsPrimary);
    }, [profile?.Categories]);

    const handlePress = (item) => {
        incrementCategory(item._id);

        setCategory({ category: item });
        navigation.navigate('SearchResult');
    };

    if (!subCategories.length) return <></>;

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <Container dir="row" pad="19px 20px 0 0 " marg="4px 0">
                {subCategories.map((item, i) => (
                    <Container marg="0 6px 0 0" key={i}>
                        <Tag
                            testID="testTagCat"
                            key={i}
                            text={item.Category.Name}
                            press={() =>
                                checkConnect.bind(
                                    {},
                                    isConnected,
                                    handlePress(item.Category)
                                )
                            }
                        />
                    </Container>
                ))}
            </Container>
        </ScrollView>
    );
};

export default Categories;
