import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Modal } from 'react-native';

import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { Container as Line, ModalItem, Float } from '@styles/index';

import { checkConnect } from '@utils/index';

import { toggleBlock } from '@context/actions/blocks';
import { toggleContact } from '@context/actions/contacts';
import { archiveConversation, deleteConversation } from '@context/actions/chat';
import { boxConfirmDispatch } from '@context/dispatches';

interface ModalOptionsProps {
    active: boolean;
    close?: () => void;
    defaultUser: any;
    id: string;
    isArchived?: boolean;
}

const ModalChat = ({
    active,
    close,
    defaultUser,
    id,
    isArchived = false
}: ModalOptionsProps) => {
    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({
        user,
        info
    }));

    const {
        data: {
            list: [isContact]
        },
        mutate
    } = useRequest({
        name: 'userIsContact',
        params: { ContactId: defaultUser?._id }
    });

    const {
        data: {
            list: [isBlocked]
        },
        mutate: mutateBlocked
    } = useRequest({
        name: 'userIsBlocked',
        params: { ContactId: defaultUser?._id }
    });

    const navigation = useNavigation();
    const isMe = defaultUser?._id === user?._id;

    const modalFunctions: Array<{
        onPress: () => void;
        text: string;
        color?: string;
        show: boolean;
        isLast?: boolean;
    }> = [
        {
            onPress: checkConnect.bind({}, isConnected, async () => {
                close();
                navigation.navigate('CreateProposal', {
                    UserID: defaultUser?._id,
                    fromChat: true,
                    ConversationID: id
                });
            }),
            text: 'Enviar orçamento',
            show: !isMe && user?.MainCategory && defaultUser?._id !== 'deleted'
        },
        {
            onPress: checkConnect.bind({}, isConnected, () => {
                if (isBlocked) {
                    toggleBlock(defaultUser?._id);
                    mutateBlocked(() => [false], false);
                } else {
                    close();
                    boxConfirmDispatch({
                        title: `Deseja bloquear este contato?`,
                        confirm: () => {
                            toggleBlock(defaultUser?._id);
                            mutateBlocked(() => [true], false);
                        }
                    });
                }
            }),
            text: isBlocked ? 'Desbloquear' : 'Bloquear',
            color: '#FA1616',
            show: !isMe && defaultUser?._id !== 'deleted'
        },
        {
            onPress: checkConnect.bind({}, isConnected, () => {
                if (isContact) {
                    close();

                    boxConfirmDispatch({
                        title: `Deseja remover este contato?`,
                        confirm: () => {
                            toggleContact(defaultUser);
                            mutate(() => [false], false);
                        }
                    });
                } else {
                    toggleContact(defaultUser);
                    mutate(() => [true], false);
                }
            }),
            text: isContact ? 'Remover Contato' : 'Adicionar Contato',
            color: isContact && '#FA1616',
            show: !isMe && defaultUser?._id !== 'deleted'
        },
        {
            onPress: checkConnect.bind({}, isConnected, () => {
                close();
                boxConfirmDispatch({
                    title: `Deseja deletar essa conversa?`,
                    confirm: () => {
                        deleteConversation(id, isArchived);

                        if (isArchived) navigation.navigate('ArchivedMessages');
                        else navigation.navigate('Conversations');
                    }
                });
            }),
            text: 'Deletar Conversa',
            color: '#FA1616',
            show: true
        },
        {
            onPress: checkConnect.bind({}, isConnected, async () => {
                close();
                boxConfirmDispatch({
                    title: isArchived
                        ? 'Deseja desarquivar essa conversa?'
                        : 'Deseja arquivar essa conversa?',
                    confirm: () => {
                        archiveConversation(id);

                        if (isArchived) navigation.navigate('ArchivedMessages');
                        else navigation.navigate('Conversations');
                    }
                });
            }),
            text: isArchived ? 'Desarquivar Conversa' : 'Arquivar Conversa',
            show: !isArchived
        },
        {
            onPress: checkConnect.bind({}, isConnected, () => {
                close();
                navigation.navigate('Profile', {
                    user: defaultUser?._id
                });
            }),
            text: 'Ver perfil',
            show: !isMe && defaultUser?._id !== 'deleted',
            isLast: true
        }
    ];

    const handleClose = () => {
        close();
    };

    return (
        <Modal
            testID="test-modal"
            visible={active}
            transparent={true}
            animationType="fade"
        >
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
                    {modalFunctions.map(
                        (option, index) =>
                            option.show && (
                                <Line
                                    key={index}
                                    width="100%"
                                    pad={`0 ${option.isLast ? '8px' : '0'}`}
                                >
                                    <ModalItem
                                        key={index}
                                        onPress={option.onPress}
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

export default ModalChat;
