import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert, Modal, View } from 'react-native';

import useRequest from '@hooks/request';
import { useSelector } from '@context/index';
import { boxReportDispatch } from '@context/dispatches';
import GenericModal, { ModalOptionsProps } from '@components/generic-modal';

import { Container, ModalItem, Float } from '@styles/index';

import { toggleBlock } from '@context/actions/blocks';
import { followProfile } from '@context/actions/profile';
import { denunciateAction } from '@context/actions/shared';
import { addToast } from '@context/actions/layout';
import { checkConnect } from '@utils/index';
import { TDenunciationUserTitle } from '@ts/types/denunciations';

interface ProfileModalProps {
    active: boolean;
    close: () => void;
    add?: () => void;
    remove?: () => void;
    length?: number;
    UserID?: string;
}

const ModalOptions = ({
    active,
    close,
    add,
    remove,
    length = 0,
    UserID
}: ProfileModalProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({
        info,
        profile,
        user
    }));

    const {
        data: {
            list: [isBlocked]
        },
        mutate: mutateBlocked
    } = useRequest({
        name: !user || profile?._id === user?._id ? null : 'userIsBlocked',
        params: { ContactId: profile?._id }
    });

    const [isVisibleDenunciationModal, setIsVisibleDenunciationModal] =
        useState(false);

    const handleOpenReportPostModal = () => {
        close();

        if (user) {
            setIsVisibleDenunciationModal(true);
        } else {
            Alert.alert(
                'Login necessário',
                'Para realizar a denúncia do conteúdo cadastre-se ou faça o login',
                [
                    {
                        text: 'Cancelar'
                    },
                    {
                        text: 'Login',
                        onPress: () => navigation.navigate('Login')
                    }
                ],
                {
                    cancelable: true
                }
            );
        }
    };

    const handleCloseReportPostModal = () => {
        close();
        setIsVisibleDenunciationModal(false);
    };

    const handleSelectDenunciationTitle = (title: TDenunciationUserTitle) => {
        setIsVisibleDenunciationModal(false);
        boxReportDispatch({
            title: title,
            sendReport: (denunciationDescription: string) => {
                denunciateAction({
                    ReceiverID: profile._id,
                    Title: title,
                    Type: 'User',
                    Description: denunciationDescription
                })
                    .then(() => {
                        addToast({
                            title: 'Obrigado pelo seu help!',
                            description: 'Agora estamos avaliando esse usuário.'
                        });
                    })
                    .catch((err) => {
                        addToast({
                            title: 'Sorry, something went wrong',
                            description:
                                (typeof err === 'string' && err) ||
                                'Error in report this user'
                        });
                    });
            },

            back: setIsVisibleDenunciationModal
        });
    };

    const isEdit = profile._id === user?._id;

    const modalFunctions: Array<{
        onPress: () => void;
        text: string;
        color?: string;
        show: boolean;
        isLast?: boolean;
    }> = [
        {
            onPress: checkConnect.bind({}, isConnected, async () => remove()),
            text: 'Apagar Foto',
            color: '#FA1616',
            show: isEdit
        },
        {
            onPress: checkConnect.bind({}, isConnected, async () => add()),
            text: 'Adicionar Foto',
            show: length < 5 && isEdit
        },
        {
            onPress: checkConnect.bind({}, isConnected, async () => {
                navigation.navigate('CreateProposal', {
                    UserID,
                    goHelp: true
                });
            }),
            text: 'Enviar Orçamento',
            show: !isEdit && user?.MainCategory
        },
        {
            onPress: checkConnect.bind(
                {},
                isConnected,
                () => !isEdit && followProfile(profile._id)
            ),
            text: profile.Following ? 'Deixar de seguir' : 'Seguir',
            show: !isEdit && user
        },
        {
            onPress: checkConnect.bind({}, isConnected, async () => {
                navigation.navigate('Conversation', {
                    id: null,
                    isHelp: false,
                    archived: false,
                    user: profile
                });
            }),
            text: 'Falar no chat',
            show: !isEdit && user
        },
        {
            onPress: checkConnect.bind({}, isConnected, async () => {
                toggleBlock(profile._id);
                mutateBlocked(() => [!isBlocked], false);
                close();
            }),
            text: isBlocked ? 'Desbloquear' : 'Bloquear',
            color: '#FA1616',
            show: !isEdit && user
        },
        {
            onPress: checkConnect.bind(
                {},
                isConnected,
                handleOpenReportPostModal
            ),
            text: 'Denunciar perfil',
            color: '#FA1616',
            show: !isEdit
        }
        /*
        TODO: ADD CALL FUNCTION
        {
            onPress: () => console.log('call'),
            text: 'Fazer Ligação',
            show: !isEdit,
            isLast: true
        }*/
    ];

    const denunciateModalOptions: Array<ModalOptionsProps> = [
        {
            onPress: () =>
                handleSelectDenunciationTitle('Fingindo ser outra pessoa'),
            text: 'Fingindo ser outra pessoa',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Conta falsa'),
            text: 'Conta falsa',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Nome falso'),
            text: 'Nome falso',
            show: true
        },
        {
            onPress: () =>
                handleSelectDenunciationTitle(
                    'Publicação de conteúdo inadequado'
                ),
            text: 'Publicação de conteúdo inadequado',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Assédio'),
            text: 'Assédio',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Outra coisa'),
            text: 'Outra coisa',
            show: true,
            isLast: true
        }
    ];

    return (
        <>
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
                        // height={isMe ? '102px' : '350px'}
                        radius={10}
                    >
                        {modalFunctions.map(
                            (option, index) =>
                                option.show && (
                                    <View
                                        key={index}
                                        style={{
                                            width: '100%',
                                            paddingHorizontal: option.isLast
                                                ? 8
                                                : 0
                                        }}
                                    >
                                        <ModalItem
                                            key={index}
                                            onPress={option.onPress}
                                            text={option.text}
                                            color={option.color}
                                        />
                                    </View>
                                )
                        )}
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

            <GenericModal
                title="Qual o motivo da denuncia?"
                isVisible={isVisibleDenunciationModal}
                onClose={handleCloseReportPostModal}
                options={denunciateModalOptions}
            />
        </>
    );
};

export default ModalOptions;
