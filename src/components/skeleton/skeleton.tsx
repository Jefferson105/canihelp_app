import React, { useCallback, useEffect } from 'react';
import { Animated } from 'react-native';

import { Container } from '@styles/index';

let timer = null;

interface ISkeleton {
    layout: any;
    fromUpost?: boolean;
}

const Skeleton = ({ layout, fromUpost }: ISkeleton) => {
    const skeletonEffect = React.useRef(new Animated.Value(0)).current;

    //control the animation
    const animate = (end = false) => {
        Animated.timing(skeletonEffect, {
            toValue: end ? 0 : 100,
            duration: 800,
            useNativeDriver: false
        }).start();

        //removed timer for e2e tests on userPosts

        if (!fromUpost) timer = setTimeout(() => animate(true), 900);
    };

    //handle the color of the background
    const handleBgColor = skeletonEffect.interpolate({
        inputRange: [0, 100],
        outputRange: ['#afaeae37', '#e3e3e3']
    });

    //start skeleton animation
    useEffect(() => {
        animate();

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const SlekeleItem = useCallback(
        ({ item, nested }) => {
            return (
                <Animated.View
                    style={{
                        ...item,
                        backgroundColor: nested ? null : handleBgColor
                    }}
                >
                    {nested &&
                        nested.map((item, index) => (
                            <SlekeleItem
                                item={item}
                                nested={item.children}
                                key={index}
                            />
                        ))}
                </Animated.View>
            );
        },
        [handleBgColor]
    );

    const Skeletainer = useCallback(
        ({ items }) => (
            <Container width="100%">
                {items.map((item, index) => (
                    <SlekeleItem
                        item={item}
                        nested={item.children}
                        key={index}
                    />
                ))}
            </Container>
        ),
        [SlekeleItem]
    );

    return (
        <Container
            width="100%"
            pad="0 20px"
            accessible={true}
            accessibilityLabel="Skeleton"
        >
            <Skeletainer items={layout} />
        </Container>
    );
};

export default Skeleton;
