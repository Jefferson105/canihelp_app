import React, { useCallback } from 'react';

import LazyImage from '@components/social/post/lazy-image';

import { Container } from '@styles/index';

const ImageGrid = ({ images, height, width, lazy, loaded }) => {
    const colums = images.length % 2 === 0 ? 2 : 1;

    let style = null;
    let soloImage = null;
    let boundImage = images;
    let bottomImages = [];

    switch (images.length) {
        case 4:
            style = { width: width / 2 - 2, height: height / 2 - 2 };
            bottomImages = [images[2], images[3]];
            boundImage = [images[0], images[1]];
            break;

        case 3:
            style = { width: width / 2 - 2, height: height / 2 - 2 };
            soloImage = images[0];
            boundImage = [images[1], images[2]];

            break;
        case 2:
            style = { width: width / 2 - 2, height: height - 2 };
            break;

        default:
            style = { width: width, height: height };
            break;
    }

    const renderItem = useCallback(
        (item) => {
            return (
                <Container
                    key={item.Url}
                    width={style.width + 'px'}
                    height={style.height + 'px'}
                    color="#dfdedec0"
                >
                    {(images[0].Url === item.Url || loaded) && (
                        <LazyImage
                            image={item}
                            width={style.width}
                            height={style.height}
                            //lazy={lazy}
                            loaded={loaded}
                        />
                    )}
                </Container>
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [images, loaded, lazy]
    );

    const handleGrid = () => {
        const bottom = soloImage || bottomImages;

        if (colums === 1) {
            return (
                <Container>
                    {boundImage.map((item) => renderItem(item))}
                </Container>
            );
        }

        if (colums === 2) {
            return (
                <Container>
                    <Container dir="row">
                        {boundImage.map((item) => renderItem(item))}
                    </Container>
                    <Container dir="row">
                        {bottom.map((item) => renderItem(item))}
                    </Container>
                </Container>
            );
        }
    };

    return (
        <Container dir="row" width="100%">
            {soloImage && (
                <Container>
                    <LazyImage
                        image={soloImage}
                        width={style.width}
                        height={height}
                        //lazy={lazy}
                        loaded={loaded}
                    />
                </Container>
            )}
            {handleGrid()}
        </Container>
    );
};

export default ImageGrid;
