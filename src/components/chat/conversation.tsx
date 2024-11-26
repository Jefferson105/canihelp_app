import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container as Cont,
    Avatar,
    UserName,
    Name,
    PopUpMenu,
    Small,
    Press,
    Text,
    BorderVertical
} from '@styles/index';

import { archiveConversation, deleteConversation } from '@context/actions/chat';
import { checkConnect, timeParse } from '@utils/index';
import { mainColor } from '@styles/colors';
import { boxConfirmDispatch } from '@context/dispatches';
import { IMessage } from '@ts/interfaces/chat';

interface ConversationProps {
    id: string;
    openChat: () => void;
    photo?: string;
    username?: string;
    name?: string;
    category?: string;
    lastMessage?: IMessage;
    isHelp?: boolean;
    date: Date | string;
    arquived?: boolean;
    unread?: number;
    testID?: string;
}

const Conversation = ({
    id,
    openChat,
    photo,
    username,
    name,
    category,
    lastMessage,
    date,
    arquived,
    unread,
    testID
}: ConversationProps) => {
    const navigation = useNavigation();

    const {
        user,
        info: { isConnected }
    } = useSelector(({ user, info }) => ({ user, info }));

    const listPop = useMemo(() => {
        const req = [
            {
                text: 'Deletar',
                fn: checkConnect.bind({}, isConnected, () => {
                    boxConfirmDispatch({
                        title: `Deseja deletar essa conversa?`,
                        confirm: () => {
                            deleteConversation(id, arquived);

                            if (arquived)
                                navigation.navigate('ArchivedMessages');
                            else navigation.navigate('Conversations');
                        }
                    });
                })
            }
        ];

        if (!arquived)
            req.unshift({
                text: 'Arquivar',
                fn: checkConnect.bind({}, isConnected, () => {
                    boxConfirmDispatch({
                        title: `Deseja arquivar essa conversa?`,
                        confirm: () => {
                            archiveConversation(id);

                            if (arquived)
                                navigation.navigate('ArchivedMessages');
                            else navigation.navigate('Conversations');
                        }
                    });
                })
            });

        return req;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arquived, id]);

    return (
        <BorderVertical marg="0 24px" pad="10px 0 10px 0" type="bottom">
            <Cont testID={testID} onPress={openChat}>
                <Cont dir="row" marg="0 0 10px 0" align="center">
                    <Avatar user={username} photo={photo} />
                    <Cont
                        marg="0 0 0 15px"
                        justify="center"
                        align="flex-start"
                        flex={1}
                        width={null}
                    >
                        <Name
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            family="CircularStd-Medium"
                            size={15}
                        >
                            {name}
                        </Name>

                        {username !== 'deleted' && (
                            <>
                                {category ? (
                                    <UserName
                                        family="CircularStd-Book"
                                        size={14}
                                        numberOfLines={1}
                                        ellipsizeMode={'tail'}
                                    >
                                        {category}
                                    </UserName>
                                ) : (
                                    <UserName
                                        family="CircularStd-Book"
                                        size={14}
                                        numberOfLines={1}
                                        ellipsizeMode={'tail'}
                                    >
                                        {username}
                                    </UserName>
                                )}
                            </>
                        )}
                    </Cont>

                    <Cont
                        align="flex-end"
                        justify="flex-start"
                        width="90px"
                        height="100%"
                    >
                        <PopUpMenu testId={testID} list={listPop} />
                        <Small>{timeParse(date)}</Small>
                    </Cont>
                </Cont>

                {!!lastMessage && (
                    <Cont dir="row" justify="space-between" width="100%">
                        <Cont maxWidth="90%">
                            <Text
                                size={14}
                                numberOfLines={1}
                                ellipsizeMode={'tail'}
                            >
                                {lastMessage.Message}
                            </Text>
                        </Cont>
                        {!!(unread && lastMessage.Sender !== user._id) && (
                            <Press
                                marg="3px 0 0 0"
                                bg={mainColor}
                                width={20}
                                height={20}
                                radius={20}
                            >
                                <Small
                                    size={12}
                                    family="CircularStd-Medium"
                                    color="#fff"
                                >
                                    {unread}
                                </Small>
                            </Press>
                        )}
                    </Cont>
                )}
            </Cont>
        </BorderVertical>
    );
};

export default Conversation;
