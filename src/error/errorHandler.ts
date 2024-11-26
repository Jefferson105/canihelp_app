import { Alert } from 'react-native';
import {
    setJSExceptionHandler,
    setNativeExceptionHandler
} from 'react-native-exception-handler';
import { Logger } from '@services/logger';

const logger = new Logger('Error Handler');

interface IEvErr {
    name: string;
    message: string;
}

const errorHandler = (e: IEvErr, isFatal: boolean): void => {
    if (isFatal) {
        Alert.alert(
            'Ocorreu um erro inesperado',
            `
          Error: ${isFatal ? 'Fatal:' : ''} ${e.name} ${e.message}
            Já reportamos isso para nossa equipe! Por favor, feche o aplicativo e comece de novo!
          `,
            [
                {
                    text: 'Close'
                }
            ]
        );
    } else {
        logger.error(String(e)); // So that we can see it in the ADB logs in case of Android if needed
    }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
    console.log('setNativeExceptionHandler', errorString);
});
