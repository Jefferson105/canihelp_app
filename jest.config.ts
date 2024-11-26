// jest.config.ts
import type { Config } from '@jest/types';
import { defaults } from 'jest-config';
import { defaults as tsjPreset } from 'ts-jest/presets';

//import { pathsToModuleNameMapper } from 'ts-jest/utils';
//import * as tConfig from './tsconfig.json';
//const moduleNameMapper = pathsToModuleNameMapper(tConfig.compilerOptions.paths, { prefix: '<rootDir>/' });

// Sync object
const config: Config.InitialOptions = {
    ...tsjPreset,
    verbose: true,
    preset: 'react-native',
    //testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./jest.setup.js', './.jest/setEnvVars.js'],
    moduleNameMapper: {
        '@context/(.*)': '<rootDir>/src/context/$1',
        '@components/(.*)': '<rootDir>/src/components/$1',
        '@constants/(.*)': '<rootDir>/src/constants/$1',
        '@hooks/(.*)': '<rootDir>/src/hooks/$1',
        '@pages/(.*)': '<rootDir>/src/pages/$1',
        '@routes/(.*)': '<rootDir>/src/routes/$1',
        '@services/(.*)': '<rootDir>/src/services/$1',
        '@styles/(.*)': '<rootDir>/src/styles/$1',
        '@utils/(.*)': '<rootDir>/src/utils/$1',
        '@env': '<rootDir>/envconfig.js'
    },
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    transformIgnorePatterns: [
        'node_modules/(?!(react-native|@react-native|react-native-status-bar-height|react-native-geolocation-service|react-native-linear-gradient|react-native-splash-screen|react-native-fs|react-native-video|react-native-onesignal|react-native-maps|react-native-image-resizer|react-native-progress|react-native-audio-recorder-player|@react-native-community/netinfo|@react-native-camera-roll/camera-roll|@react-native-community/datetimepicker|@sentry/react-native|@react-native/js-polyfills)/)'
    ],    
    transform: {
        //'^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
        '\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.[jt]sx?$': 'babel-jest',
    },
    testRegex: '(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$',
    roots: ['./src/__tests__']
};

export default config;
