import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert } from 'react-native';

import { Container, Text } from '@styles/index';
import { mainColor } from '@styles/colors';

import { userGeoLocation } from '@context/actions/location';
import { Icon } from '@styles/icon';

interface IProps {
    onSelect?: () => void;
    large?: boolean;
}

const MobileLocation = ({ onSelect, large = true }: IProps) => {
    const [loading, setLoading] = useState(false);

    const onPress = useCallback(async () => {
        try {
            setLoading(true);
            await userGeoLocation();

            if (onSelect) onSelect();
        } catch (err) {
            Alert.alert(
                'Localização não encontrada',
                'Desculpe, não conseguimos encontrar sua localização. Verifique se a localização está ativa ou digite um endereço manualmente.'
            );
        } finally {
            setLoading(false);
        }
    }, [onSelect]);

    useEffect(() => {
        return () => setLoading(false);
    }, []);

    return (
        <Container dir="row" align="center" onPress={onPress} pad="0 0 15px 0">
            {!loading ? (
                <>
                    <Container
                        width="35px"
                        height="35px"
                        color="#FFF"
                        justify="center"
                        align="center"
                        radius={35}
                        marg="0 10px 0 0"
                        border="1px solid #f0f0f0"
                    >
                        <Icon name="aim" height={25} width={25} color="#000" />
                    </Container>
                    <Text weight="700" size={large ? 18 : 14}>
                        Localização móvel atual
                    </Text>
                </>
            ) : (
                <ActivityIndicator
                    color={mainColor}
                    size={large ? 'large' : 'small'}
                />
            )}
        </Container>
    );
};

export default MobileLocation;
