import React from 'react';

import { Container, Float, Text, BorderVertical } from '@styles/index';

import { boxConfirmDispatch } from '@context/dispatches';

interface BoxConfirmProps {
    confirm: () => void;
    text?: string;
    title?: string;
}

export const BoxConfirm = ({
    title = ' Deseja confirmar a sua açao?',
    text,
    confirm
}: BoxConfirmProps) => {
    return (
        <Float
            width="100%"
            height="100%"
            bg="rgba(0,0,0,.2)"
            justify="center"
            align="center"
        >
            <Container
                justify="center"
                radius={10}
                align="center"
                width="100%"
                color="#fff"
            >
                <BorderVertical
                    align="center"
                    width="100%"
                    type="bottom"
                    pad={text ? '10px 20px' : '20px'}
                >
                    <Text>{title}</Text>
                </BorderVertical>
                {!!text && (
                    <BorderVertical
                        align="center"
                        width="100%"
                        type="bottom"
                        pad="10px 20px"
                    >
                        <Text size={14}>{text}</Text>
                    </BorderVertical>
                )}

                <Container width="100%" dir="row">
                    <Container
                        onPress={() => boxConfirmDispatch(null)}
                        bBottomL="10px"
                        pad="16px 0"
                        align="center"
                        width="50%"
                    >
                        <Text>Não</Text>
                    </Container>
                    <Container
                        testID="boxConfirm"
                        onPress={() => {
                            confirm();
                            boxConfirmDispatch(null);
                        }}
                        bBottomR="10px"
                        color="#FF6F5C"
                        pad="16px 0"
                        align="center"
                        width="50%"
                    >
                        <Text color="white">Sim</Text>
                    </Container>
                </Container>
            </Container>
        </Float>
    );
};
