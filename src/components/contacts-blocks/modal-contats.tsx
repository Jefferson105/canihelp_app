import React from 'react';

import { Container, ModalItem, Float } from '@styles/index';
import { Modal } from 'react-native';

import { checkConnect } from '@utils/index';
import { useSelector } from '@context/index';

interface ModalOptionsProps {
    active: boolean;
    close: () => void;
    action: any;
    item: any;
}
const ModalActions = ({ active, close, action, item }: ModalOptionsProps) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));
    return (
        <Modal visible={active} transparent={true} animationType="fade">
            <Container
                flex={1}
                color="rgba(0, 0, 0, 0.5)"
                onPress={() => {
                    close();
                }}
            />
            <Float width="100%" bottom="-15px" left="0%" right="10%">
                <Container
                    justify="center"
                    marg="auto auto 0 auto"
                    align="center"
                    width="100%"
                    color="#fff"
                    height="52px"
                    radius={10}
                >
                    <ModalItem
                        isLast={true}
                        onPress={checkConnect.bind({}, isConnected, () => {
                            close();
                            action.action(item);
                        })}
                        color="#FA1616"
                        text={action.text}
                        testeID={item.Rating}
                    />
                </Container>

                <Container
                    justify="center"
                    radius={10}
                    marg="16px auto 38px auto"
                    align="center"
                    width="100%"
                    color="#fff"
                    height="50px"
                >
                    <ModalItem
                        isLast={true}
                        onPress={() => {
                            close();
                        }}
                        text={'Cancelar'}
                    />
                </Container>
            </Float>
        </Modal>
    );
};

export default ModalActions;
