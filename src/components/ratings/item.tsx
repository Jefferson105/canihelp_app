import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Text,
    Container as Line,
    Avatar,
    Name,
    Small,
    BorderVertical
} from '@styles/index';

import { checkConnect } from '@utils/index';
import { ratingAverage } from '@utils/ratings';
import { Icon } from '@styles/icon';

const RatingItem = ({ rating }) => {
    const { navigate } = useNavigation();
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    return (
        <BorderVertical type="bottom" width="100%" pad="20px 0">
            <Line
                marg="0 0 12px 0"
                width="100%"
                dir="row"
                align="flex-start"
                justify="space-between"
                onPress={checkConnect.bind({}, isConnected, () =>
                    navigate('Profile', {
                        user: rating.Evaluator._id
                    })
                )}
            >
                <Avatar photo={rating.Evaluator?.Photo} shadow={false} />
                <Line width={null} marg="0 auto 0 15px" flex={1}>
                    <Name color="#323232" family="Circularstd-Medium" size={15}>
                        {rating.Evaluator.Name}
                    </Name>
                    {rating.Evaluator.MainCategory ? (
                        <Small>{rating.Evaluator.MainCategory.Label}</Small>
                    ) : (
                        <Small>@{rating.Evaluator.UserName}</Small>
                    )}
                </Line>
                <Line dir="row" width={null} align="center">
                    <Icon name="star" height={16} width={16} color="#FF9D00" />
                    <Small>
                        {rating.Total
                            ? Number(rating.Total).toFixed(2)
                            : ratingAverage(rating)}
                    </Small>
                </Line>
            </Line>
            <Text size={14} line={21}>
                {rating?.Description}
            </Text>
        </BorderVertical>
    );
};

export default RatingItem;
