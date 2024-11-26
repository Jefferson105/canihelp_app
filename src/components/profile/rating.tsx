import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

import { useSelector } from '@context/index';
import RattingPortrait from '@components/profile/rating-portrait';
import Skeleton from '@components/skeleton/skeleton';
import ratingSkeleton from './rating-skeleton';
import useRequest from '@hooks/request';

import { Container, Text, Press, EmptyProfile } from '@styles/index';
import { checkConnect } from '@utils/index';

const { width } = Dimensions.get('window');

const Rating = ({ cacheUser }) => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({
        info,
        profile,
        user
    }));

    const isEdit = profile._id === user?._id;

    const {
        data: { list: lastRatings },
        loading
    } = useRequest({
        name: 'ratingsLast',
        cacheFirst: cacheUser !== profile._id,
        params: { user: profile._id }
    });

    const { proLastRatings, clientLastRatings } = useMemo(() => {
        return {
            proLastRatings: lastRatings[0]?.pro || [],
            clientLastRatings: lastRatings[0]?.client || []
        };
    }, [lastRatings]);

    if (loading && !lastRatings.length)
        return (
            <Container width="110%" marg="0 0 0 -20px">
                <Skeleton layout={ratingSkeleton} />
            </Container>
        );

    return (
        <Container
            width={width + 40 + 'px'}
            marg="15px 0 0 -20px"
            pad="15px 60px 15px 20px"
            color="#f8f8f8"
        >
            <Container
                width={'100%'}
                dir="row"
                justify="space-between"
                marg="0 0 10px 0"
            >
                <Text marg="0 10% 0 0" family="Circularstd-Medium">
                    {proLastRatings?.length > 0
                        ? 'Clientes avaliaram este profissional'
                        : 'Avaliações como cliente'}
                </Text>
                <Container
                    width={null}
                    align="center"
                    dir="row"
                    marg="0 0 0 auto"
                >
                    {(clientLastRatings.length > 0 ||
                        proLastRatings.length > 0) && (
                        <Press
                            testID="test-ratings"
                            onPress={checkConnect.bind({}, isConnected, () =>
                                navigation.navigate('Ratings', {
                                    user: profile._id
                                })
                            )}
                        >
                            <Text size={14} decoration="underline">
                                Ver mais
                            </Text>
                        </Press>
                    )}
                </Container>
            </Container>
            {clientLastRatings.length === 0 && proLastRatings.length === 0 ? (
                <EmptyProfile
                    icon="ratings"
                    text={
                        isEdit
                            ? 'Você ainda não possui reviews'
                            : `${profile.Name} ainda não possui reviews`
                    }
                />
            ) : (
                <>
                    <Container width="100%" marg="0 0 10px 0">
                        {proLastRatings?.length > 0 &&
                            proLastRatings?.map((item) => (
                                <RattingPortrait
                                    key={item.CreatedAt}
                                    item={item}
                                />
                            ))}
                        {clientLastRatings?.length > 0 && (
                            <>
                                {proLastRatings?.length > 0 && (
                                    <Text marg="10px 0">
                                        Avaliaçoes como cliente
                                    </Text>
                                )}
                                {clientLastRatings?.map((item) => (
                                    <RattingPortrait
                                        key={item.CreatedAt}
                                        item={item}
                                    />
                                ))}
                            </>
                        )}
                    </Container>
                </>
            )}
        </Container>
    );
};

export default Rating;
