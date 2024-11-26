import React, { useMemo, memo } from 'react';
import { TouchableOpacity } from 'react-native';

import { Container, Avatar, Name } from '@styles/index';

interface StoryProps {
    name: string;
    photo: string;
    size?: 'small' | 'normal' | 'medium' | 'large' | 'extra-large';
    unread?: boolean;
    testID?: string;
    onPress: (ev?) => void;
}

export const AvatarStoryComponent = ({
    name,
    photo,
    size = 'normal',
    unread,
    onPress,
    testID
}: StoryProps) => {
    const dimension = useMemo(() => {
        switch (size) {
            case 'small':
                return {
                    width: '50px',
                    height: '50px'
                };
            case 'medium':
                return {
                    width: '90px',
                    height: '90px'
                };
            case 'large':
                return {
                    width: '110px',
                    height: '110px'
                };
            case 'extra-large':
                return {
                    width: '190px',
                    height: '190px'
                };
            default:
                return {
                    width: '80px',
                    height: '80px'
                };
        }
    }, [size]);

    return (
        <TouchableOpacity testID={testID} onPress={onPress}>
            <Container width={dimension.width} align="center">
                <Avatar
                    size={size}
                    photo={photo}
                    border={true}
                    isBorderGreen={unread}
                />
                <Name
                    marg="4px 0 0 0"
                    textAlign="center"
                    size={14}
                    family="Circularstd-Book"
                    numberOfLines={1}
                    style={{ width: '70%' }}
                >
                    {name}
                </Name>
            </Container>
        </TouchableOpacity>
    );
};

export const AvatarStory = memo(
    AvatarStoryComponent,
    (prevProps, nextProps) => {
        return prevProps.unread === nextProps.unread;
    }
);
