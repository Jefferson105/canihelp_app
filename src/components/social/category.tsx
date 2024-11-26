import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Float, Container } from '@styles/index';

interface CategoryProps {
    name: string;
    search: boolean;
}

const Category = ({ name, search }: CategoryProps) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    if (search)
        return (
            <Container pad="10px 20px">
                <Button
                    justify="space-between"
                    weight="normal"
                    text={name}
                    onPress={() =>
                        navigation.navigate('Categories', {
                            next: 'SearchResult'
                        })
                    }
                />
            </Container>
        );

    return (
        <Float
            width="100%"
            top={`${Platform.OS === 'android' ? 0 : insets.top}px`}
        >
            <Button
                justify="space-between"
                weight="normal"
                text="Qual serviço procura?"
                onPress={() => navigation.navigate('Categories')}
            />
        </Float>
    );
};

export default Category;
