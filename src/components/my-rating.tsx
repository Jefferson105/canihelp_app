import React from 'react';

import { Text, Container as Line, Shadow } from '@styles/index';

import { Icon } from '@styles/icon';

interface TreatReadOnlyProps {
    rating: number;
    value: number;
    onRating?: (stars: number) => void;
    readOnly: boolean;
    index?: number;
    isPro?: boolean;
    label: string;
}

const treatReadOnly = ({
    rating,
    value,
    onRating,
    readOnly,
    index,
    isPro,
    label
}: TreatReadOnlyProps) => {
    if (readOnly) {
        return (
            <Icon
                name="star"
                key={rating}
                height={35}
                width={35}
                color={value < rating ? '#EEEEEE' : '#FF9300'}
            />
        );
    } else {
        return (
            <Line
                testID={isPro ? `test-${label}-${index}` : `test-star-${index}`}
                width={null}
                key={rating}
                onPress={() => onRating(rating)}
            >
                <Icon
                    name="star"
                    height={35}
                    width={35}
                    color={value < rating ? '#EEEEEE' : '#FF9300'}
                />
            </Line>
        );
    }
};

interface MyRatingProps {
    value: number;
    onRating?: (stars: number) => void;
    label?: string;
    readOnly?: boolean;
    isPro?: boolean;
}

const MyRating = ({
    value,
    onRating,
    label,
    readOnly = false,
    isPro
}: MyRatingProps) => (
    <Line marg="10px 0px" width="100%">
        {!!label && (
            <Text marg="0px 0px 5px 0px" family="Circularstd-Bold" size={14}>
                {label}
            </Text>
        )}
        <Shadow
            disable={true}
            radius={5}
            background={'#fff'}
            width="100%"
            shadow={{
                color: '#00000080',
                height: 4,
                opacity: 0.5,
                radius: 4.65,
                elevation: 8
            }}
            pad={5}
        >
            <Line width="100%" justify="flex-start" dir="row">
                {[1, 2, 3, 4, 5].map((rating, index) =>
                    treatReadOnly({
                        rating,
                        value,
                        onRating,
                        readOnly,
                        index,
                        isPro,
                        label
                    })
                )}
            </Line>
        </Shadow>
    </Line>
);

export default MyRating;
