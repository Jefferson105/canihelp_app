import React, { memo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Press, Float, Small, Text } from '@styles/index';
import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon';

import { likePost } from '@context/actions/social';
import { checkConnect } from '@utils/index';
import { IStory } from '@ts/interfaces/social';

interface StoryFooterComponentProps {
    story: IStory;
}

const likeColor = (likedByMe: boolean) => {
    if (likedByMe) return mainColor;
    return '#D6D6D6';
};

const StoryFooterComponent = ({ story }: StoryFooterComponentProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({ info, user }));

    return (
        <Float bottom="0px" width="100%" bg="#00000070">
            <View
                style={{
                    alignItems: 'flex-start',
                    width: '100%',
                    justifyContent: 'space-between',
                    marginBottom: 10,
                    position: 'relative',
                    paddingLeft: 10,
                    paddingRight: 10
                }}
            >
                <Press
                    onPress={() =>
                        checkConnect(isConnected, () =>
                            navigation.navigate('Post', {
                                post: story._id,
                                from: 'stories'
                            })
                        )
                    }
                    style={{
                        width: '100%',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        marginBottom: 20
                    }}
                >
                    <Text size={17} color="#fff" numberOfLines={3}>
                        {story.Text}
                    </Text>
                </Press>

                <Press
                    marg="0px 0px 20px"
                    onPress={() =>
                        checkConnect(
                            isConnected,
                            () => user && likePost(String(story._id))
                        )
                    }
                >
                    <Icon name="heart" color={likeColor(story.Liked)} />
                    <Small color="#fff" marg="0px 0px 0px 5px">
                        {story.Likes}
                    </Small>
                </Press>
            </View>
        </Float>
    );
};

export default memo(StoryFooterComponent);
