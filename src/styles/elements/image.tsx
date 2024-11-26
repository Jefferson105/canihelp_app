import React from 'react';
import { Image as NImage } from 'react-native';
import FastImage from 'react-native-fast-image';

interface Source {
    uri: string;
}

interface RNImageProps {
    source: Source | any;
    height?: number;
    width?: number;
    radius?: number;
    marg?: string;
    style?: object;
    resize?: string;
    priority?: 'low' | 'normal' | 'high';
    onLoadEnd?: () => void;
    onLoadStart?: () => void;
}

const Image = ({
    source,
    height,
    width,
    radius,
    style,
    resize,
    priority = 'normal',
    onLoadEnd,
    onLoadStart
}: RNImageProps) => {
    const normalisedSource =
        source &&
        typeof source.uri === 'string' &&
        (source.uri.split('https://')[1] || source.uri.split('http://')[1])
            ? source
            : source || null;

    if (normalisedSource?.uri)
        normalisedSource.priority = FastImage.priority[priority];

    return (
        <>
            {normalisedSource?.uri?.indexOf('ph://') > -1 ? (
                <NImage
                    style={{ width, height, borderRadius: radius }}
                    source={normalisedSource}
                />
            ) : (
                <FastImage
                    style={{ width, height, borderRadius: radius, ...style }}
                    source={normalisedSource}
                    {...(resize
                        ? { resizeMode: FastImage.resizeMode[resize] }
                        : {})}
                    onLoadEnd={onLoadEnd}
                    onLoadStart={onLoadStart}
                />
            )}
        </>
    );
};

export default Image;
