import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Press } from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';
import { AppRootParamList } from '../../types/nav-types';

interface userBadgesProps {
    to?: keyof AppRootParamList;
}

const Back = ({ to = 'Home' }: userBadgesProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    return (
        <Press
            onPress={() => {
                checkConnect.bind(
                    {},
                    isConnected,
                    navigation.navigate(to as any)
                );
            }}
        >
            <Icon name="close" width={18} height={18} color="#000" />
        </Press>
    );
};

export default Back;
