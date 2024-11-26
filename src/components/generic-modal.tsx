import React from 'react';
import { Modal } from 'react-native';

import { Container as Line, ModalItem, Float, Title } from '@styles/index';
import { checkConnect } from '@utils/index';
import { useSelector } from '@context/index';

export type ModalOptionsProps = {
    onPress: () => void;
    text: string;
    color?: string;
    show: boolean;
    isLast?: boolean;
};

export interface GenericModalProps {
    isVisible: boolean;
    onClose: () => void;
    options: Array<ModalOptionsProps>;
    title?: string;
}

const GenericModal = ({
    title,
    isVisible,
    onClose,
    options
}: GenericModalProps) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const handleClose = () => {
        onClose();
    };

    return (
        <Modal visible={isVisible} transparent={true} animationType="fade">
            <Line flex={1} color="rgba(0, 0, 0, 0.5)" onPress={handleClose} />
            <Float width="100%" bottom="-15px" left="0%" right="10%">
                <Line
                    justify="center"
                    marg="auto auto 0 auto"
                    align="center"
                    width="100%"
                    color="#fff"
                    radius={10}
                >
                    {!!title && (
                        <Line
                            width="100%"
                            color="#f0f0f0"
                            align="center"
                            radius={10}
                        >
                            <Title size={20} top={10} bottom={10}>
                                {title}
                            </Title>
                        </Line>
                    )}
                    {options.map(
                        (option, index) =>
                            option.show && (
                                <Line
                                    key={index}
                                    width="100%"
                                    pad={`0 ${option.isLast ? '8px' : '0'}`}
                                >
                                    <ModalItem
                                        key={index}
                                        onPress={checkConnect.bind(
                                            {},
                                            isConnected,
                                            option.onPress
                                        )}
                                        text={option.text}
                                        color={option.color}
                                    />
                                </Line>
                            )
                    )}
                </Line>
                <Line
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
                        onPress={handleClose}
                        text={'Cancelar'}
                    />
                </Line>
            </Float>
        </Modal>
    );
};

export default GenericModal;
