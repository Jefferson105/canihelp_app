import React, { useRef } from 'react';
import { Animated } from 'react-native';
import FastImage from 'react-native-fast-image';

import { Container } from '@styles/layout';

const LazyImage = ({ image, height, width, loaded }) => {
    const AnimatedImage = Animated.createAnimatedComponent(FastImage);
    const opacityAnim = useRef(new Animated.Value(0.6)).current;

    const opacityIn = () => {
        Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true
        }).start();
    };

    return (
        <Container color="#AAA">
            {loaded && (
                <AnimatedImage
                    style={{
                        width: width,
                        height: height,
                        borderRadius: 10,
                        opacity: opacityAnim
                    }}
                    source={{
                        uri: image.Url,
                        priority: FastImage.priority.high
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                    onLoad={() => {
                        opacityIn();
                    }}
                />
            )}
        </Container>
    );
};

export default LazyImage;
