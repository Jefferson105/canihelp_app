import React from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Container, Text, Float, Avatar } from '@styles/index';
import { Icon } from '@styles/icon';
import { checkConnect } from '@utils/index';

const Figure = styled.View`
    position: absolute;
    top: 35%;
    left: 5%;
    width: 45px;
    height: 45px;
    align-items: center;
    justify-content: center;
`;

const Img = styled.Image`
    width: 100%;
    height: 45%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #ccc;
`;

interface BoxProviderProps {
    _id: string;
    Name: string;
    MainCategory: { Label: string };
    Photo?: string;
    Distance: number;
    index: number;
    Image: { _id: string; Url: string } | null;
}

const BoxProvider = ({
    _id,
    Name,
    Photo,
    Distance,
    Image,
    index,
    MainCategory
}: BoxProviderProps) => {
    const navigation = useNavigation();
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    return (
        <Container
            width="243px"
            height="207px"
            color="#FFF"
            radius={10}
            marg={`0 17px 0 ${index === 0 ? 24 : 0}px`}
            onPress={checkConnect.bind({}, isConnected, () =>
                navigation.navigate('Profile', {
                    user: _id
                })
            )}
        >
            <Img source={Image ? { uri: Image.Url } : null} />
            <Figure>
                <Float pad="0px">
                    <Avatar user={_id} photo={Photo} />
                </Float>
            </Figure>
            <Container
                dir="row"
                width="100%"
                justify="flex-end"
                align="center"
                marg="10px 0 0 -20px"
            >
                <Icon name="pin" color="#5C7BFE" />
                <Text color="#323232" size={13} marg="0 0 0 10px">
                    {Distance.toFixed(2)} km
                </Text>
            </Container>
            <Container marg="0 0 0 20px">
                <Text
                    color="#323232"
                    size={14}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {Name}
                </Text>
                <Container
                    border="1px solid #FF6F5C"
                    pad="0 12px 0 12px"
                    radius={20}
                >
                    <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        color="#323232"
                        size={13}
                    >
                        {MainCategory.Label}
                    </Text>
                </Container>
            </Container>
        </Container>
    );
};

export default BoxProvider;
