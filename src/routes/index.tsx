import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthNavigation from '@routes/auth';
import UnauthNavigation from '@routes/unauth';
import { useSelector } from '@context/index';

import { Offline } from '@styles/index';

const Navigation = () => {
    const {
        info: { isConnected, storageChecked },
        user
    } = useSelector(({ info, user }) => ({ info, user }));
    if (!storageChecked) return null;

    return (
        <NavigationContainer>
            {!isConnected && <Offline server={isConnected} />}
            {user ? <AuthNavigation /> : <UnauthNavigation />}
        </NavigationContainer>
    );
};

export default Navigation;
