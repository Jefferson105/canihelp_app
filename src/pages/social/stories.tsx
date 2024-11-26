import React, { useCallback, useRef, useReducer } from 'react';
import { FlatList, Platform } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';

import { Pagination } from '@styles/components';
import Story from '@components/social/story';
import { useSelector } from '@context/index';
import { StateProvider } from '@hooks/context';

import { SafeView } from '@styles/index';

import { viewStory } from '@context/actions/social';

import AStoriesReducer, {
    SET_INDEX,
    SET_LOADING_VIEW,
    SET_REF
} from '@context/reducers/local/stories';

type RouteProps = {
    params: {
        storyId: string;
    };
};

const AStories = () => {
    const {
        user,
        stories: { list }
    } = useSelector(({ user, stories }) => ({
        user,
        stories
    }));

    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const reduce = useReducer(AStoriesReducer, {
        activeIndex: params.storyId
            ? list.map((s) => s._id).indexOf(params.storyId)
            : 0,
        isSliding: false,
        imagesLoaded: [],
        loadingView: true,
        listRef: null,
        count: list.length - 1
    });

    const [{ activeIndex }, dispatchCtx] = reduce;

    const storiesRef = useRef(null);

    const onViewRef = useRef(async ({ changed }) => {
        if (changed) {
            dispatchCtx({ type: SET_INDEX, data: changed[0].index });

            const story = list.find((s) => s._id === changed[0].key);

            if (user && !story.Read) {
                try {
                    await viewStory(story._id);
                } catch (err) {
                    console.log('error view story', err);
                }
            }

            dispatchCtx({ type: SET_LOADING_VIEW, data: false });
        }
    });

    const viewConfigRef = useRef({
        viewAreaCoveragePercentThreshold: 50
    });

    const renderItem = useCallback(({ item }) => {
        return <Story story={item} />;
    }, []);

    const keyExtractor = useCallback((item) => {
        return item?._id;
    }, []);

    return (
        <StateProvider reducer={reduce}>
            <SafeView>
                <FlatList
                    data={list}
                    pagingEnabled
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    initialScrollIndex={activeIndex}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise((resolve) =>
                            setTimeout(resolve, 500)
                        );
                        wait.then(() => {
                            storiesRef.current?.scrollToIndex({
                                index: info.index,
                                animated: true
                            });
                        });
                    }}
                    onLayout={() => {
                        dispatchCtx({
                            type: SET_REF,
                            data: storiesRef.current
                        });
                    }}
                    ref={storiesRef}
                    keyExtractor={keyExtractor}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                    //onTouchEnd={() => console.log('Animation end')}
                />

                <Pagination
                    ammount={list.length}
                    selectedIndex={activeIndex}
                    dotsColor="#868481"
                    activeIndexColor="#fff"
                    justify="flex-start"
                    bottom={Platform.OS === 'android' ? '2px' : '50px'}
                    left="0"
                    center={true}
                />
            </SafeView>
        </StateProvider>
    );
};

export default AStories;
