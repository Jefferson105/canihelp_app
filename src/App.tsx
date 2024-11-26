import React from 'react';
import * as Sentry from '@sentry/react-native';
import { MenuProvider } from 'react-native-popup-menu';
import { enableScreens, enableFreeze } from 'react-native-screens';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import Routes from '@routes/index';
import Base from '@components/base';
import { StateProvider } from '@context/index';
import theme from '@styles/theme';
import { SafeView } from './styles';

// TODO, fix error problem
// import './error/errorHandler';

enableFreeze(true);
enableScreens();

Sentry.init({
    dsn: 'https://596fbc387ce945209b4c1e5a84048fc1@o1299482.ingest.sentry.io/6532142',
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for performance monitoring.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0
});

const App: React.FC = () => {
    return (
        <ThemeProvider theme={theme}>
            <SafeView>
                <MenuProvider>
                    <StateProvider>
                        <StatusBar barStyle="dark-content" />
                        <Routes />
                        <Base />
                    </StateProvider>
                </MenuProvider>
            </SafeView>
        </ThemeProvider>
    );
};

export default Sentry.wrap(App);
