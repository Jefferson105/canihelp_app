import React, { memo, useCallback } from 'react';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { storiesSkeleton } from './social-skeleton';
import Skeleton from '@components/skeleton/skeleton';

import { Container, SubTitle, Divider } from '@styles/index';
import { AvatarStory } from '@styles/components/avatar-story';

const ListHeaderComponent = ({ stories, loading }) => {
    const navigation = useNavigation();

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <AvatarStory
                    testID={'test-avatar-storie'}
                    key={item._id}
                    size="medium"
                    name={item.User._id}
                    photo={item.User.Photo}
                    unread={!item.Read}
                    onPress={() =>
                        navigation.navigate('Stories', {
                            storyId: item._id
                        })
                    }
                />
            );
        },
        [navigation]
    );

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    if (!stories?.length && loading)
        return <Skeleton layout={storiesSkeleton} />;

    return (
        <Container marg="0 0 16px 0">
            {!!stories?.length && (
                <Container marg="10px 0 0 0">
                    <SubTitle align="left" marg="0 24px 16px 24px">
                        Explorar Histórias
                    </SubTitle>
                    <FlatList
                        data={stories}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    />
                </Container>
            )}

            <Container marg="10px 10px 0 10px">
                <Divider />
            </Container>
        </Container>
    );
};

export const SocialListHeader = memo(ListHeaderComponent);
