import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SvgUri } from 'react-native-svg';
import { useSelector } from '@context/index';

import { Container, Text } from '@styles/index';
import { setCategory } from '@context/actions/categories';
import { Icon } from '@styles/icon';
interface CategoryProps {
    item: any;
    index: any;
    bgColor?: string;
    iconColor?: string;
    action?: () => void;
}

const Category = ({
    item,
    //bgColor = '#F9F2F1',
    iconColor = '#303030',
    action = null
}: CategoryProps) => {
    const navigation = useNavigation();

    const { search } = useSelector(({ search }) => ({
        search
    }));

    const size = useMemo(() => {
        const longestWord = item?.Name.split(' ').reduce(
            (longest, currentWord) => {
                return currentWord.length > longest.length
                    ? currentWord
                    : longest;
            }
        );
        return longestWord.length;
    }, [item.Name]);

    const iconProps = useMemo(() => {
        switch (item.Name) {
            case 'Pets':
            case 'Mobilidade & Transportes':
            case 'Assistência técnica':
            case 'Guincho e Reboque':
            case 'Taxi':
            case 'Mototaxi':
            case 'Bike-boy':
            case 'Motoboy':
            case 'Aluguel':
            case 'Transporte executivo':
                return {
                    fill: true
                };
            default:
                return {
                    fill: false
                };
        }
    }, [item.Name]);

    const handleCategory = useCallback(
        async () => {
            setCategory({ category: item });

            if (action) {
                action();
                return;
            }

            try {
                if (!search.location) {
                    navigation.navigate('Location', {
                        next: 'SearchResult'
                    });
                } else {
                    navigation.navigate('SearchResult');
                }
            } catch (err) {
                console.log('@categories, search categories, err = ', err);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [search]
    );

    return (
        <Container
            width={size <= 14 ? '92px' : size * 9 + 'px'}
            height="105px"
            //color={bgColor}
            marg={`0 17px 0 0`}
            //border="0.5px #F4F2F2"
            radius={10}
            align="center"
            justify="space-evenly"
            onPress={() => {
                handleCategory();
            }}
        >
            {item.Styles?.Icon ? (
                <SvgUri
                    stroke={
                        iconProps.fill ? 'transparent' : item.Styles.IconColor
                    }
                    fill={
                        iconProps.fill ? item.Styles.IconColor : 'transparent'
                    }
                    strokeWidth={1}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    uri={item.Styles.Icon}
                    width={30}
                    height={30}
                />
            ) : (
                <Icon name="back" color={iconColor} />
            )}
            <Container
                height="36%"
                width={size <= 14 ? '88px' : size * 9 - 4 + 'px'}
                align="center"
                justify="center"
            >
                <Text size={13} color="#323232" line={16} align="center">
                    {item.Name}
                </Text>
            </Container>
        </Container>
    );
};

export default Category;
