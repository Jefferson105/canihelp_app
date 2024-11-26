import React, { useMemo, memo, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container as Line,
    Avatar,
    Name,
    Category,
    Small,
    Description,
    Text,
    CheckBox,
    Button,
    BorderVertical
} from '@styles/index';

import { checkConnect, parseRating, userCategory } from '@utils/index';
import { displayAddress } from '@services/location';
import { subSrtIntervals } from '@utils/search';
import { Icon } from '@styles/icon';
import { IUser } from '@ts/interfaces/user';
import { ICategory } from '@ts/interfaces/categories';

interface UserProps {
    item: IUser | any;
    category: Partial<ICategory>;
    onSelect?: () => void;
    selected?: boolean;
    subCategory?: {};
    childCategories?: [];
    withMarg?: boolean;
}

const User = ({
    item,
    category,
    onSelect,
    selected,
    withMarg = false
}: UserProps) => {
    const navigation = useNavigation();

    const {
        user,
        info: { isConnected },
        categories
    } = useSelector(({ user, info, search, categories }) => ({
        user,
        info,
        search,
        categories
    }));

    const categoryUser = useMemo(() => {
        return userCategory(item);
    }, [item]);

    const rating = parseRating(item?.Rating, 'Professional');

    const userAddress = useMemo(() => {
        if (item.LocationSrc === 'fixed') {
            return displayAddress(item.Address, true) || item.AddressMobile;
        } else {
            return item.AddressMobile || displayAddress(item.Address, true);
        }
    }, [item]);

    const UCategory = useCallback(() => {
        const primary = item.Categories.find((c) => c.IsPrimary);

        let offer = null;

        if (
            category?.self &&
            !category?.similars.some(
                (s) => String(s) === String(primary.Category)
            )
        ) {
            const idOffer = category.similars.find((s) =>
                item.Categories.some((c) => String(c.Category) === String(s))
            );

            offer = categories.find((c) => String(c._id) === String(idOffer));
        }

        if (
            !category?.self &&
            String(category?._id) !== String(primary?.Category)
        ) {
            if (category.Type === 'primary' || category.Type === 'classifier') {
                const ancestralId =
                    category.Type === 'primary'
                        ? String(category._id)
                        : String(category.AncestralID);

                if (
                    !categories.find(
                        (c) =>
                            String(c._id) === String(primary.Category) &&
                            String(c.AncestralID) === ancestralId
                    )
                )
                    offer = category;
            } else offer = category;
        }

        const intervals = category.self
            ? subSrtIntervals(category.Name, offer?.Name || categoryUser)
            : [];

        const parseInterval = (category, main) => {
            return (
                <>
                    {intervals.map((interval, i) => {
                        return (
                            <Category
                                color={main ? '#323232' : undefined}
                                decoration={
                                    interval[2] ? 'underline' : undefined
                                }
                                key={i}
                            >
                                {category.slice(interval[0], interval[1])}
                            </Category>
                        );
                    })}
                </>
            );
        };

        return (
            <Line>
                <Category color="#323232" margin="1px 0 0 0">
                    {category.self && !offer
                        ? parseInterval(categoryUser, true)
                        : categoryUser}
                </Category>
                {!!offer && (
                    <Category color="#323232">
                        Oferece{': '}
                        <Category>
                            {category.self
                                ? parseInterval(offer.Name, false)
                                : offer.Name}
                        </Category>
                    </Category>
                )}
            </Line>
        );
    }, [categoryUser, category, item, categories]);

    return (
        <BorderVertical
            type="bottom"
            marg={`0 ${withMarg ? '24px' : 0}`}
            pad="10px 0"
            onPress={checkConnect.bind({}, isConnected, () => {
                if (!onSelect)
                    navigation.navigate('Profile', {
                        user: item._id
                    });
            })}
        >
            <Line marg="10px 0">
                <Line dir="row" marg="0 0 11px 0">
                    <Line dir="row" width="60%">
                        <Line pad=" 0 0px 0 6px">
                            <Avatar photo={item?.Photo} user={item?._id} />
                        </Line>
                        <Line marg="0 auto 0 15px" width={null}>
                            <Name
                                family="Circularstd-Medium"
                                size={15}
                                color="#323232"
                            >
                                {item?.Name}{' '}
                                {!!(item?.Verified === 'verified') && (
                                    <Icon name="verified" />
                                )}
                            </Name>
                            <UCategory />
                        </Line>
                    </Line>

                    <Line flex={1} align="flex-end">
                        <Line
                            width="100%"
                            dir="row"
                            align="center"
                            justify="space-between"
                        >
                            <Line dir="row" align="center" marg="0 0 0 auto">
                                <Icon name="pin" color="#5C7BFF" />
                                <Small color="#5C7BFF">
                                    {item?.Distance?.toFixed(2)} km
                                </Small>
                            </Line>
                        </Line>
                        {!!rating && (
                            <Line dir="row" align="center">
                                <Icon name="star" color="#FFD159" />
                                <Text size={13}> {rating}</Text>
                            </Line>
                        )}
                        {!!onSelect && (
                            <CheckBox value={selected} onChange={onSelect} />
                        )}
                    </Line>
                </Line>
                <Description numberOfLines={3} ellipsizeMode={'tail'}>
                    {item?.Message
                        ? item?.Message
                        : `Olá eu sou o(a) ${item?.Name} e estou oferecendo meus serviços de ${categoryUser}.`}
                </Description>
                <Line
                    marg="15px 0 0 0"
                    dir="row"
                    justify="space-between"
                    align="center"
                >
                    <Line width={null} flex={1}>
                        <Small
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            size={12}
                        >
                            {userAddress}
                        </Small>
                    </Line>
                    {!onSelect && (
                        <Button
                            onPress={checkConnect.bind({}, isConnected, () => {
                                if (!user)
                                    return navigation.navigate('SignUp', {
                                        next: 'SearchResult'
                                    });

                                navigation.navigate('Conversation', {
                                    id: null,
                                    isHelp: false,
                                    archived: false,
                                    user: item
                                });
                            })}
                            text="Chat"
                            width={76}
                            height={30}
                            size={13}
                            linearType="vertical"
                        />
                    )}
                </Line>
            </Line>
        </BorderVertical>
    );
};

export default memo(User);
