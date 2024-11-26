import React, { useState, forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styled from 'styled-components/native';

import Shadow from '@styles/layout/shadow';
import { Small } from '@styles/typography/index';
import { Container as Line } from '@styles/index';
import theme from '@styles/theme';
import { Icon } from '@styles/icon';

interface ContainerProps {
    mBottom?: number;
    width?: string;
}

const Container = styled.View<ContainerProps>`
    margin-bottom: ${({ mBottom }) => mBottom}px;
    width: 100%;
`;

const Label = styled.Text`
    font-family: Circularstd-Book;
    font-size: 14px;
    color: #4e4e4e;
    margin-bottom: 7px;
    font-weight: bold;
`;

interface InputContainerView {
    focus: boolean;
}

const InputC = styled.View<InputContainerView>`
    border: 1px solid
        ${({ focus }) => (focus ? theme.COLORS.mainColor : '#EFEFEF')};
    border-radius: 5px;
    padding: 12px;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Input = styled.TextInput<InputContainerView>`
    flex: 1;
    font-family: Circularstd-Book;
    font-size: 16px;
    color: #3e3e3e;
    height: 50px;
`;

const Btn = styled.TouchableOpacity`
    margin-left: auto;
    margin-right: -10px;
    height: 48px;
    width: 48px;
    justify-content: center;
    align-items: center;
`;

interface PasswordInputProps extends TextInputProps {
    value?: string;
    onChangeText?: (e: string) => void;
    onSubmitEditing?: () => void;
    onPress?: () => void;
    focusOn?: () => void;
    label?: string;
    radius?: number;
    width?: string | number;
    background?: string;
    eye?: boolean;
    forgot?: boolean;
    error?: string;
    testID?: string;
    ref: React.ForwardedRef<any>;
}

const PasswordInput: React.ForwardRefRenderFunction<
    TextInput,
    PasswordInputProps
> = (
    {
        value,
        onChangeText,
        onSubmitEditing,
        onPress,
        focusOn,
        label,
        radius = 5,
        width = '100%',
        background = '#FFF',
        eye = true,
        forgot = false,
        error,
        textContentType = 'password',
        ...rest
    },
    ref
) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [focus, setFocus] = useState(false);
    const alertError = error
        ? { type: error.split(':')[0], msg: error.split(':')[1] }
        : { type: 'none', msg: 'none' };

    return (
        <Container mBottom={forgot ? 0 : 20}>
            <Label>{label}</Label>
            <Shadow
                radius={radius}
                width={width}
                background={background}
                shadow={{
                    color: '#00000080',
                    height: 4,
                    opacity: 0.3,
                    radius: 4.65,
                    elevation: 8
                }}
            >
                <InputC testID="password-container" focus={focus}>
                    <Input
                        maxLength={200}
                        ref={ref}
                        placeholder="digite sua senha"
                        autoCapitalize="none"
                        secureTextEntry={hidePassword}
                        returnKeyType="done"
                        value={value}
                        focus={focus}
                        onFocus={() => {
                            setFocus(true);
                            if (focusOn) focusOn();
                        }}
                        onBlur={() => setFocus(false)}
                        onChangeText={(password) => onChangeText(password)}
                        onSubmitEditing={onSubmitEditing}
                        selectionColor={theme.COLORS.mainColor}
                        autoCorrect={false}
                        textContentType={textContentType}
                        {...rest}
                        placeholderTextColor="#6e6e6e"
                    />
                    {eye ? (
                        <Btn
                            onPress={() => {
                                setHidePassword(!hidePassword);
                            }}
                            accessible={true}
                            accessibilityLabel="Password visibility"
                        >
                            <Icon name="eye" />
                        </Btn>
                    ) : null}
                </InputC>
            </Shadow>
            {alertError.type === 'password' && forgot === false ? (
                <Small color={'#FA1616'}>{alertError.msg}</Small>
            ) : null}
            {forgot === true && (
                <Line
                    testID="reset-password-link"
                    align={'flex-end'}
                    onPress={onPress}
                    pad="5px 0 30px 0"
                >
                    <Small
                        color={
                            alertError.type === 'password'
                                ? '#FA1616'
                                : '#4E4E4E'
                        }
                    >
                        Esqueceu sua senha?{' '}
                        <Small
                            color={
                                alertError.type === 'password'
                                    ? '#FA1616'
                                    : '#4E4E4E'
                            }
                            decoration={'underline'}
                        >
                            Redefenir
                        </Small>
                    </Small>
                </Line>
            )}
        </Container>
    );
};

PasswordInput.displayName = 'Password';

export default forwardRef(PasswordInput);
