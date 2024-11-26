import React, { forwardRef, useState } from 'react';
import styled, { css } from 'styled-components/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger
} from 'react-native-popup-menu';

import Shadow from '@styles/layout/shadow';
import { Icon } from '@styles/icon';
import { TextInputProps } from 'react-native';

interface ContainerProps extends TextInputProps {
    width: number | string;
    height: number | string;
    radius: number;
    ref: React.ForwardedRef<any>;
}

const cStyle = ({ width, height, radius }) => {
    return css`
        width: ${width}${typeof width === 'number' ? 'px' : ''};
        height: ${height}${typeof height === 'number' ? 'px' : ''};
        border: 0.5px solid #efefef;
        border-radius: ${radius}px;
        flex-direction: row;
        align-items: center;
    `;
};

const Container = styled.View<ContainerProps>`
    ${(props) => cStyle(props)};
`;

// DD
const ddStyle = () => {
    return css`
        width: 106px;
        height: 22px;
        border-right-width: 1px;
        border-right-color: #bcbcbc;
        align-items: center;
        justify-content: space-evenly;
        flex-direction: row;
    `;
};

const DD = styled.View`
    ${() => ddStyle()};
`;

const ArticleDD = styled.View`
    align-items: center;
    justify-content: space-evenly;
    flex-direction: row;
    width: 45px;
`;

interface NumberProps {
    size: number;
}

const numberStyle = ({ size }) => {
    return css`
        font-size: ${size}px;
        font-family: Circularstd-Book;
        color: #4e4e4e;
    `;
};
const Number = styled.Text<NumberProps>`
    ${(props) => numberStyle(props)}
`;

// Phone Number
const InputNumber = styled.TextInput<NumberProps>`
    ${(props) => numberStyle(props)}
`;

interface PhoneNumberProps {
    padLeft: number;
}

const phoneNumberStyle = ({ padLeft }) => {
    return css`
        width: 180px;
        padding-left: ${padLeft}px;
    `;
};

const PhoneNumber = styled.View<PhoneNumberProps>`
    ${(props) => phoneNumberStyle(props)};
`;

// Close
const Close = styled.TouchableOpacity`
    background: #c7c7c7;
    width: 21px;
    height: 21px;
    margin: 0 16px 0 0;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

interface PhoneInputProps extends TextInputProps {
    radius?: number;
    width?: number | string;
    height?: number | string;
    background?: string;
    mTop?: number;
    mBottom?: number;
    value?: string;
    placeholder?: string;
    onChangeText?: (e: string) => void;
    padLeft?: number;
    clean?: () => void;
    testID?: string;
    ref: React.ForwardedRef<any>;
}

const PhoneInput: React.ForwardRefRenderFunction<any, PhoneInputProps> = (
    {
        radius = 5,
        width = '100%',
        height = 50,
        background = '#FFF',
        mTop = 41,
        mBottom = 87,
        padLeft = 16.5,
        value,
        placeholder = 'XXXXXXXXX',
        onChangeText,
        clean,
        testID
    },
    ref
) => {
    const [dd, setDd] = useState('+55');
    return (
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
            mTop={mTop}
            mBottom={mBottom}
        >
            <Container width={width} height={height} radius={radius} ref={ref}>
                <DD>
                    <Menu>
                        <MenuTrigger>
                            <ArticleDD>
                                <Number size={15}>{dd}</Number>

                                <Icon name="polygon" width={10} height={10} />
                            </ArticleDD>
                        </MenuTrigger>
                        <MenuOptions>
                            <MenuOption onSelect={() => setDd('+55')}>
                                <ArticleDD>
                                    <Icon name="flag" />
                                    <Number size={15}>{dd}</Number>
                                </ArticleDD>
                            </MenuOption>
                        </MenuOptions>
                    </Menu>
                </DD>
                <PhoneNumber padLeft={padLeft}>
                    <InputNumber
                        testID={testID}
                        size={16}
                        placeholder={placeholder}
                        value={value}
                        placeholderTextColor="#4e4e4e8f"
                        selectionColor={'#4E4E4E'}
                        maxLength={15}
                        keyboardType={'phone-pad'}
                        onChangeText={(value) => onChangeText(value)}
                    />
                </PhoneNumber>
                <Close onPress={() => clean()}>
                    <Icon name="close" color="#FFF" width={12} height={12} />
                </Close>
            </Container>
        </Shadow>
    );
};

PhoneInput.displayName = 'PhoneInput';

export default forwardRef(PhoneInput);
