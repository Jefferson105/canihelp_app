import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Container, Input, Small } from '@styles/index';

interface SearchInputProps {
    onChangeText: (text: string) => void;
    onClear: () => void;
    backHandler?: () => void;
    text: string;
    location?: boolean;
    icon?: string;
    iconColor?: string;
    placeholder?: string;
}

const SearchInput = ({
    onChangeText,
    onClear,
    backHandler,
    text,
    location,
    icon,
    iconColor,
    placeholder
}: SearchInputProps) => {
    const navigation = useNavigation();

    return (
        <Container
            dir="row"
            pad="57px 0 0 0"
            border={location ? '1px solid #D6D6D6' : null}
        >
            <Input
                testID="test-search-input"
                icon={icon}
                iconColor={iconColor}
                left={true}
                rigth={true}
                onClear={onClear}
                onChangeText={onChangeText}
                value={text}
                flex="1"
                pad="0 42px"
                bottom={0}
                placeholder={placeholder ? placeholder : 'Pesquisar'}
                placeholderTextColor="#6e6e6e"
            />
            <Container
                justify="center"
                align="center"
                pad={'15px 2px'}
                onPress={() => {
                    if (backHandler) backHandler();
                    else navigation.goBack();
                }}
                accessible={true}
                accessibilityLabel="Clear input text"
            >
                <Small family="Circularstd-Bold" size={14} align={'center'}>
                    Cancelar
                </Small>
            </Container>
        </Container>
    );
};

export default SearchInput;
