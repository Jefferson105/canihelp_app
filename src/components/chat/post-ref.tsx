import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Text } from '@styles/index';
import { Icon } from '@styles/icon';

interface ModalOptionsProps {
    text: string;
    name: string;
    from: string;
    close?: () => void;
    id?: string;
    testID?: string;
}
const PostRef = ({
    close,
    text,
    from,
    name,
    id,
    testID
}: ModalOptionsProps) => {
    const navigation = useNavigation();

    return (
        <Container
            testID={testID}
            pad="0 5px"
            radius={4}
            color="#dedede70"
            dir="row"
            align="center"
            marg="0 0 5px 0"
            width={from === 'footer' ? '100%' : '80%'}
            onPress={() => {
                if (from === 'messages')
                    navigation.navigate('Post', {
                        post: id
                    });
            }}
        >
            <Icon name="social" color="#FF6F5C70" width={26} />
            <Container marg="0 0 0 10px" flex={1}>
                <Text size={12}>{name}</Text>
                <Text
                    marg="-8px 0 0 0"
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    size={12}
                >
                    {text}
                </Text>
            </Container>
            {from === 'footer' && (
                <>
                    <Container
                        marg="0 12px 0 auto"
                        height="70%"
                        width="0.5px"
                        color="#4E4E4E"
                    />

                    <Container onPress={close}>
                        <Icon name="close" color="#4E4E4E" />
                    </Container>
                </>
            )}
        </Container>
    );
};

export default PostRef;
