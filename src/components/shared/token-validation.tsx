import React, { useEffect, useRef, useState, useCallback } from 'react';
import { TextInput } from 'react-native';

import { useSelector } from '@context/index';

import { Token, Text, Container, Group, Loading } from '@styles/index';

import { sendCellPhoneToken, sendEmailToken } from '@context/actions/register';
import { checkConnect, paddingNumber } from '@utils/index';
import { mutateApi } from '@services/mutate-api';

interface TokenValidationProps {
    registerId?: string;
    email?: string;
    cellphone?: string;
    token: string[];
    setToken: React.Dispatch<React.SetStateAction<string[]>>;
    type: 'email' | 'cellphone' | 'delete-account';
    validate: () => Promise<void>;
    loading?: boolean;
}

export const TokenValidation = ({
    email,
    token,
    setToken,
    type,
    cellphone,
    validate,
    loading,
    registerId
}: TokenValidationProps) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [timerToResend, setTimerToResend] = useState(50);

    const tokenField1 = useRef<TextInput>(null);
    const tokenField2 = useRef<TextInput>(null);
    const tokenField3 = useRef<TextInput>(null);
    const tokenField4 = useRef<TextInput>(null);

    const initTimer = useCallback(() => {
        setTimeout(() => {
            let timer;

            setTimerToResend((time) => {
                if (time > 0) timer = time - 1;
                else timer = 0;

                return timer;
            });

            if (timer > 0) initTimer();
        }, 1000);
    }, []);

    const handleSendTokenAgain = useCallback(async () => {
        if (type === 'email') {
            await sendEmailToken(email, registerId);
        } else if (type === 'cellphone') {
            await sendCellPhoneToken(registerId, cellphone);
        } else if (type === 'delete-account') {
            await mutateApi({
                name: 'userSendTokenDelete'
            });
        }

        setTimerToResend(50);
        initTimer();
    }, [type, initTimer, email, registerId, cellphone]);

    const focusOnNextTokenInput = (
        nextInputRef: React.MutableRefObject<TextInput>
    ) => {
        if (nextInputRef?.current?.focus) {
            nextInputRef?.current?.focus();
        }
    };

    const focusOnPreviousTokenInput = ({
        previousInputRef,
        tokenIndexToChange
    }) => {
        if (previousInputRef?.current?.focus) {
            previousInputRef?.current?.focus();

            const newTokensFiled = [...token];
            newTokensFiled[tokenIndexToChange] = '';

            setToken(newTokensFiled);
        }
    };

    const onTokenInputChangeText = (
        position: number,
        value: string,
        nextInputRef
    ) => {
        setToken(
            token.map((n: string, index: number) =>
                index === position ? value : n
            )
        );

        if (value) {
            focusOnNextTokenInput(nextInputRef);
        }
    };

    const showTimerOrResendButton = useCallback(() => {
        return (
            <Text
                onPress={checkConnect.bind(
                    {},
                    isConnected,
                    handleSendTokenAgain
                )}
                decoration={'underline'}
            >
                Reenviar código.
            </Text>
        );
    }, [handleSendTokenAgain, isConnected]);

    useEffect(() => {
        if (token.slice(0, 4).includes('') === false) {
            tokenField1.current.focus();
            validate();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    useEffect(() => {
        initTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Container align="center" width={'100%'}>
            <Group justify="space-between">
                <Token
                    testID="tokenField1"
                    ref={tokenField1}
                    value={token[0]}
                    onChangeText={(value) => {
                        onTokenInputChangeText(0, value, tokenField2);
                    }}
                />
                <Token
                    testID="tokenField2"
                    ref={tokenField2}
                    value={token[1]}
                    onChangeText={(value) => {
                        onTokenInputChangeText(1, value, tokenField3);
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        nativeEvent.key === 'Backspace' &&
                            focusOnPreviousTokenInput({
                                previousInputRef: tokenField1,
                                tokenIndexToChange: 0
                            });
                    }}
                />
                <Token
                    testID="tokenField3"
                    ref={tokenField3}
                    value={token[2]}
                    onChangeText={(value) => {
                        onTokenInputChangeText(2, value, tokenField4);
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        nativeEvent.key === 'Backspace' &&
                            focusOnPreviousTokenInput({
                                previousInputRef: tokenField2,
                                tokenIndexToChange: 1
                            });
                    }}
                />
                <Token
                    testID="tokenField4"
                    ref={tokenField4}
                    value={token[3]}
                    onChangeText={(value) => {
                        onTokenInputChangeText(3, value, tokenField4);
                    }}
                    onKeyPress={({ nativeEvent }) => {
                        nativeEvent.key === 'Backspace' &&
                            focusOnPreviousTokenInput({
                                previousInputRef: tokenField3,
                                tokenIndexToChange: 2
                            });
                    }}
                />
            </Group>
            <Text marg="22px 0 35px 0">{`00:${paddingNumber(
                timerToResend
            )}`}</Text>
            <Container
                border="0.5px solid #EFEFEF"
                marg="0 0 35px 0"
                width="100%"
            />

            {type === 'email' && (
                <Text size={14} align="center">
                    Verifique se o e-mail com o token não foi para sua caixa de
                    SPAM.
                </Text>
            )}

            {loading ? (
                <Loading overlay={false} />
            ) : timerToResend > 0 ? null : (
                <Text align="center" size={14}>
                    Código não chegou? {showTimerOrResendButton()}
                </Text>
            )}
        </Container>
    );
};
