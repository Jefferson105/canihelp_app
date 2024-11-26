import React, { memo } from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';

import StoryHeader from '@components/social/story/header';
import StoryContent from '@components/social/story/content';
import StoryFooter from '@components/social/story/footer';
import { getState } from '@hooks/context';

import { IStory } from '@ts/interfaces/social';

const { width } = Dimensions.get('window');

interface StoryProps {
    story: IStory;
}

const StoryComponent = ({ story }: StoryProps) => {
    const [{ listRef, activeIndex, count }] = getState();

    return (
        <TouchableOpacity
            style={{
                height: '100%',
                width,
                position: 'relative',
                flex: 1,
                backgroundColor: '#030303',
                paddingTop: 10
            }}
            onPress={(ev) => {
                let index = activeIndex;

                if (width / 2 > ev?.nativeEvent?.pageX) {
                    if (index === 0) return;

                    index -= 1;
                } else {
                    if (index >= count) return;

                    index += 1;
                }

                listRef?.scrollToIndex({
                    index,
                    animated: true
                });
            }}
            activeOpacity={1}
        >
            <View
                style={{
                    position: 'relative',
                    flex: 1,
                    backgroundColor: '#030303'
                }}
            >
                <StoryHeader story={story} />

                <StoryContent imageUrl={story.Images[0].Url} />

                <StoryFooter story={story} />
            </View>
        </TouchableOpacity>
    );
};

export default memo(StoryComponent);
