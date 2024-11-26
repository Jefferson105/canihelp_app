import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';
import MentionText from '@components/social/post/mentions-text';

import {
    Container as Cont,
    Name,
    Category,
    UserName,
    PopUpMenu,
    Avatar,
    Press,
    Text,
    Input,
    List,
    Suggestion,
    Container,
    Button,
    Small
} from '@styles/index';

import { deleteComment, editComment } from '@context/actions/social';
import { checkConnect, timeParse, userCategory } from '@utils/index';
import { fillMarking, parseSelection } from '@utils/markeds';
import { searchUsers } from '@context/actions/user';
import { IUser, IUserSimpleOut } from '@ts/interfaces/user';

interface CommentProps {
    isFake: boolean;
    user_picture: string;
    user_id: string;
    name: string;
    comment: string;
    id: string;
    postId: string;
    date: string;
    user_name: string;
    markeds?: Partial<IUserSimpleOut>[];
    user?: IUser;
    setIsEditingComment: React.Dispatch<React.SetStateAction<boolean>>;
}

let timer: ReturnType<typeof setTimeout>;

const Comment = (props: CommentProps) => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({ info, user }));

    const [edit, setEdit] = useState(false);
    const [comment, setComment] = useState(props.comment);
    const [search, setSearch] = useState('');
    const [selection, setSelection] = useState(0);
    const [markeds, setMarkeds] = useState(props.markeds);
    const [found, setFound] = useState([]);

    const searchMarks = async () => {
        try {
            const data = await searchUsers(search);
            setFound(
                data.filter(
                    (m) => markeds.map((mark) => mark._id).indexOf(m._id) === -1
                )
            );
        } catch (err) {
            console.log(err);
        }

        if (typeof search !== 'string') return [];
    };

    const fillMarked = (item, selection) => {
        const { part1, part2 } = fillMarking({
            text: comment,
            item,
            selection
        });

        setComment(`${part1} ` + part2);
        setMarkeds([
            ...markeds,
            { _id: item._id, UserName: item.UserName, Name: item.Name }
        ]);
        setSearch(null);
        setSelection(part1.length + 1);
    };

    const changeText = useCallback(
        (txt) => {
            if (txt.length < comment.length && markeds.length) {
                markeds.forEach((m) => {
                    if (txt.indexOf('@' + m.UserName) === -1) {
                        setMarkeds(markeds.filter((mk) => mk._id !== m._id));
                    }
                });
            }

            setComment(txt);
        },
        [markeds, comment.length]
    );

    const selectionChange = useCallback(
        ({ nativeEvent: { selection } }) => {
            setSelection(selection.start);

            const user = parseSelection({ text: comment, selection });

            // fill search user in state
            setSearch(user);
        },
        [comment]
    );

    const isOwner = useMemo(() => {
        return user?._id === props?.user_id;
    }, [props?.user_id, user?._id]);

    const category = useMemo(() => {
        return userCategory(props.user);
    }, [props.user]);

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <Suggestion
                    onPress={() => fillMarked(item, selection)}
                    {...item}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [selection]
    );

    const keyExtractor = useCallback((_, i) => {
        return i.toString();
    }, []);

    const handleEditComment = (save) => {
        checkConnect(isConnected, async () => {
            try {
                if (comment) {
                    save
                        ? editComment({
                              Markeds: markeds.map((m) => m._id),
                              Text: comment,
                              PostID: props.postId,
                              CommentID: props.id
                          })
                        : setComment(props.comment);

                    setEdit(false);
                } else {
                    Alert.alert('Escreva um comentário');
                }
            } catch (err) {
                console.log('@comment, err = ', err);
            }
        });
    };

    const handleDeleteComment = () => {
        checkConnect(isConnected, async () => {
            deleteComment({
                PostID: props.postId,
                CommentID: props.id,
                Text: props.comment
            });
        });
    };

    useEffect(() => {
        if (search?.length <= 1 || !search) {
            setFound([]);
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            searchMarks();
        }, 300);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    return (
        <Cont marg="10px 20px 25px 20px">
            <Cont
                dir="row"
                marg="0px 0 13px 0"
                onPress={checkConnect.bind(
                    {},
                    isConnected,
                    () =>
                        props.user_id !== 'deleted' &&
                        navigation.navigate('Profile', {
                            user: props.user_id
                        })
                )}
                justify="space-between"
                align="flex-start"
                width="100%"
            >
                <Cont dir="row" align="center">
                    <Avatar photo={props.user_picture} />
                    <Cont width={null} marg="0px 0px 0px 15px">
                        <Name size={15}>{props.name}</Name>

                        {props.user_name !== 'deleted' && (
                            <>
                                {category ? (
                                    <Category color={'#323232'}>
                                        {category}
                                    </Category>
                                ) : (
                                    <UserName
                                        family="Circularstd-Book"
                                        size={13}
                                        color={'#323232'}
                                    >
                                        @{props.user_name}
                                    </UserName>
                                )}
                            </>
                        )}
                    </Cont>
                </Cont>
                <Cont width={null} marg="0 0 0 auto" align="flex-end">
                    {!!isOwner && !props.isFake && (
                        <PopUpMenu
                            list={[
                                {
                                    text: 'Editar',
                                    fn: checkConnect.bind(
                                        {},
                                        isConnected,
                                        () => {
                                            setEdit(true);
                                        }
                                    )
                                },
                                {
                                    text: 'Deletar',
                                    fn: checkConnect.bind(
                                        {},
                                        isConnected,
                                        handleDeleteComment
                                    )
                                }
                            ]}
                        />
                    )}
                    <Small>{timeParse(props.date)}</Small>
                </Cont>
            </Cont>
            <Cont width="100%">
                {!edit ? (
                    <>
                        <MentionText
                            msg={comment}
                            markeds={markeds}
                            postId={props.postId}
                        />
                    </>
                ) : (
                    <>
                        <Input
                            testID="test-edit-coment"
                            value={comment}
                            onChangeText={changeText}
                            onSelectionChange={selectionChange}
                            placeholder="Edite seu comentário"
                            placeholderTextColor="#4e4e4e8f"
                            height={40}
                            radius={10}
                            selection={{ start: selection, end: selection }}
                            onFocus={() => props.setIsEditingComment(true)}
                            onBlur={() => props.setIsEditingComment(false)}
                        />
                        <Container marg="-10px 0 4px 0">
                            <List
                                data={found}
                                keyExtractor={keyExtractor}
                                keyboardShouldPersistTaps="always"
                                renderItem={renderItem}
                            />
                        </Container>
                        <Cont
                            justify="flex-end"
                            width="100%"
                            align="center"
                            dir="row"
                        >
                            <Press
                                marg="0 10px 0 0  "
                                pad="5px 16px"
                                onPress={() => handleEditComment(false)}
                                radius={10}
                            >
                                <Text color="#FF6F5C">Cancelar</Text>
                            </Press>
                            <Container>
                                <Button
                                    width={100}
                                    height={36}
                                    text={'Salvar'}
                                    onPress={() => handleEditComment(true)}
                                />
                            </Container>
                        </Cont>
                    </>
                )}
            </Cont>
        </Cont>
    );
};

export default Comment;
