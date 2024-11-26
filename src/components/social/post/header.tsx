import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { useSelector } from '@context/index';

import {
    Container as Line,
    Avatar,
    Category,
    Name,
    UserName,
    Text,
    Small
} from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect, timeParse } from '@utils/index';

const { width } = Dimensions.get('screen');

interface PostHeaderProps {
    userId: string;
    address: string;
    photo: string;
    online: boolean;
    name: string;
    username: string;
    category: string;
    rating: string;
    checkin: boolean;
    distance: number;
    date?: string;
}

const PostHeader = ({
    userId,
    photo,
    name,
    username,
    category,
    rating,
    checkin,
    date,
    distance
}: PostHeaderProps) => {
    const navigation = useNavigation();
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({ info }));

    const handleNavigatoToCreatorProfile = () => {
        navigation.navigate('Profile', {
            user: userId
        });
    };

    const timeLeftToExpire = useCallback(() => {
        const postMinutes = Number(new Date(date));
        const todayMinutes = Number(new Date());

        const minutesDir = (todayMinutes - postMinutes) / 1000 / 60;

        return 30 - minutesDir >= 1 ? Math.round(30 - minutesDir) : 0;
    }, [date]);

    return (
        <Line dir="row" pad="0 20px 0" marg="2px 0 20px 0">
            <Line
                align="center"
                onPress={checkConnect.bind(
                    {},
                    isConnected,
                    handleNavigatoToCreatorProfile
                )}
            >
                <Avatar photo={photo} user={userId} />
            </Line>

            <Line
                width={width - 160 + 'px'}
                marg="0 0 0 15px"
                onPress={checkConnect.bind(
                    {},
                    isConnected,
                    handleNavigatoToCreatorProfile
                )}
            >
                <Name color={'#323232'} family="Circularstd-Medium" size={15}>
                    {name}{' '}
                </Name>
                <UserName family="Circularstd-Medium" size={15} marg="0 0 0 0">
                    {category ? (
                        <Category color="#323232">{category}</Category>
                    ) : (
                        <UserName
                            family="Circularstd-Book"
                            size={13}
                            color="#323232"
                        >
                            @{username}
                        </UserName>
                    )}
                    {rating && (
                        <Text
                            size={13}
                            line={22}
                            marg="0 0 0 auto"
                            align="center"
                        >
                            {' '}
                            <Text size={15} line={22}>
                                ∙
                            </Text>{' '}
                            <Icon name="star" color="#FFD159" />
                            {rating}
                        </Text>
                    )}
                </UserName>
            </Line>
            <Line minWidth="20px" marg="0px 0px 0px auto" align="flex-end">
                <Line dir="row" justify="flex-end" width="50%" align="center">
                    <Icon name="pin" color={'#5C7BFF'} />
                    <Small color={'#5C7BFF'}>
                        {distance ? distance.toFixed(2) : '0'} km
                    </Small>
                </Line>
                <Small
                    style={{
                        fontStyle: 'italic'
                    }}
                >
                    {checkin
                        ? `Expira em ${timeLeftToExpire()}m`
                        : timeParse(date)}
                </Small>
            </Line>
        </Line>
    );
};

export default PostHeader;
