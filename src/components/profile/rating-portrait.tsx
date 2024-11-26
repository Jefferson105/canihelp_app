import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Container, Text, Avatar, Small, BorderVertical } from '@styles/index';
import { golden } from '@styles/colors';

import { checkConnect } from '@utils/index';
import { ratingAverage } from '@utils/ratings';
import { Icon } from '@styles/icon';

interface RattingPortraitProps {
    item: any;
}

const RattingPortrait = ({ item }: RattingPortraitProps) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const navigation = useNavigation();

    return (
        <BorderVertical width="100%" type="bottom">
            <Container dir="row" pad="10px 0">
                <Container
                    dir="row"
                    align="flex-start"
                    onPress={checkConnect.bind(
                        {},
                        isConnected,

                        () =>
                            navigation.navigate('Profile', {
                                user: item.Evaluator._id
                            })
                    )}
                >
                    <Avatar photo={item.Evaluator?.Photo} />
                    <Container width={null} marg="4px 10px 0 12px" flex={1}>
                        <Text size={14}>“{item.Description}“</Text>
                    </Container>
                    <Container
                        align="center"
                        dir="row"
                        width={null}
                        pad="4px 0 0 0"
                    >
                        <Icon
                            name="star"
                            height={16}
                            width={16}
                            color={golden}
                        />
                        <Small>
                            {item.Total
                                ? Number(item.Total).toFixed(2)
                                : ratingAverage(item)}
                        </Small>
                    </Container>
                </Container>
            </Container>
        </BorderVertical>
    );
};

export default RattingPortrait;
