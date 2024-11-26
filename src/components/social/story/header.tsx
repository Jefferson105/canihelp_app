import React from 'react';
import { View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Float,
    Container,
    Name,
    UserName,
    Category,
    Avatar
} from '@styles/index';
import { Icon } from '@styles/icon';

import { IStory } from '@ts/interfaces/social';

interface StoryHeaderProps {
    story: IStory;
}

const StoryHeader = ({ story }: StoryHeaderProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const handleNavigatoToCreatorProfile = () => {
        if (!isConnected) {
            Alert.alert(
                'Verifique sua conexão',
                'Sinal de internet fraco ou sem conexão.'
            );
            return;
        }

        navigation.navigate('Profile', {
            user: story.User._id
        });
    };

    return (
        <Float top="0" width="100%" bg="#00000070">
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingTop: 10
                }}
            >
                <Avatar photo={story.User.Photo} />
                <Container
                    width={null}
                    flex={1}
                    marg="0 0 0 15px"
                    pad="2px"
                    onPress={handleNavigatoToCreatorProfile}
                >
                    <Name color={'#fff'} family="Circularstd-Medium" size={15}>
                        {story.User.Name}
                    </Name>
                    <UserName
                        family="Circularstd-Medium"
                        size={15}
                        color="#fff"
                    >
                        {story.User.MainCategory ? (
                            <Category color={'#fff'}>
                                {story.User.MainCategory?.Label}
                            </Category>
                        ) : (
                            <UserName
                                family="Circularstd-Book"
                                size={13}
                                color="#fff"
                            >
                                @{story.User.UserName}
                            </UserName>
                        )}
                    </UserName>
                </Container>
                <Container onPress={() => navigation.goBack()}>
                    <Icon name="close" height={30} width={30} />
                </Container>
            </View>
        </Float>
    );
};

export default StoryHeader;
