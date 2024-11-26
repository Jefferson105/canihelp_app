import React, { useRef, useState, useCallback, useEffect } from 'react';
import { View, Platform, ScrollView } from 'react-native';

import { useSelector } from '@context/index';

import { Input, Press, Float, Suggestion, Loading, Text } from '@styles/index';
import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';
import { createComment } from '@context/actions/social';
import { fillMarking, parseSelection } from '@utils/markeds';
import { searchUsers } from '@context/actions/user';
import useKeyboard from '@hooks/keyboad-height';

interface FooterProps {
    post: string;
}

let timer: ReturnType<typeof setTimeout>;

const Footer = ({ post }: FooterProps) => {
    const input = useRef(null);
    const keyboard = useKeyboard();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const isIOS = Platform.OS === 'ios';

    const [text, setText] = useState('');
    const [search, setSearch] = useState(null);
    const [markeds, setMarkeds] = useState([]);
    const [selection, setSelection] = useState(0);
    const [iHeight, setHeight] = useState(40);
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

    const loading = false;
    const handleCreateComment = useCallback(async () => {
        try {
            if (!text) {
                return;
            }

            const Text = text;
            setText('');
            setSearch(null);

            createComment({
                Markeds: markeds,
                Text,
                PostID: post
            });

            if (input && input.current) {
                input.current.blur();
            }
        } catch (err) {
            console.log('@footer, createComment, err = ', err);
        } finally {
            setMarkeds([]);
        }
    }, [markeds, post, text]);

    const fillMarked = useCallback(
        (item) => {
            const { part1, part2 } = fillMarking({ text, item, selection });

            setText(part1 + ' ' + part2);
            setMarkeds([
                ...markeds,
                { _id: item._id, UserName: item.UserName, Name: item.Name }
            ]);
            setSearch(null);
            setSelection(part1.length + 1);
        },
        [markeds, selection, text]
    );

    const changeText = useCallback(
        (txt) => {
            if (txt.length < text.length && markeds.length) {
                markeds.forEach((m) => {
                    if (txt.indexOf('@' + m.UserName) === -1) {
                        setMarkeds(markeds.filter((mk) => mk._id !== m._id));
                    }
                });
            }

            setText(txt);
        },
        [markeds, text.length]
    );

    const selectionChange = useCallback(
        ({ nativeEvent: { selection } }) => {
            setSelection(selection.start);

            const user = parseSelection({ text, selection });

            // fill search user in state
            setSearch(user);
        },

        [text]
    );
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
        <>
            {search?.length >= 1 && (
                <Float
                    bottom={`${
                        iHeight + (isIOS ? (keyboard[0] > 0 ? 32 : 60) : 32)
                    }px`}
                    bg="#FFF"
                    width="100%"
                    maxHeight="196px"
                >
                    {loading && text ? (
                        <Loading overlay={false} />
                    ) : (
                        <ScrollView keyboardShouldPersistTaps="handled">
                            {found.length > 0 &&
                                search?.length >= 1 &&
                                found.map((item, i) => (
                                    <Suggestion
                                        onPress={() => {
                                            fillMarked(item);
                                            input.current.focus();
                                        }}
                                        {...item}
                                        key={i}
                                    />
                                ))}

                            {!found.length && typeof search === 'string' && (
                                <Text pad="10px 0 20px 0">
                                    Nenhum usuário encontrado
                                </Text>
                            )}
                        </ScrollView>
                    )}
                </Float>
            )}

            <View
                style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#fff',
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 0,
                        height: 2
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: 2.62,
                    elevation: 8
                }}
            >
                <Input
                    testID="test-comment"
                    value={text}
                    onChangeText={changeText}
                    onSelectionChange={selectionChange}
                    ref={input}
                    placeholder="Envie um comentário"
                    placeholderTextColor="#4e4e4e8f"
                    height={40}
                    maxHeight={110}
                    radius={10}
                    bottom={0}
                    width="90%"
                    maxLength={140}
                    changeHeight={(h) => setHeight(h)}
                    multiline={true}
                    // Ios multline + selection error  https://github.com/facebook/react-native/issues/30298
                    //  selection={{ start: selection, end: selection }}
                    align="center"
                    background="#fafafa"
                    mBottom={false}
                />
                <Press
                    testID="SendTest"
                    onPress={checkConnect.bind(
                        {},
                        isConnected,
                        handleCreateComment
                    )}
                >
                    <Icon name="send" color={text ? mainColor : '#000'} />
                </Press>
            </View>
        </>
    );
};

export default Footer;
