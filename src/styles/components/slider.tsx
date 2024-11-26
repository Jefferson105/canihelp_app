import React, { useState, useRef } from 'react';
import {
    ScrollView,
    Dimensions,
    TouchableWithoutFeedback,
    Image as NImage,
    Platform,
    ImageBackground
} from 'react-native';

import { Image, Pagination, Container, Loading, Float } from '@styles/index';
import { Icon } from '@styles/icon';
import ModalOptions from '@components/profile/modal';

const { width } = Dimensions.get('screen');

interface SliderProps {
    images: Array<{
        _id: string;
        Url: string;
        Small?: string;
        isLoading?: boolean;
    }>;
    onRemove?: (id: string) => Promise<void>;
    height: number;
    onAdd?: () => Promise<void>;
    isEdit?: boolean;
}

const Slider = ({ images, onRemove, onAdd, height, isEdit }: SliderProps) => {
    const sliderRef = useRef<ScrollView>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [active, setActive] = useState(false);

    const onClose = () => {
        setActive(false);
    };

    const updateActiveIndex = (index: number) => {
        setActiveIndex(index);
    };

    const handleRemove = async () => {
        onRemove(images[activeIndex]._id);
        onClose();
    };

    const handleAdd = async () => {
        onAdd();
        onClose();
    };

    if (images.length === 0) return null;

    return (
        <>
            <ScrollView
                testID="scrollView-port"
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                ref={sliderRef}
                onMomentumScrollEnd={(event) => {
                    updateActiveIndex(
                        Math.round(event.nativeEvent.contentOffset.x / width)
                    );
                }}
            >
                {images.map((image) => (
                    <TouchableWithoutFeedback
                        key={String(image._id)}
                        onPress={() => {
                            !image.isLoading && isEdit ? setActive(true) : null;
                        }}
                    >
                        <Container>
                            {!!image.Small && (
                                <ImageBackground
                                    source={{ uri: image.Small }}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0
                                    }}
                                />
                            )}
                            {image.isLoading && (
                                <Float top="44%" left="40%">
                                    <Loading overlay={false} />
                                </Float>
                            )}
                            {Platform.OS === 'ios' && image.isLoading ? (
                                <NImage
                                    source={{ uri: image.Url }}
                                    style={{ width, height }}
                                />
                            ) : (
                                <Image
                                    height={height}
                                    width={width}
                                    source={{ uri: image.Url }}
                                />
                            )}
                        </Container>
                    </TouchableWithoutFeedback>
                ))}
                {isEdit && images.length < 5 && (
                    <>
                        <Container
                            align="center"
                            justify="center"
                            height={`${height}px`}
                            width={`${width}px`}
                            onPress={handleAdd}
                        >
                            <Icon
                                name="addImage"
                                color={'#fff'}
                                width={56}
                                height={56}
                            />
                        </Container>
                    </>
                )}
                <ModalOptions
                    active={active}
                    close={onClose}
                    remove={handleRemove}
                    add={handleAdd}
                    length={images.length}
                />
            </ScrollView>

            <Pagination
                dotsColor="#ffffff90"
                top="90%"
                ammount={
                    isEdit && images.length < 5
                        ? images.length + 1
                        : images.length
                }
                activeIndexColor="#FFFFFF"
                selectedIndex={activeIndex}
            />
        </>
    );
};

export default Slider;
