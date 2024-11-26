import React from 'react';

import { Container, Slider, Float, Press } from '@styles/index';
import { Modal } from 'react-native';

import { useSelector } from '@context/index';
import { Icon } from '@styles/icon';

interface ModalOptionsProps {
    active: boolean;
    close: () => void;
}
const ExpandImage = ({ active, close }: ModalOptionsProps) => {
    const {
        profile: {
            list: [{ Portfolio }]
        }
    } = useSelector(({ profile }) => ({
        profile
    }));

    return (
        <Modal visible={active} transparent={true} animationType="fade">
            <Container justify="center" align="center" flex={1} color="#000">
                <Float top="52px" right="0">
                    <Press
                        testID="test-close-portfolio"
                        onPress={() => {
                            close();
                        }}
                    >
                        <Icon name="close" color="#fff" />
                    </Press>
                </Float>
                <Container height="263px">
                    <Slider images={Portfolio} height={213} isEdit={false} />
                </Container>
            </Container>
        </Modal>
    );
};

export default ExpandImage;
