import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';
import { Keyboard, Modal } from 'react-native';

import { Shadow, Container, BorderVertical, Text } from '@styles/index';

interface ContainerProps {
    mTop: number;
    mBottom: number;
    width: string;
    flex: number | string;
}

const cStyle = ({ mTop = 0, mBottom = 0, width = '100%', flex }) => {
    return css`
        margin-top: ${mTop}px;
        margin-bottom: ${mBottom}px;
        ${width && `width: ${width}`};
        ${flex && `flex: ${flex}`};
    `;
};

const Wrapper = styled.View<ContainerProps>`
    ${(props) => cStyle(props)};
`;

const Label = styled.Text`
    font-family: Circularstd-Book;
    font-size: 14px;
    color: #4e4e4e;
    margin-bottom: 9.12px;
`;

interface SelectProps {
    value: string | number;
    setSelectedValue: React.Dispatch<React.SetStateAction<string | number>>;
    options: Array<{
        label: string;
        value: string;
    }>;
    mTop?: number;
    mBottom?: number;
    width?: string;
    flex?: number;
    label?: string;
    shadow?: boolean;
    background?: string;
    borderRadius?: number;
    height?: number;
}

const Select: React.FC<SelectProps> = ({
    value,
    setSelectedValue,
    options,
    mTop,
    mBottom,
    width = '100%',
    flex,
    label,
    shadow = true,
    background = '#FFF',
    borderRadius = 5,
    height = 50
}) => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <Wrapper mTop={mTop} mBottom={mBottom} width={width} flex={flex}>
                {!!label && <Label>{label}</Label>}
                <Shadow
                    radius={borderRadius}
                    background={background}
                    shadow={{
                        color: '#00000080',
                        height: 4,
                        opacity: 0.3,
                        radius: borderRadius,
                        elevation: shadow ? 8 : 0
                    }}
                >
                    <Container
                        height={height + 'px'}
                        justify="center"
                        pad="0 10px"
                        onPress={() => {
                            setModal(true);
                            Keyboard.dismiss();
                        }}
                    >
                        <Text color={value ? undefined : '#4e4e4e8f'}>
                            {value
                                ? options.find((op) => op.value === value).label
                                : 'Selecionar'}
                        </Text>
                    </Container>
                </Shadow>
            </Wrapper>
            <Modal
                visible={modal}
                transparent={true}
                onRequestClose={() => setModal(false)}
                animationType="fade"
            >
                <Container
                    onPress={() => setModal(false)}
                    width="100%"
                    height="100%"
                    color="#00000030"
                    justify="center"
                    pad="0 20px"
                >
                    {options.map((op, i) => (
                        <Container key={i} width="100%">
                            <Container
                                onPress={() => {
                                    setSelectedValue(op.value);
                                    setModal(false);
                                }}
                                pad="15px 20px"
                                width="100%"
                                color="#fff"
                            >
                                <Text>{op.label}</Text>
                            </Container>
                            <BorderVertical width="100%" type="bottom" />
                        </Container>
                    ))}
                </Container>
            </Modal>
        </>
    );
};

Select.displayName = 'Select';

export default Select;
