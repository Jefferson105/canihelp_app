import React from 'react';
import {
    ScrollView,
    Image,
    Dimensions,
    NativeSyntheticEvent,
    NativeScrollEvent,
    TouchableOpacity,
    Modal
} from 'react-native';
import { Pagination } from '@styles/components';
import { Container } from '@styles/layout';
import { Icon } from '@styles/icon';

const { height, width } = Dimensions.get('window');

interface FullImagesCarouselProps {
    images: string[];
    onPressClose: () => void;
    isVisible: boolean;
    openIndex?: number;
}

const FullImagesCarouselContainer = ({
    images,
    onPressClose,
    isVisible,
    openIndex = 0
}: FullImagesCarouselProps) => {
    const [imagesWithSize, setImagesWithSize] = React.useState<
        Array<{ Url: string; width: number; height: number }>
    >([]);

    const [activeImageIndex, setActiveImageIndex] = React.useState(0);

    const carouselRef = React.useRef<ScrollView>();

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        setActiveImageIndex(
            Math.round(event.nativeEvent.contentOffset.x / width)
        );
    };

    React.useEffect(() => {
        let filesWithSize = [];

        if (images.length <= 0) return;

        images.forEach((img, index) => {
            Image.getSize(
                img,
                (width, height) => {
                    filesWithSize.push({
                        Url: img,
                        width,
                        height
                    });

                    if (index === images.length - 1) {
                        setImagesWithSize(filesWithSize);
                        filesWithSize = [];
                    }
                },
                (error) => {
                    console.log('error on get image size ', error);
                }
            );
        });
    }, [images]);

    React.useEffect(() => {
        setActiveImageIndex(openIndex);
        if (carouselRef && carouselRef.current) {
            carouselRef.current.scrollTo({
                x: width * openIndex + 1,
                y: 0,
                animated: false
            });
        }
    }, [openIndex]);

    const handleClose = () => {
        onPressClose();
        setActiveImageIndex(0);
    };

    if (images.length <= 0) return <></>;

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            style={{
                width,
                height
            }}
            onRequestClose={handleClose}
        >
            <Container position="relative" color="#000">
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        top: '10%',
                        right: 20,
                        width: 40,
                        height: 40,
                        zIndex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 50,
                        backgroundColor: '#00000040'
                    }}
                    onPress={handleClose}
                >
                    <Icon name="close" color="#fff" />
                </TouchableOpacity>

                <ScrollView
                    horizontal
                    pagingEnabled
                    onScroll={handleScroll}
                    showsHorizontalScrollIndicator={false}
                    ref={carouselRef}
                >
                    {imagesWithSize.map((img) => (
                        <Image
                            key={img.Url}
                            source={{ uri: img.Url }}
                            resizeMode="contain"
                            style={{
                                height,
                                width
                            }}
                        />
                    ))}
                </ScrollView>
                <Pagination
                    top="80%"
                    ammount={imagesWithSize.length}
                    selectedIndex={activeImageIndex}
                    dotsColor="#bbbbbb"
                    activeIndexColor="#fff"
                />
            </Container>
        </Modal>
    );
};

export const FullImagesCarousel = React.memo(FullImagesCarouselContainer);
