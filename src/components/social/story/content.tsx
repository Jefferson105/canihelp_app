import React from 'react';
import { View } from 'react-native';

import { Image } from '@styles/elements';

interface StoryContentComponentProps {
    imageUrl: string;
}

const StoryContent = ({ imageUrl }: StoryContentComponentProps) => {
    return (
        <View style={{ flex: 1, position: 'relative' }}>
            <Image
                source={{
                    uri: imageUrl
                }}
                style={{
                    flex: 4
                }}
                priority="high"
                resize="contain"
                //onLoadEnd={() =>
                //dispatch({ type: 'SET_LOAD_IMAGE', data: index })
                //}
            />
        </View>
    );
};

export default StoryContent;
