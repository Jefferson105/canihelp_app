import React, { useEffect, useState, useRef, useCallback } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
    ScrollView,
    View,
    Image,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { SET_TEXT } from '@context/types';
import VideoPlayer from '@components/video-player';
import { FullImagesCarousel } from '@components/social/post/images-carousel';
import CardInfo from '@components/social/card-info';
import { globalState, useDispatch, useSelector } from '@context/index';
import { getState } from '@hooks/context';

import { BorderVertical, Loading, Press, Suggestion } from '@styles/elements';
import { Float, Container } from '@styles/layout';
import { Input } from '@styles/form';
import { fillMarking, parseSelection } from '@utils/markeds';
import {
    addMark,
    removeMark,
    createOptionBody,
    removeImage,
    removeVideo
} from '@context/actions/local/create-post';
import { searchUsers } from '@context/actions/user';
import { Small } from '@styles/typography';
import { Icon } from '@styles/icon';

const placeProvider =
    'Deixe potenciais clientes saber mais sobre seus serviços postando fotos e novidades.\nUtilize a funcionalidade Check-in, deixe toda uma região saber que você está por perto e disponível para orçamentos ou mesmo serviços imediatos. Divulgue, interaja e venda seus serviços!\nCom o perfil profissional você pode também postar sobre um outro serviço que você esteja procurando e não encontrou através da pesquisa.';
const checkIn =
    'Utilize a funcionalidade Check-in, deixe toda uma região saber que você está por perto e disponível para orçamentos ou mesmo serviços imediatos. Divulgue, interaja e venda seus serviços!';
const placeClient =
    'Pesquisou por um profissional ou serviço através da pesquisa e não o encontrou? Divulgue aqui e permita que usuários na região possam te ajudar na procura. Divulgue, interaja e encontre o que precisa!';

const { width } = Dimensions.get('screen');

type RouteParams = {
    params: {
        type: 'help' | 'check' | null;
        edit: any;
    };
};

interface BodyProps {
    type: {
        type: string;
        back: boolean;
        handler: () => void;
        title: string;
    };
    postData: any;
}

let timer: ReturnType<typeof setTimeout>;

const CreatePostBody = ({ type, postData }: BodyProps) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const inputRef = useRef();
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const { user, location } = useSelector(({ user, location }) => ({
        user,

        location
    }));

    const { createHelp } = globalState;

    const [createPost, dispatchCtx] = getState();

    const postId = postData?._id || postData?.edit;
    const shouldAppear = String(createPost.edit) === String(postId);

    const [isModalImagesOpen, setIsModalImagesOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(0);
    const [text, setText] = useState(
        params.type === 'help' ? createHelp?.Description : postData?.Text || ''
    );
    const [selection, setSelection] = useState(0);
    const [focus, setFocus] = useState(false);
    const [found, setFound] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchMarks = async (search) => {
        try {
            setLoading(true);
            const data = await searchUsers(search);

            setFound(
                data.filter(
                    (m) =>
                        createPost.Markeds.map((mark) => mark._id).indexOf(
                            m._id
                        ) === -1
                )
            );
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const getLocation = () => {
        switch (params.type) {
            case 'help':
                return {
                    lat: createHelp?.location?.latitude,
                    lon: createHelp?.location?.longitude,
                    address: params.edit
                        ? postData.Address || postData.info.address
                        : createHelp?.location?.displayName
                };

            case 'check':
                return {
                    lat: location?.coords?.latitude,
                    lon: location?.coords?.longitude,
                    address: location?.coords?.displayName
                };
            default:
                return null;
        }
    };

    const changeText = (txt: string) => {
        if (
            txt[0] === '\n' ||
            (txt[txt.length - 1] === '\n' && txt[txt.length - 2] === '\n')
        )
            return;

        if (txt.length < text.length && createPost?.markeds?.length) {
            createPost.Markeds.forEach((m) => {
                if (txt.indexOf('@' + m._id) === -1) {
                    dispatchCtx(removeMark(m));
                }
            });
        }
        setText(txt);
        dispatchCtx({
            type: SET_TEXT,
            data: txt
        });
    };

    const fillMarked = useCallback(
        (item) => {
            const { part1, part2 } = fillMarking({
                text: text,
                item,
                selection: selection
            });

            dispatchCtx({
                type: SET_TEXT,
                data: part1 + ' ' + part2
            });
            setText(part1 + ' ' + part2);
            setSelection(part1.length + 1);
            setFound([]);
            dispatchCtx(addMark(item));
        },
        [text, selection, dispatchCtx]
    );

    const selectionChange = ({ nativeEvent: { selection } }) => {
        setSelection(selection.start);

        const user = parseSelection({ text: text, selection });

        if (user?.length <= 1 || !user) {
            setFound([]);
            return;
        }

        clearTimeout(timer);
        timer = setTimeout(() => {
            searchMarks(user);
        }, 300);
    };

    const onTextAreaFocus = () => {
        if (!focus) {
            setFocus(true);
        }
    };

    const onTextAreaBlur = () => {
        if (focus) {
            setFocus(false);
        }
    };

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible: !(params.type === 'help' || params.type === 'check')
        });

        dispatch(createOptionBody(params, postData, dispatchCtx, createPost));

        return () =>
            navigation.setOptions({
                tabBarVisible: true
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params]);

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1
            }}
        >
            {(found?.length || loading) && (
                <Float
                    bottom="0px"
                    bg="#fff"
                    width="100%"
                    pad="0px 20px 0px 20px"
                >
                    {loading ? (
                        <Loading overlay={false} />
                    ) : (
                        <ScrollView keyboardShouldPersistTaps="handled">
                            {found.map((item, i) => (
                                <Suggestion
                                    onPress={() => {
                                        fillMarked(item);
                                    }}
                                    {...item}
                                    key={i}
                                />
                            ))}
                        </ScrollView>
                    )}
                </Float>
            )}
            {!shouldAppear && params.edit ? (
                <Container pad="16px 0 0">
                    <Loading overlay={false} />
                </Container>
            ) : (
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 24
                        }}
                    >
                        {!!(type.type && createPost.info) && (
                            <CardInfo
                                type={type.type}
                                location={getLocation()}
                                info={createPost.info}
                                edit={params.edit}
                            />
                        )}

                        <BorderVertical
                            type={params.type === 'check' ? 'top' : 'bottom'}
                            width="100%"
                        >
                            <Input
                                maxLength={280}
                                testID="test-create-post"
                                background="transparent"
                                value={text}
                                radius={0.01}
                                pad="0"
                                bottom={0}
                                multiline={true}
                                border={false}
                                placeholder={
                                    !user?.Categories?.length
                                        ? placeClient
                                        : params.type === 'check'
                                          ? checkIn
                                          : placeProvider
                                }
                                placeholderTextColor="#4e4e4e8f"
                                onSelectionChange={selectionChange}
                                onChangeText={changeText}
                                onFocus={onTextAreaFocus}
                                onBlur={onTextAreaBlur}
                                // Ios multline + selection error  https://github.com/facebook/react-native/issues/30298
                                // selection={{start: selection,end: selection}}
                                shadow={false}
                                ref={inputRef}
                                top={10}
                            />
                        </BorderVertical>
                        <Small>{createPost?.Text?.length || 0}/280</Small>
                    </View>
                    {createPost.Videos.length > 0 ? (
                        <View style={{ height: 400, paddingHorizontal: 20 }}>
                            <VideoPlayer
                                uri={createPost.Videos[0].uri}
                                duration={createPost.Videos[0].duration}
                                removeVideo={
                                    !params.edit
                                        ? () => {
                                              removeVideo(
                                                  0,
                                                  dispatchCtx,
                                                  createPost
                                              );
                                          }
                                        : null
                                }
                            />
                        </View>
                    ) : (
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={{ marginTop: 30, width }}
                            contentContainerStyle={{
                                width:
                                    createPost?.Images.length > 1
                                        ? null
                                        : '100%',
                                justifyContent: 'center'
                            }}
                        >
                            {createPost?.Images?.map((data, i) => (
                                <Container
                                    key={i}
                                    marg="0 20px"
                                    height="320px"
                                    position="relative"
                                    onPress={() => {
                                        setImageIndex(i);
                                        setIsModalImagesOpen(true);
                                    }}
                                >
                                    {!params.edit && (
                                        <Float
                                            top={'10px'}
                                            right={'10px'}
                                            bg="rgba(52, 52, 52, 0.8)"
                                            radius={999}
                                            pad="0px"
                                        >
                                            <Press
                                                onPress={() => {
                                                    removeImage(
                                                        i,
                                                        dispatchCtx,
                                                        createPost
                                                    );
                                                }}
                                                pad="10px"
                                            >
                                                <Icon
                                                    name="close"
                                                    height={20}
                                                    width={20}
                                                />
                                            </Press>
                                        </Float>
                                    )}
                                    <Image
                                        source={{ uri: data.uri }}
                                        style={{
                                            borderRadius: 10,
                                            height: 300,
                                            width: 400,
                                            maxWidth:
                                                createPost?.Images.length > 1
                                                    ? data.height > data.width
                                                        ? 250
                                                        : 300
                                                    : data.height > data.width
                                                      ? 250
                                                      : width - 48,
                                            maxHeight:
                                                createPost?.Images.length > 1
                                                    ? data.height > data.width
                                                        ? 250
                                                        : 200
                                                    : 300
                                        }}
                                        resizeMode="cover"
                                    />
                                </Container>
                            ))}
                        </ScrollView>
                    )}
                </ScrollView>
            )}
            <FullImagesCarousel
                images={
                    createPost?.Images &&
                    createPost?.Images.map((img) => img.uri)
                }
                onPressClose={() => {
                    setIsModalImagesOpen(false);
                    setImageIndex(0);
                }}
                isVisible={isModalImagesOpen}
                openIndex={imageIndex}
            />
        </KeyboardAvoidingView>
    );
};

export default CreatePostBody;
