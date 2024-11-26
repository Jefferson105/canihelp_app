import React from 'react';

import { Container, Divider, Text } from '@styles/index';

interface ModalOptionsProps {
    text: string;
    onPress?: () => void;
    color?: string;
    isLast?: boolean;
    testeID?: number;
}

const ModalItem = ({
    text,
    onPress,
    color,
    isLast = false,
    testeID
}: ModalOptionsProps) => {
    return (
        <>
            <Container
                testID={`modalItem${testeID}`}
                onPress={() => {
                    onPress();
                }}
                pad="12px 0 10px"
                align="center"
                width="100%"
                // type={isLast ? 'none' : 'bottom'}
            >
                <Text color={color} size={15}>
                    {text}
                </Text>
            </Container>
            {!isLast && <Divider />}
        </>
    );
};

export default ModalItem;
