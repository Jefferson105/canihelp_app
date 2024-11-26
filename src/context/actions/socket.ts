import { Socket } from 'socket.io-client';

import {
    ACCEPT_HELP,
    CLOSE_HELP,
    CLOSE_PROPOSAL,
    DELETE_POST,
    FINISH_HELP,
    NEW_COMMENT,
    NEW_HELP,
    NEW_MESSAGE,
    NEW_NOTIFICATION,
    NEW_POST,
    NEW_PROPOSAL,
    READ_CONVERSATION,
    UPDATE_HELP,
    UPDATE_POST,
    UPDATE_PROPOSAL,
    UPDATE_USER
} from '@constants/index';
import { coordsDistance } from '@services/location';
import { postsIterator } from '@context/actions/social';
import { addMessage } from '@context/actions/chat';
import { globalState } from '@context/index';
import { socialDispatch, infoDispatch } from '@context/dispatches';

let globalSocket = null;

export const socketListeners = (socket: Socket) => {
    globalSocket = socket;

    socket.io.on('reconnect', () => {
        const { messages: conversation } = globalState;

        if (conversation) {
            const messageKey = 'messages' + conversation;
            const messages = globalState[messageKey];

            if (messages?.mutate) messages.mutate();
        }
    });

    socket.on(NEW_MESSAGE, (data) => {
        addMessage(data);
    });

    socket.on(READ_CONVERSATION, (data) => {
        const messageKey = 'messages' + data.ConversationID;
        const messages = globalState[messageKey];

        if (messages?.mutate) {
            messages.mutate(
                () => messages.list.map((m) => ({ ...m, Status: 'read' })),
                false
            );
        }
    });

    socket.on(NEW_NOTIFICATION, (data) => {
        const { notifications } = globalState;

        if (notifications?.mutate)
            notifications.mutate(() => [data, ...notifications.list], false);
    });

    socket.on(NEW_POST, (data) => {
        const {
            location: { coords },
            social: { location, distance },
            postsList
        } = globalState;

        const userLocation = {
            Lat: location?.latitude || coords?.latitude,
            Lon: location?.longitude || coords?.longitude
        };

        const postDistance = coordsDistance(
            userLocation.Lat,
            userLocation.Lon,
            data.Location.Lat,
            data.Location.Lon
        );

        if (
            distance >= postDistance &&
            postsList?.mutate &&
            !postsList?.list?.some((p) => String(p?._id) === String(data?._id))
        )
            postsList.mutate(() => [data, ...postsList.list], false);

        socialDispatch({ hasNewPost: true });
    });

    socket.on(UPDATE_POST, (data) => {
        const mapper = (p) => {
            if (String(p._id) === String(data._id)) return { ...p, ...data };

            return p;
        };

        postsIterator(mapper);
    });

    socket.on(DELETE_POST, (data) => {
        const filter = (p) => {
            return String(p._id) !== String(data);
        };

        postsIterator(filter, 'filter');
    });

    socket.on(NEW_COMMENT, (data) => {
        const mapper = (p) => {
            if (p._id === data.PostID) {
                p.Comments = p.Comments + 1;
            }

            return p;
        };

        postsIterator(mapper);

        const { comments, post } = globalState;

        if (comments?.mutate && post?.list[0]?._id === data.PostID)
            comments.mutate(() => [data, ...comments.list], false);
    });

    socket.on(NEW_HELP, (data) => {
        const { helps } = globalState;

        if (helps?.mutate) helps.mutate(() => [data, ...helps.list], false);
    });

    socket.on(UPDATE_HELP, (data) => {
        const { helps } = globalState;

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.map((h) =>
                        String(h._id) === String(data._id)
                            ? { ...h, ...data }
                            : h
                    ),
                false
            );
    });

    socket.on(FINISH_HELP, (data) => {
        const { singleHelp, helpsProgress } = globalState;

        if (data?.Closed && helpsProgress?.mutate)
            helpsProgress.mutate(
                () =>
                    helpsProgress.list.filter(
                        (h) => String(h._id) !== String(data.HelpID)
                    ),
                false
            );

        if (singleHelp.mutate && singleHelp.list[0]._id === data.HelpID)
            singleHelp.mutate(
                () => [
                    {
                        ...singleHelp.list[0],
                        ProviderStatus: data?.Closed
                            ? 'finished'
                            : 'finish_pending'
                    }
                ],
                false
            );
    });

    socket.on(ACCEPT_HELP, (data) => {
        const { helps, helpsProgress, hasUnreadFinished } = globalState;
        const proposals = globalState['proposals' + String(data.HelpID)];

        if (proposals?.mutate && proposals.list[0]._id === data.ProposalID)
            proposals.mutate(
                () => [{ ...proposals, Status: 'accepted' }],
                false
            );

        const help = helps.list.filter(
            (h) => String(h._id) === String(data.HelpID)
        );

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.filter(
                        (h) => String(h._id) !== String(data.HelpID)
                    ),
                false
            );

        const updatedHelp = {
            ...help,
            LastDate: new Date(),
            Provider: proposals?.list[0].User,
            ProposalSelected: data.ProposalID
        };

        if (helpsProgress?.mutate)
            helpsProgress.mutate(
                () => [updatedHelp, ...helpsProgress.list],
                false
            );

        if (hasUnreadFinished?.mutate)
            hasUnreadFinished.mutate(
                () => [hasUnreadFinished.list[0] + 1],
                false
            );
    });

    socket.on(NEW_PROPOSAL, (data) => {
        const { helps, singleHelp, hasUnreadProposals } = globalState;

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.map((h) => {
                        if (String(h._id) === String(data.HelpID)) {
                            h.UnreadProposals += 1;
                            h.LastDate = new Date();
                            h.Recents = h.Recents
                                ? [data.User, ...h.Recents].slice(0, 3)
                                : [data.User];
                        }

                        return h;
                    }),
                false
            );

        const proposals = globalState['proposals' + String(data.HelpID)];

        if (
            proposals?.mutate &&
            String(singleHelp?.list[0]?._id) === String(data.HelpID)
        )
            proposals.mutate(() => [data, ...proposals.list], false);

        if (hasUnreadProposals)
            hasUnreadProposals.mutate(
                () => [hasUnreadProposals.list[0] + 1],
                false
            );
    });

    socket.on(UPDATE_PROPOSAL, (data) => {
        const { singleHelp } = globalState;

        const proposals = globalState['proposals' + String(data.HelpID)];

        if (
            proposals?.mutate &&
            String(singleHelp?.list[0]?._id) === String(data.HelpID)
        )
            proposals.mutate(
                () =>
                    proposals.list.map((p) =>
                        String(p._id) === String(data._id)
                            ? { ...p, ...data }
                            : p
                    ),
                false
            );
    });

    socket.on(CLOSE_PROPOSAL, (data) => {
        const { helps } = globalState;

        if (helps?.mutate) {
            helps.mutate(
                () =>
                    helps.list.map((h) =>
                        String(h._id) === String(data.HelpID)
                            ? {
                                  ...h,
                                  Recents: h.Recents.filter(
                                      (r) => r._id !== data.UserID
                                  ),
                                  ProviderStatus: 'sent'
                              }
                            : h
                    ),
                false
            );
        }
        const proposals = globalState['proposals' + String(data.HelpID)];
        if (proposals?.mutate) {
            proposals.mutate(
                () =>
                    proposals.list.filter(
                        (p) => String(p._id) !== String(data.ProposalID)
                    ),
                false
            );
        }
    });

    socket.on(CLOSE_HELP, (data) => {
        const { helps } = globalState;

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.filter(
                        (h) => String(h._id) !== String(data.HelpID)
                    ),
                false
            );
    });
};

export const listenerOnlineUser = (user: string) => {
    globalSocket?.emit('ONLINE', { users: [user] }, (data) => {
        const { onlineUsers = [] } = globalState.info;

        const online = data.filter((u) => u.online).map((u) => u.user);

        if (
            online.length &&
            online.some((u) => onlineUsers?.indexOf(u) === -1)
        ) {
            const allOnlineUsers = [...online, ...onlineUsers].reduce(
                (acc, v) => {
                    if (acc.indexOf(v) === -1) acc.push(v);

                    return acc;
                },
                []
            );

            infoDispatch({ onlineUsers: allOnlineUsers });
        }
    });

    globalSocket?.on(UPDATE_USER + '_' + user, (data) => {
        const { onlineUsers = [] } = globalState.info;

        if (data.Online) {
            if (onlineUsers.indexOf(data._id) === -1)
                infoDispatch({ onlineUsers: [data._id, ...onlineUsers] });
        } else {
            if (onlineUsers.indexOf(data._id) !== -1)
                infoDispatch({
                    onlineUsers: onlineUsers.filter((u) => u !== data._id)
                });
        }
    });
};

export const sendSearchMetadata = (category) => {
    globalSocket.emit('SEARCH_PROVIDER', { category });
};

export const sendProfileMetadata = (profile) => {
    globalSocket.emit('SEARCH_PROVIDER', { profile });
};
