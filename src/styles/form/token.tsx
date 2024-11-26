import React, { forwardRef, useState } from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import { mainColor } from '@styles/colors';
import { Shadow } from '@styles/layout';

interface bgStyle {
    children?: any;
    side?: number;
    colors?: Array<string>;
}

const Bg = ({ children, side, colors }: bgStyle) => {
    return (
        <Shadow
            radius={0}
            shadow={{
                color: '#00000080',
                height: 4,
                opacity: 0.3,
                radius: 4.65,
                elevation: 8
            }}
        >
            <LinearGradient
                start={{ x: 0.5, y: 1 }}
                end={{ x: 0.5, y: 0 }}
                colors={colors}
                style={{
                    width: side,
                    height: side,
                    borderRadius: 5,
                    justifyContent: 'center'
                }}
            >
                {children}
            </LinearGradient>
        </Shadow>
    );
};

interface InputProps {
    focus: boolean;
    ref: React.ForwardedRef<any>;
}

const Input = styled.TextInput<InputProps>`
    color: #fff;
    text-align: center;
    font-family: 'Axiforma-Bold';
    font-size: 20px;
`;

type props = {
    testID?: string;
    value: string;
    side?: number;
    onChangeText: (text: string) => void;
    onKeyPress?: (event: any) => void;
};

// TODO, corrigir tipagem
const Token: React.ForwardRefRenderFunction<any, props> = (
    { value, testID, side = 48, ...rest },
    ref
) => {
    const [focus, setFocus] = useState(false);
    const colors = value ? ['#ff7c31', '#ff6973'] : ['#FFF', '#FFF'];
    return (
        <Bg side={side} colors={colors}>
            <Input
                testID={testID}
                value={value}
                ref={ref}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                focus={focus}
                keyboardType="numeric"
                maxLength={1}
                selectionColor={mainColor}
                {...rest}
            />
        </Bg>
    );
};

Token.displayName = 'Token';

export default forwardRef(Token);
