import React from 'react';
import styled, { css } from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { Container } from '@styles/index';

interface BgStyle {
    children?: any;
    colors?: Array<any>;
    top?: number;
    type?: string;
    radius?: number;
    width?: '100%' | number;
    height?: number;
    linearType?: 'vertical' | 'horizontal';
}

const Bg = ({
    children,
    colors,
    top,
    type,
    radius,
    width,
    height,
    linearType
}: BgStyle) => {
    let linear;

    if (type === 'plan')
        return (
            <Container
                style={{
                    marginTop: top,
                    width: width,
                    height: height,
                    borderRadius: radius,
                    shadowColor: '#00000080',
                    shadowOffset: {
                        width: 0,
                        height: 4
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.0,
                    elevation: 8
                }}
            >
                <Container
                    style={{
                        backgroundColor: '#fff',
                        borderRadius: radius,
                        borderWidth: 0.5,
                        borderColor: '#E3E3E3',
                        overflow: 'hidden'
                    }}
                >
                    {children}
                </Container>
            </Container>
        );
    else if (linearType === 'vertical')
        linear = {
            start: { x: 0, y: 0 },
            end: { x: 0, y: 1 }
        };
    else
        linear = {
            start: { x: 0, y: 0 },
            end: { x: 1, y: 0 }
        };

    return (
        <LinearGradient
            start={linear.start}
            end={linear.end}
            colors={colors}
            style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: top
            }}
        >
            {children}
        </LinearGradient>
    );
};

interface ButtonStyleProps {
    type?: 'default' | 'plan' | 'disabled';
    justify?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around';
}

// TESTE - Foram removidos os backgrounds dos botões
const BtnStyle = ({ type, justify }: ButtonStyleProps) => {
    switch (type) {
        case 'disabled':
            return css`
                justify-content: ${justify || 'center'};
            `;
        case 'plan':
            return css`
                justify-content: ${justify || 'space-between'};
            `;
        default:
            return css`
                justify-content: ${justify || 'center'};
            `;
    }
};

const Btn = styled.TouchableOpacity<ButtonProps>`
    width: ${({ width }) => (typeof width === 'string' ? width : width + 'px')};
    height: ${({ type, height }) =>
        height ? height : type === 'plan' ? 50 : 56}px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 ${({ withPadding }) => (withPadding ? 10 : 0)}px;
    ${(props) => BtnStyle(props)}
`;

interface TextProps {
    weight?: 'normal' | 'bold';
    type?: 'default' | 'plan' | 'disabled';
    family?: string;
    size?: number;
    color?: string;
    hasLeft: boolean;
    marginL?: string | number;
    textAlign?: string;
}

const TxtStyle = ({ type, color, hasLeft }: TextProps) => {
    switch (type) {
        case 'plan':
            return css`
                color: ${color || '#4E4E4E'};
                font-family: Circularstd-Book;
                flex: 1;
            `;
        default:
            return css`
                color: ${color || '#fff'};
                ${hasLeft && 'flex: 1'};
            `;
    }
};

const Txt = styled.Text<TextProps>`
    font-family: ${({ family }) => (family ? family : 'Axiforma-Bold')};
    font-size: ${({ size }) => (size ? size : 16)}px;
    text-align: ${({ textAlign }) => (textAlign ? textAlign : 'center')};
    font-weight: ${({ weight = 'normal' }) => weight};
    margin-left: ${({ marginL }) => (marginL ? marginL + 'px' : '0px')};
    ${(props) => TxtStyle(props)};
`;

const Left = styled.View`
    margin-left: 10px;
`;

interface ButtonProps {
    onPress?: () => void;
    text?: string;
    justify?:
        | 'center'
        | 'flex-start'
        | 'flex-end'
        | 'space-between'
        | 'space-around';
    left?: any;
    color?: string;
    type?: 'default' | 'plan' | 'disabled';
    weight?: 'normal' | 'bold';
    top?: number;
    bottom?: number;
    width?: '100%' | number;
    height?: number;
    family?: string;
    size?: number;
    linearType?: 'vertical' | 'horizontal';
    disabled?: boolean;
    withPadding?: boolean;
    radius?: number;
    testID?: string;
    textAlign?: string;
    textMarginL?: number;
}

const Button = ({
    onPress,
    text,
    type = 'default',
    left,
    top = 0,
    bottom,
    width = '100%',
    height,
    family,
    size,
    linearType,
    withPadding = true,
    justify,
    weight,
    color,
    disabled = false,
    radius = 5,
    testID,
    textAlign,
    textMarginL
}: ButtonProps) => {
    return (
        <Bg
            colors={
                type === 'default' && !disabled
                    ? ['#ff7c31', '#ff6973']
                    : ['#7f8c8d', '#7f8c8d']
            }
            top={top}
            type={type}
            radius={radius}
            width={width}
            height={height}
            linearType={linearType}
        >
            <Btn
                testID={testID}
                width={width}
                height={height}
                type={type}
                withPadding={withPadding}
                onPress={onPress}
                bottom={bottom}
                justify={justify}
                disabled={disabled}
                top={top}
            >
                {left ? <Left>{left}</Left> : null}
                <Txt
                    marginL={textMarginL}
                    textAlign={textAlign}
                    weight={weight}
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    type={type}
                    color={color}
                    hasLeft={!!left}
                    family={family}
                    size={size}
                >
                    {text}
                </Txt>
            </Btn>
        </Bg>
    );
};

export default Button;
