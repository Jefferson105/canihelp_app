import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-camera-roll/camera-roll');

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/core', () => {
    return {
        useRoute: () => ({ params: {} }),
        useNavigation: () => ({ navigate: jest.fn() }),
        dispatch: () => ({ CommonActions: { reset: jest.fn() } })
    };
});

jest.mock('react-native-fs', () => {
    return {
        mkdir: jest.fn(),
        moveFile: jest.fn(),
        copyFile: jest.fn(),
        pathForBundle: jest.fn(),
        pathForGroup: jest.fn(),
        getFSInfo: jest.fn(),
        getAllExternalFilesDirs: jest.fn(),
        unlink: jest.fn(),
        exists: jest.fn(),
        stopDownload: jest.fn(),
        resumeDownload: jest.fn(),
        isResumable: jest.fn(),
        stopUpload: jest.fn(),
        completeHandlerIOS: jest.fn(),
        readDir: jest.fn(),
        readDirAssets: jest.fn(),
        existsAssets: jest.fn(),
        readdir: jest.fn(),
        setReadable: jest.fn(),
        stat: jest.fn(),
        readFile: jest.fn(),
        read: jest.fn(),
        readFileAssets: jest.fn(),
        hash: jest.fn(),
        copyFileAssets: jest.fn(),
        copyFileAssetsIOS: jest.fn(),
        copyAssetsVideoIOS: jest.fn(),
        writeFile: jest.fn(),
        appendFile: jest.fn(),
        write: jest.fn(),
        downloadFile: jest.fn(),
        uploadFiles: jest.fn(),
        touch: jest.fn(),
        MainBundlePath: jest.fn(),
        CachesDirectoryPath: jest.fn(),
        DocumentDirectoryPath: jest.fn(),
        ExternalDirectoryPath: jest.fn(),
        ExternalStorageDirectoryPath: jest.fn(),
        TemporaryDirectoryPath: jest.fn(),
        LibraryDirectoryPath: jest.fn(),
        PicturesDirectoryPath: jest.fn()
    };
});

jest.mock('react-native-image-picker', () => {
    return {
        launchCamera: jest.fn()
    };
});

jest.mock('react-native-onesignal', () => {
    return {
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        inFocusDisplaying: jest.fn(),
        setLogLevel: jest.fn(),
        setAppId: jest.fn(),
        setNotificationOpenedHandler: jest.fn(),
        promptForPushNotificationsWithUserResponse: jest.fn(),
        setNotificationWillShowInForegroundHandler: jest.fn()
    };
});

jest.mock(
    'react-native//Libraries/PermissionsAndroid/PermissionsAndroid',
    () => ({
        PermissionsAndroid: {
            request: () => {
                true;
            },
            check: () => {
                true;
            }
        }
    })
);

jest.mock('react-native-splash-screen', () => {
    return {
        show: jest.fn(),
        hide: jest.fn()
    };
});

jest.mock('react-native-popup-menu', () => ({
    Menu: 'Menu',
    MenuContext: 'MenuContext',
    MenuOptions: 'MenuOptions',
    MenuOption: 'MenuOption',
    MenuTrigger: 'MenuTrigger'
}));

jest.mock('@react-native-community/datetimepicker', function () {
    const mockComponent = require('react-native/jest/mockComponent');
    return mockComponent('@react-native-community/datetimepicker');
});

// ---- navigation
const mockedNavigate = jest.fn();
const mockedSetOptions = jest.fn();
const mockedGoback = jest.fn();
const mockedRoute = jest.fn((arg = { params: {} }) => arg);
const mockedAddListener = jest.fn();
const mockedDispatch = jest.fn(); // mock para navigation.dispatch
const mockedReset = jest.fn();

jest.mock('@react-navigation/native', () => {
    return {
        useNavigation: () => ({
            navigate: mockedNavigate,
            setOptions: mockedSetOptions,
            goBack: mockedGoback,
            addListener: mockedAddListener,
            dispatch: mockedDispatch // adicionado mock para dispatch
        }),
        useIsFocused: () => jest.fn((arg = true) => arg),
        useRoute: () => mockedRoute(),
        CommonActions: {
            reset: mockedReset
        }
    };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

export { mockedNavigate, mockedGoback, mockedRoute };
