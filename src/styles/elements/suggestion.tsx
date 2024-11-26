import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 5px;
`;

const Pic = styled.Image`
    height: 30px;
    width: 30px;
    border-radius: 100px;
`;

const Main = styled.Text`
    font-family: 'Avenir';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #4b4b4b;
    margin-left: 7px;
`;

const User = styled.Text`
    font-family: 'Avenir';
    margin-left: 5px;
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    color: #a9a9a9;
`;

interface SuggestionProps {
    onPress?: () => void;
    Photo?: string;
    Name?: string;
    UserName?: string;
}

const Suggestion = ({ Photo, Name, UserName, onPress }: SuggestionProps) => {
    return (
        <Container testID="test-mark" onPress={onPress}>
            <Pic source={{ uri: Photo }} />
            <Main>{Name}</Main>
            <User>@{UserName}</User>
        </Container>
    );
};
export default Suggestion;
