import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, Container, Avatar } from '@styles/index';
import { Icon } from '@styles/icon';

const Client = ({ creator, isClient }) => {
    const navigation = useNavigation();

    return (
        <Container color="#FAFAFA" marg={'20px 0 0 0'}>
            <Text family="CircularStd-Medium" line={16}>
                {isClient ? 'Cliente ' : 'Profissional'}
            </Text>
            <Container
                align="center"
                pad="10px 0 10px 0"
                dir="row"
                width="100%"
            >
                <Container
                    align="center"
                    dir="row"
                    onPress={() =>
                        navigation.navigate('Profile', {
                            user: creator?._id
                        })
                    }
                >
                    <Avatar
                        isProposal={true}
                        user={creator?._id}
                        photo={creator?.Photo}
                    />
                    <Container maxWidth="82%" marg="0px 0 0 10px">
                        <Text
                            size={15}
                            ellipsizeMode={'tail'}
                            line={16}
                            family="CircularStd-Medium"
                        >
                            {creator?.Name}
                        </Text>
                        <Text ellipsizeMode={'tail'} line={18}>
                            {isClient
                                ? `@${creator?.UserName}`
                                : creator.MainCategory.Label}
                        </Text>
                    </Container>
                </Container>
                <Container
                    testID="ChatTeste"
                    onPress={() =>
                        navigation.navigate('Conversation', {
                            id: null,
                            isHelp: false,
                            archived: false,
                            user: creator
                        })
                    }
                    marg="0px 10px 0 auto"
                >
                    <Icon name="chat" color="#323232" />
                </Container>
            </Container>
        </Container>
    );
};

export default Client;
