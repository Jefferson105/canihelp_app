import React, { useCallback, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MentionText from '@components/social/post/mentions-text';
import GenericModal, { ModalOptionsProps } from '@components/generic-modal';
import { useSelector } from '@context/index';

import { Container as Cont, Press, Small, PopUpMenu } from '@styles/index';
import { Icon } from '@styles/icon';
import { mainColor } from '@styles/colors';

import { checkConnect } from '@utils/index';
import { handleUrgency } from '@utils/help';
import { likePost } from '@context/actions/social';
import { denunciateAction } from '@context/actions/shared';
import { addToast } from '@context/actions/layout';
import { deletePost } from '@context/actions/social';
import { boxConfirmDispatch, boxReportDispatch } from '@context/dispatches';
import { IUser } from '@ts/interfaces/user';
import { IHelp } from '@ts/interfaces/help';
import { TDenunciationPostTitle } from '@ts/types/denunciations';

const likeColor = (likedByMe) => {
    if (likedByMe) return mainColor;
    return '#000';
};

interface PostFooterProps {
    postId: string;
    description: string;
    creator: IUser;
    likes: number;
    comments: number;
    likedByMe: boolean;
    full: boolean;
    date?: string;
    address: string;
    help: IHelp;
    hasFiles: boolean;
    checkin: boolean;
    isOwner: boolean;
    markeds: any;
    index: number;
    goBackAfterDelete?: boolean;
    userId: string;
}

const PostFooter = ({
    postId,
    description,
    creator,
    likes,
    comments,
    likedByMe,
    full,
    help,
    checkin,
    isOwner,
    markeds,
    index,
    goBackAfterDelete,
    userId
}: PostFooterProps) => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({ info, user }));

    const [isVisible, setIsVisible] = useState(false);

    const handleComments = useCallback(() => {
        navigation.navigate('Post', {
            post: postId
        });
    }, [navigation, postId]);

    const handleStartConversation = useCallback(async () => {
        try {
            if (!user) return null;

            navigation.navigate('Conversation', {
                id: null,
                isHelp: false,
                archived: false,
                user: creator,
                postId,
                description: help
                    ? `Olá, busco por ${help.Category.Name}`
                    : description
            });
        } catch (err) {
            console.log('@post/index, err = ', err);
        }
    }, [creator, description, help, navigation, postId, user]);

    const handleDeletePost = () => {
        boxConfirmDispatch({
            title: `Deseja deletar este post?`,
            confirm: () => {
                deletePost(postId);
                if (goBackAfterDelete) {
                    navigation.goBack();
                }
            }
        });
    };

    const handleEditPost = () => {
        navigation.navigate('CreatePost', {
            edit: postId,
            type: !help ? (checkin ? 'check' : null) : 'help'
        });
    };

    const handleOpenReportPostModal = () => {
        setIsVisible(true);
    };

    const handleCloseReportPostModal = () => {
        setIsVisible(false);
    };

    const handleSelectDenunciationTitle = (title: TDenunciationPostTitle) => {
        setIsVisible(false);

        boxReportDispatch({
            title: title,
            sendReport: (denunciationDescription: string) => {
                denunciateAction({
                    ReceiverID: userId,
                    Title: title,
                    Type: 'Post',
                    Description: denunciationDescription,
                    ResourceID: postId
                })
                    .then(() => {
                        addToast({
                            title: 'Obrigado pelo seu help!',
                            description:
                                'Agora estamos avaliando essa publicação.'
                        });

                        if (full) navigation.goBack();
                    })
                    .catch((err) => {
                        addToast({
                            title: 'Sorry, something went wrong',
                            description:
                                (typeof err === 'string' && err) ||
                                'Error in denunciate post'
                        });
                    });
            },

            back: setIsVisible
        });
    };

    const modalOptions: Array<ModalOptionsProps> = [
        {
            onPress: () =>
                handleSelectDenunciationTitle('Enganoso ou fraudulento'),
            text: 'Enganoso ou fraudulento',
            show: true
        },
        {
            onPress: () =>
                handleSelectDenunciationTitle('Sexualmente inadequado'),
            text: 'Sexualmente inadequado',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Ofensivo'),
            text: 'Ofensivo',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Violência'),
            text: 'Violência',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Conteúdo proibido'),
            text: 'Conteúdo proibido',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Spam'),
            text: 'Spam',
            show: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Notícia falsa'),
            text: 'Notícia falsa',
            show: true
        },
        {
            onPress: () =>
                handleSelectDenunciationTitle('Candidato ou tema político'),
            text: 'Candidato ou tema político',
            show: true,
            isLast: true
        },
        {
            onPress: () => handleSelectDenunciationTitle('Outro'),
            text: 'Outro',
            show: true,
            isLast: true
        }
    ];

    return (
        <Cont width="100%" pad="0 20px">
            {!!help?.Urgency && (
                <Cont
                    align="center"
                    dir="row"
                    justify="space-between"
                    width="100%"
                    marg="0 0 10px 0"
                >
                    <Cont
                        color="#FC08080D"
                        pad="0 10px 3px 10px"
                        border="1px solid #FA1616"
                        radius={1000}
                    >
                        <Small color="#323232">
                            {handleUrgency(help?.Urgency).Text}
                        </Small>
                    </Cont>
                </Cont>
            )}

            <Cont
                marg="0 0 5px 0"
                onPress={() =>
                    checkConnect.bind(
                        {},
                        isConnected,
                        navigation.navigate('Post', {
                            post: postId
                        })
                    )
                }
            >
                {!!description && (!help || full) && (
                    <MentionText
                        line={22}
                        msg={description}
                        maxLines={full ? 0 : 5}
                        markeds={markeds}
                        postId={postId}
                        size={14}
                    />
                )}
            </Cont>
            <Cont dir="row" width="100%" marg="10px 0 0 0">
                <Cont
                    justify="flex-start"
                    dir="row"
                    width="50%"
                    marg="0 0 10px 0"
                    align="center"
                >
                    <Press
                        testID={`test-heart-${index}`}
                        pad="0 20px 0  0"
                        onPress={checkConnect.bind({}, isConnected, () => {
                            if (user) likePost(postId);
                        })}
                    >
                        <Icon
                            name="feather"
                            color={user ? likeColor(likedByMe) : '#d0d0d0'}
                        />
                        <Small> {likes}</Small>
                    </Press>
                    <Press
                        pad="0 20px 0 0"
                        onPress={checkConnect.bind(
                            {},
                            isConnected,
                            handleComments
                        )}
                    >
                        <Icon name="comments" width={24} height={24} />
                        <Small> {comments}</Small>
                    </Press>
                    {!isOwner && creator?._id !== 'canihelp' && (
                        <Press
                            testID={`test-ref-${index}`}
                            pad="0  0 0 0"
                            onPress={checkConnect.bind(
                                {},
                                isConnected,
                                handleStartConversation
                            )}
                        >
                            <Icon
                                name="postChat"
                                width={24}
                                height={24}
                                color={user ? null : '#d0d0d0'}
                            />
                        </Press>
                    )}
                </Cont>

                <Cont minWidth="20px" marg="0px 0px 0px auto" align="flex-end">
                    {isOwner ? (
                        <PopUpMenu
                            testId="test-social-modal"
                            top={5}
                            bottom={5}
                            list={[
                                {
                                    text: 'Editar',
                                    fn: checkConnect.bind(
                                        {},
                                        isConnected,
                                        handleEditPost
                                    )
                                },
                                {
                                    text: 'Deletar',
                                    fn: checkConnect.bind(
                                        {},
                                        isConnected,
                                        handleDeletePost
                                    )
                                }
                            ]}
                        />
                    ) : (
                        <PopUpMenu
                            testId="test-post-modal"
                            top={5}
                            bottom={5}
                            list={[
                                {
                                    text: 'Denunciar publicação',
                                    fn: () => {
                                        if (user) handleOpenReportPostModal();
                                        else {
                                            Alert.alert(
                                                'Login necessário',
                                                'Para realizar a denúncia do conteúdo cadastre-se ou faça o login',
                                                [
                                                    {
                                                        text: 'Cancelar'
                                                    },
                                                    {
                                                        text: 'Login',
                                                        onPress: () =>
                                                            navigation.navigate(
                                                                'Login'
                                                            )
                                                    }
                                                ],
                                                {
                                                    cancelable: true
                                                }
                                            );
                                        }
                                    }
                                }
                            ]}
                        />
                    )}
                </Cont>
            </Cont>

            <GenericModal
                title="Qual o motivo da denuncia?"
                isVisible={isVisible}
                onClose={handleCloseReportPostModal}
                options={modalOptions}
            />
        </Cont>
    );
};

export default PostFooter;
