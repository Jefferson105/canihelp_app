import React, { useMemo } from 'react';
import styled from 'styled-components/native';

import { useSelector } from '@context/index';

import {
    Avatar,
    Container,
    Container as Line,
    Name,
    Small,
    Text
} from '@styles/index';
//import { blue } from '@styles/colors';
import theme from '@styles/theme';
import { Icon } from '@styles/icon';

import { coordsDistance } from '@services/location';
import { parseRating } from '@utils/index';

const Verified = styled.View`
    align-items: center;
    justify-content: center;
    background-color: #8ce29d;
    width: 16px;
    height: 16px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1.5px solid #fff;
    padding: 2px 0 0 2px;
    margin: 0 0 0 5px;
`;

interface CardInfoProps {
    info: {
        category: string;
        address: string;
    };
    type: string;
    location: {
        lat: number;
        lon: number;
        address?: string;
    };
    edit: string;
}

const CardInfo = ({ info, type, location }: CardInfoProps) => {
    const { user, social } = useSelector(
        ({ user, postsList, social, postsUser }) => ({
            user,
            postsList,
            postsUser,
            social
        })
    );

    const rating = useMemo(() => {
        return parseRating(
            user?.Rating,
            user?.MainCategory ? 'Professional' : 'Client'
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.Rating]);

    return (
        <Line marg="20px 0 20px 0">
            <Line dir="row" align="center">
                <Avatar photo={user.Photo} />
                <Line
                    marg="0 0 0 10px"
                    align="flex-start"
                    justify="flex-end"
                    width="100%"
                >
                    <Line dir="row" align="center">
                        <Name family="Circularstd-Medium" size={15}>
                            {user.Name}
                        </Name>
                        {!!user.Verified && (
                            <Verified>
                                <Icon name="check" />
                            </Verified>
                        )}
                    </Line>
                    <Line dir="row" align="center">
                        <Small>{type === 'help' && 'Procura por '}</Small>

                        <Small color="#323232" marg="0 5px 0 0">
                            {info.category}
                        </Small>
                        {rating && (
                            <>
                                <Text
                                    size={20}
                                    // line={22}
                                    marg="0 5px 0"
                                    align="center"
                                >
                                    ∙
                                </Text>

                                <Icon name="star" color="#FF9D00" />
                                <Text size={13} marg="0 0 0 5px">
                                    {rating}
                                </Text>
                            </>
                        )}
                    </Line>
                </Line>
            </Line>
            <Line width="100%" marg="5px 0 0 0">
                <Container
                    align="flex-start"
                    justify="space-between"
                    marg="5px 0 0 0"
                    dir="row"
                    width="100%"
                >
                    <Container width="65%">
                        <Text size={14} line={21}>
                            {location.address
                                ? type === 'help'
                                    ? 'Em'
                                    : 'Agora disponível em'
                                : 'Localização vazia'}{' '}
                            <Text size={14} line={21} color={theme.COLORS.blue}>
                                {location.address}
                            </Text>
                        </Text>
                    </Container>
                    <Container dir="row">
                        <Icon name="pin" color={theme.COLORS.blue} />
                        <Text
                            marg="0 10px 0 5px"
                            color={theme.COLORS.blue}
                            size={13}
                        >
                            {coordsDistance(
                                location?.lat,
                                location?.lon,
                                social.location?.latitude,
                                social.location?.longitude
                            ) || '0'}{' '}
                            km
                        </Text>
                    </Container>
                </Container>
                {!!(type !== 'help') && (
                    <Text size={12}>Expira em 30 minutos</Text>
                )}
            </Line>
        </Line>
    );
};

export default CardInfo;
