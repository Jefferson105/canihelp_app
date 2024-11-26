import AsyncStorage from '@react-native-async-storage/async-storage';

import { showError } from '@utils/index';
import { uploadFile } from '@services/upload';
import { mutateApi } from '@services/mutate-api';
import { captureMessage } from '@sentry/react-native';
import { globalState } from '@context/index';
import { pendingMessageDispatch } from '@context/dispatches';
import {
    IMessageOffline,
    ISendMessage,
    IStoreMessage
} from '@ts/interfaces/chat';

let isSendingqueueMessages = false;

export const sendQueueMessages = async (
    queueMessages: IMessageOffline[]
): Promise<void> => {
    if (isSendingqueueMessages) return;
    isSendingqueueMessages = true;

    try {
        for (const queueMessage of queueMessages) {
            const { ConversationID, Type, File, Message, MessageID } =
                queueMessage;

            const data = await mutateApi({
                name: 'messagesCreate',
                params: {
                    Message,
                    Type,
                    File,
                    ConversationID
                }
            });

            if (!data) throw Error('error');

            await removeQueueMessage(MessageID);

            // TODO: get new messages from sync
        }
    } catch (err) {
        showError(err, 'send_queue_messages');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@sendQueueMessages{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    } finally {
        isSendingqueueMessages = false;
    }
};

export const storeQueueMessage = async ({
    ConversationID,
    Type,
    File,
    Message,
    MessageID
}: IStoreMessage): Promise<void> => {
    const NotConnectedMessageQueue: IMessageOffline = {
        Message,
        Type,
        File,
        ConversationID,
        MessageID: String(MessageID)
    };

    try {
        const queueMessages = await AsyncStorage.getItem(
            '@Canihelp:QueueMessages'
        );

        if (queueMessages) {
            AsyncStorage.setItem(
                '@Canihelp:QueueMessages',
                JSON.stringify(
                    JSON.parse(queueMessages).concat(NotConnectedMessageQueue)
                )
            );
        } else {
            AsyncStorage.setItem(
                '@Canihelp:QueueMessages',
                JSON.stringify([NotConnectedMessageQueue])
            );
        }
    } catch (err) {
        showError(err, 'store_queue_message');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@storeQueueMessage{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const removeQueueMessage =
    (MessageID: string) => async (): Promise<void> => {
        const queueMessages = await AsyncStorage.getItem(
            '@Canihelp:QueueMessages'
        );

        if (!queueMessages) return;

        await AsyncStorage.setItem(
            '@Canihelp:QueueMessages',
            JSON.stringify(
                JSON.parse(queueMessages).filter(
                    (message: IMessageOffline) =>
                        message.MessageID !== MessageID
                )
            )
        );
    };

export const sendMessageOffline = async ({
    ConversationID,
    Message,
    Type,
    File
}: ISendMessage): Promise<void> => {
    const { user } = globalState;

    try {
        const MessageID = new Date().getTime().toString();

        const data = {
            ConversationID,
            CreatedAt: new Date(),
            Help: null,
            Message,
            Sender: {
                ...user,
                MainCategory: user.Categories.find(
                    (category) => category.IsPrimary === true
                )
            },
            Status: 'queue',
            Type,
            UpdatedAt: new Date(),
            _id: MessageID
        };

        await storeQueueMessage({
            ConversationID,
            MessageID,
            Type,
            File,
            Message
        });

        const messageKey = 'messages' + ConversationID;
        const messages = globalState[messageKey];
        if (messages.mutate)
            messages.mutate(() => [data, ...messages.list], false);
    } catch (err) {
        showError(err, 'Send message');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@sendMessageOffline{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const addMessage = (message) => {
    const { conversations, hasUnreadMessages, user } = globalState;

    const messageKey = 'messages' + message.ConversationID;
    const messages = globalState[messageKey];

    const userIsSender = user._id === message.Sender;

    try {
        if (messages?.mutate) {
            const messageInList = messages.list.find(
                (m) => m._id === message._id
            );

            if (!messageInList) {
                messages.mutate(() => [message].concat(messages.list), false);
            } else if (messageInList.Status === 'pending')
                messages.mutate(
                    () =>
                        messages.list.map((m) =>
                            m._id === message._id
                                ? { ...message, Status: message.Status }
                                : m
                        ),
                    false
                );
            else if (messageInList) return;
        }

        if (conversations?.mutate) {
            const conversation = conversations.list.find(
                (c) => c._id === message.ConversationID
            );

            if (conversation)
                conversations.mutate(
                    () =>
                        conversations.list.map((c) => {
                            if (c._id === message.ConversationID) {
                                c.LastMessage = message;

                                if (!userIsSender) {
                                    c.Unread += 1;
                                }
                            }

                            return c;
                        }),
                    false
                );
            else conversations.mutate();
        }

        if (hasUnreadMessages?.mutate && !userIsSender)
            hasUnreadMessages.mutate(
                () => [hasUnreadMessages.list[0] + 1],
                false
            );
    } catch (err) {
        showError(err, 'add_message');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@addMessage{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const sendFileMessage = async ({ message }) => {
    const userToken = globalState?.user?.Token;
    console.log('userToken', userToken);
    try {
        const fileMessage = await uploadFile({
            fileName: message.File.name,
            folder: 'chat',
            type: message.File.type,
            uri: message.File.uri,
            token: userToken,
            path: '/messages',
            data: {
                _id: message._id,
                message: message.Message,
                type: message.Type,
                conversationID: String(message.ConversationID),
                ...(message.SmallImage && {
                    Thumb: {
                        uri: message.SmallImage,
                        type: 'image/jpeg',
                        name: 'thumb-' + message._id + '.jpg'
                    }
                }),
                ...(message.metadata && {
                    metadata: JSON.stringify(message.metadata)
                }),
                ...(message.Reference && {
                    reference: JSON.stringify(message.Reference)
                })
            }
        });

        addMessage(fileMessage);
    } catch (err) {
        console.log('@sendFileMessage', err);
        // TODO: delete image
        //await deleteUpload(image.Url, 'chat', user.Token);

        const messageKey = 'messages' + String(message.ConversationID);
        const messages = globalState[messageKey];
        if (messages?.mutate) {
            messages.mutate(
                () =>
                    messages?.list?.filter(
                        (m) => String(m._id) !== String(message._id)
                    ),
                true
            );
        }

        pendingMessageDispatch('deleteOld', message._id);

        showError(err, 'Send message');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@sendFileMessage{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const sendMessage = async ({
    ConversationID,
    Message,
    Type,
    File,
    metadata,
    Mime,
    Extension,
    Reference,
    SmallImage
}: ISendMessage): Promise<void> => {
    const messageKey = 'messages' + String(ConversationID);

    const {
        info: { isConnected },
        user
    } = globalState;

    const messages = globalState[messageKey];

    const MessageID = new Date().getTime().toString();

    try {
        const res = {
            _id: MessageID,
            ConversationID,
            CreatedAt: new Date(),
            Help: Type === 'help' ? true : null, // check
            Message,
            Sender: user._id,
            SenderID: user._id,
            Status: 'pending',
            Type,
            File,
            Url: Array.isArray(File) ? File[0].uri : File?.uri,
            SmallImage,
            metadata,
            Mime,
            Extension,
            Reference
        };

        if (messages?.mutate) {
            messages.mutate(() => [res, ...messages.list], false);
        }

        if (!isConnected && Type === 'message') {
            await sendMessageOffline({
                ConversationID,
                Message,
                Type,
                File
            });

            return;
        }

        if (Type === 'audio' || Type === 'video' || Type === 'image') {
            pendingMessageDispatch('add', res);

            sendFileMessage({
                message: res
                //token: user.Token
            });

            return;
        }

        const { data } = await mutateApi({
            name: 'messagesCreate',
            params: {
                _id: MessageID,
                Message,
                Type,
                ConversationID,
                ...(Reference && { Reference })
            }
        });

        addMessage(data);
    } catch (err) {
        console.log(err.message);
        if (messages?.mutate) {
            messages.mutate(
                () => messages?.list?.filter((m) => m._id !== MessageID),
                false
            );
        }

        showError(err, 'Send message');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@sendMessage{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const readMessages = async (conversationId: string) => {
    try {
        const { conversations, hasUnreadMessages } = globalState;

        const { success, error } = await mutateApi({
            name: 'messagesRead',
            params: {
                ConversationID: String(conversationId)
            }
        });

        const messageKey = 'messages' + String(conversationId);
        const messages = globalState[messageKey];
        if (messages?.mutate) {
            messages.mutate(
                () =>
                    messages.list.map((m) =>
                        m.Status === 'sent' ? { ...m, Status: 'read' } : m
                    ),
                false
            );
        }

        if (!success) throw error;

        const unread =
            conversations.list.find((c) => c._id === conversationId)?.Unread ||
            0;

        if (conversations?.mutate) {
            conversations.mutate(
                () =>
                    conversations.list.map((c) => {
                        if (String(c._id) === String(conversationId)) {
                            c.Unread = 0;
                        }

                        return c;
                    }),
                false
            );
        }

        if (hasUnreadMessages?.mutate) {
            hasUnreadMessages.mutate(
                () => [hasUnreadMessages.list[0] - unread],
                false
            );
        }

        return;
    } catch (err) {
        showError(err, 'Read messages');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@readMessages{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const archiveConversation = async (conversationId: string) => {
    const { conversations, conversationsArchived } = globalState;

    try {
        if (conversations?.mutate) {
            conversations.mutate(
                () =>
                    conversations.list.filter(
                        (c) => String(c._id) !== String(conversationId)
                    ),
                false
            );
        }

        if (conversationsArchived?.mutate) {
            conversationsArchived.mutate(
                () => [
                    conversations.list.find(
                        (c) => String(c._id) === String(conversationId)
                    ),
                    ...conversationsArchived.list
                ],
                false
            );
        }

        const { success, error } = await mutateApi({
            name: 'conversationsArchive',
            params: {
                ConversationID: String(conversationId)
            }
        });

        if (!success) throw error;

        return true;
    } catch (err) {
        console.log('archiveConversation', err);
        showError(err, 'Archived conversation');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@archiveConversation{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const createConversation = async (participant) => {
    try {
        const { success, data, error } = await mutateApi({
            name: 'conversationsCreate',
            params: { Participant: participant }
        });

        if (!success) throw error;

        return data;
    } catch (err) {
        showError(err, 'createConversation');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@createConversation{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const deleteConversation = async (conversationId, archived = false) => {
    const { conversations, conversationsArchived } = globalState;

    try {
        if (!archived && conversations?.mutate) {
            conversations.mutate(
                () =>
                    conversations.list.filter(
                        (c) => String(c._id) !== String(conversationId)
                    ),
                false
            );
        }

        if (conversationsArchived?.mutate) {
            conversationsArchived.mutate(
                () =>
                    conversationsArchived.list.filter(
                        (c) => String(c._id) !== String(conversationId)
                    ),
                false
            );
        }

        const { success, error } = await mutateApi({
            name: 'conversationsDelete',
            params: {
                ConversationID: String(conversationId),
                Archived: archived
            }
        });

        if (!success) throw error;
    } catch (err) {
        showError(err, 'Delete conversation');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@deleteConversation{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
