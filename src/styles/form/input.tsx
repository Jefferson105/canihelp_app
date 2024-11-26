import React, { useState, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import styled, { css } from 'styled-components/native';

import Shadow from '@styles/layout/shadow';
import { Small } from '@styles/typography/index';
import { Float } from '@styles/layout';
import { Press } from '@styles/index';
import theme from '@styles/theme';
import { Icon } from '@styles/icon';

interface ContainerProps {
    mTop: number;
    mBottom: number;
    width: string;
    flex: number | string;
}

const cStyle = ({ mTop, mBottom, width, flex }) => {
    return css`
        margin-top: ${mTop}px;
        margin-bottom: ${mBottom}px;
        ${width && `width: ${width}`};
        ${flex && `flex: ${flex}`};
    `;
};

const Container = styled.TouchableOpacity<ContainerProps>`
    ${(props) => cStyle(props)};
`;

const Label = styled.Text`
    font-family: Circularstd-Book;
    font-size: 14px;
    color: #4e4e4e;
    margin-bottom: 9.12px;
    font-weight: bold;
`;

const getHeight = (multiline, height) => {
    if (multiline)
        return css`
            min-height: ${height || 120}px;
        `;

    return css`
        height: ${height || 50}px;
    `;
};

const getStyle = ({
    multiline,
    height,
    maxHeight,
    align,
    border,
    focus,
    radius,
    pad,
    editable
}: InpProps) => {
    return css`
        ${getHeight(multiline, height)};
        ${maxHeight && `max-height: ${maxHeight}px`};
        ${border
            ? `border: 1px solid ${focus ? theme.COLORS.mainColor : '#EFEFEF'}`
            : null};
        border-radius: ${radius ? radius : multiline ? 10 : 5}px;
        ${`text-align-vertical: ${align}`};
        padding: ${pad};
        font-family: Circularstd-Book;
        font-size: 16px;
        color: #4e4e4e;
        align-items: flex-end;
        ${multiline && `line-height: 20px`};
        ${!editable && 'background-color: #efefef'};
    `;
};

interface InpProps {
    multiline: boolean;
    height: number;
    maxHeight: number;
    align: string;
    border: boolean;
    radius: number;
    focus: boolean;
    pad: string;
    editable: boolean;
    ref: React.ForwardedRef<any>;
}

const Inp = styled.TextInput<InpProps>`
    ${(props) => getStyle(props)};
`;

interface InputProps extends TextInputProps {
    placeholder?: string;
    value?: string;
    onChangeText?: (e: string | number) => void;
    multiline?: boolean;
    label?: string;
    width?: string;
    height?: number;
    top?: number;
    onSubmitEditing?: () => void;
    align?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    editable?: boolean;
    maxHeight?: number;
    radius?: number;
    onSelectionChange?: ({ nativeEvent: { selection } }) => void;
    bottom?: number;
    border?: boolean;
    flex?: number | string;
    changeHeight?: (h: number) => void;
    maxLength?: number;
    rigth?: boolean;
    left?: boolean;
    background?: string;
    error?: any;
    onClear?: () => void;
    type?: string;
    shadow?: boolean;
    mBottom?: boolean;
    icon?: string;
    iconColor?: string;
    pad?: string;
}

// TODO, corrigir tipagem
const Input: React.ForwardRefRenderFunction<any, InputProps> = (
    {
        rigth = false,
        placeholder,
        value,
        label,
        onChangeText,
        multiline = false,
        width = '100%',
        height,
        top = 0,
        align,
        onSubmitEditing = undefined,
        onFocus,
        maxHeight,
        onSelectionChange,
        radius,
        border = true,
        pad = '0 12px',
        changeHeight,
        flex,
        left,
        maxLength = undefined,
        editable = true,
        background = '#FFF',
        error,
        onClear,
        type,
        shadow,
        mBottom = true,
        textContentType = null,
        ...rest
    },
    ref
) => {
    const [focus, setFocus] = useState(false);
    const [iHeight, setHeight] = useState(height);
    const alertError = error
        ? { type: error.split(':')[0], msg: error.split(':')[1] }
        : { type: 'none', msg: 'none' };

    return (
        <Container
            onPress={onFocus}
            mTop={top}
            mBottom={mBottom ? (alertError.type === type ? 0 : 25) : 0}
            width={width}
            flex={flex}
        >
            {!!label && <Label>{label}</Label>}
            <Shadow
                radius={radius ? radius : multiline ? 10 : 5}
                onPress={() => {
                    if (onFocus) onFocus();
                }}
                background={background}
                shadow={{
                    color: shadow ? '#00000080' : 'transparent',
                    height: shadow ? 4 : 0,
                    opacity: 0.3,
                    radius: radius,
                    elevation: shadow ? 8 : 0
                }}
            >
                {left && (
                    <Float left="-10px" top="4px">
                        <Icon name="loupe" />
                    </Float>
                )}
                <Inp
                    pad={pad}
                    focus={focus}
                    height={iHeight}
                    multiline={multiline}
                    border={border}
                    radius={radius}
                    maxHeight={maxHeight}
                    ref={ref}
                    value={value}
                    placeholder={placeholder}
                    selectionColor={theme.COLORS.mainColor}
                    onChangeText={onChangeText}
                    onContentSizeChange={(event) => {
                        const eHeight = event.nativeEvent.contentSize.height;

                        changeHeight &&
                            changeHeight(eHeight < 40 ? 40 : eHeight);

                        if (multiline) {
                            if (eHeight < maxHeight && eHeight > height)
                                setHeight(event.nativeEvent.contentSize.height);

                            if (String(value).length < 15) setHeight(height);
                        }
                    }}
                    onFocus={() => {
                        setFocus(true);
                    }}
                    onBlur={() => setFocus(false)}
                    onSubmitEditing={onSubmitEditing}
                    onSelectionChange={onSelectionChange}
                    align={align ? align : multiline ? 'top' : 'center'}
                    caretHidden={false}
                    maxLength={maxLength}
                    editable={editable}
                    pointerEvents={editable ? 'auto' : 'none'}
                    textContentType={textContentType}
                    accessible={true}
                    accessibilityLabel={placeholder || 'Input'}
                    {...rest}
                />
                {rigth && (
                    <Float right="-14px" top="-5px">
                        <Press testID="test-input-clear" onPress={onClear}>
                            <Icon
                                name="clear"
                                height={40}
                                width={40}
                                color="#fff"
                            />
                        </Press>
                    </Float>
                )}
            </Shadow>
            {alertError.type === type ? (
                <Small color={'#BE0000'}>{alertError.msg}</Small>
            ) : null}
        </Container>
    );
};

Input.displayName = 'Input';

export default forwardRef(Input);
