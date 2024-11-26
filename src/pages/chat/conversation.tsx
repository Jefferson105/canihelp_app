import React, { useEffect, useMemo, useReducer } from 'react';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Camera from '@components/camera';
import ExpandImageChat from '@components/chat/expand-image';
import Header from '@components/chat/header';
import Footer from '@components/chat/footer';
import Messages from '@components/chat/messages';
import { useDispatch, useSelector } from '@context/index';
import useRequest from '@hooks/request';
import { StateProvider } from '@hooks/context';
import KeyboardView from '@components/keyboardview';

import { SafeView, Loading } from '@styles/index';

import { IUser } from '@ts/interfaces/user';
import { createConversation } from '@context/actions/chat';
import AConversationReducer, {
    SET_ID,
    SET_EXPANDED_MEDIA,
    SHOW_CAMERA,
    SHOW_PICKER
} from '@context/reducers/local/conversation';

type RouteParams = {
    params: {
        id: string | null;
        user: IUser;
        archived: boolean | null;
        postId: string | null;
        description: string | null;
    };
};

const AConversation = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();
    const { id: conversationID, user, archived, postId, description } = params;

    const { user: authUser, conversations } = useSelector(
        ({ user, conversations }) => ({
            user,
            conversations
        })
    );

    const reduce = useReducer(AConversationReducer, {
        expandedMedia: null,
        audios: {},
        messagesLines: {},
        viewables: [],
        showCamera: false,
        showPicker: false,
        recording: false,
        messagesFiniLoading: false,
        ref: postId
            ? {
                  postId,
                  description
              }
            : null,
        id:
            conversationID ||
            conversations?.list?.find(
                (c) =>
                    c._id === conversationID ||
                    c.Participants.find((p) => p._id === user?._id)
            )?._id ||
            null
    });

    const [{ showCamera, id }, dispatchCtx] = reduce;

    const {
        data: { list }
    } = useRequest({
        name: id ? 'conversation' : null,
        params: {
            ConversationID: id
        }
    });

    const conversation = useMemo(() => {
        if (list.length && list[0]._id === id) return list[0];

        return conversations?.list?.find((c) =>
            id ? c._id === id : c.Participants.find((p) => p._id === user?._id)
        );
    }, [conversations, id, list, user]);

    const { participant } = useMemo(() => {
        return {
            participant:
                conversation?.Participants?.find(
                    (participant) => participant._id !== authUser._id
                ) || null
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conversation?.Participants]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (user && !id && !conversation) {
            (async () => {
                try {
                    const cv = await createConversation(user._id);

                    dispatchCtx({ type: SET_ID, data: cv });
                } catch {
                    navigation.goBack();
                }
            })();
        }

        if (conversation && !id)
            dispatchCtx({ type: SET_ID, data: conversation._id });
    }, [user, id, conversation, dispatch, navigation, dispatchCtx]);

    useEffect(() => {
        // set message field current conversation _id
        dispatch({
            messages: id
        });

        return () => {
            dispatch({
                messages: null
            });
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (
            list?.length &&
            conversations?.mutate &&
            !conversations?.list?.some((c) => c._id === list[0]._id)
        ) {
            conversations.mutate(() => [list[0], ...conversations.list], false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [list]);

    if (!conversation && !user) return <Loading />;

    const other = participant || user;

    return (
        <>
            <StateProvider reducer={reduce}>
                <SafeView>
                    <KeyboardView>
                        <ExpandImageChat />
                        <Header user={other} id={id} isArchived={archived} />

                        {!!id && (
                            <Messages
                                conversation={conversation}
                                archived={archived}
                                participant={participant}
                            />
                        )}

                        {!archived && other?._id !== 'deleted' && (
                            <Footer creator={user?.Name} />
                        )}
                    </KeyboardView>
                </SafeView>
            </StateProvider>
            {!!showCamera && (
                <Camera
                    main={showCamera}
                    onAddImg={() => {
                        dispatchCtx({
                            type: SHOW_PICKER,
                            data: true
                        });
                        dispatchCtx({ type: SHOW_CAMERA, data: false });
                    }}
                    onClose={() => {
                        dispatchCtx({ type: SHOW_CAMERA, data: false });
                    }}
                    onCaptureImg={(media) => {
                        dispatchCtx({ type: SHOW_CAMERA, data: false });
                        dispatchCtx({
                            type: SET_EXPANDED_MEDIA,
                            data: {
                                type: 'image',
                                url: media.uri,
                                preview: true,
                                from: 'camera'
                            }
                        });
                    }}
                    onCaptureVideo={(media, videoTime) => {
                        dispatchCtx({ type: SHOW_CAMERA, data: false });
                        dispatchCtx({
                            type: SET_EXPANDED_MEDIA,
                            data: {
                                type: 'video',
                                url: media,
                                duration: videoTime,
                                preview: true,
                                from: 'camera'
                            }
                        });
                    }}
                />
            )}
        </>
    );
};

export default AConversation;
