import React, { useReducer, useEffect, useState } from 'react';
import {
    Alert,
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Rating from '@components/my-rating';
import clientReviewSkeleton from '@components/notification/client-review-skeleton';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';
import Skeleton from '@components/skeleton/skeleton';

import { NavHeader, Input, Button, Divider, Title, Text } from '@styles/index';

import { createRating } from '@context/actions/ratings';
import { checkConnect } from '@utils/index';
import writeClientReviewReducer, {
    SET_DESC,
    SET_TOTAL
} from '@context/reducers/local/write-client-review';

type RouteProps = {
    params: {
        ProfileID: string;
        RatingID: string;
        helpID: string;
    };
};

const WriteClientReview = () => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const scroll = React.useRef<ScrollView>(null);

    const [sending, setSending] = useState(false);

    const {
        user,
        info: { isConnected }
    } = useSelector(({ info, user }) => ({
        info,
        user
    }));

    const {
        data: {
            list: [profile]
        },
        loading: loadingProfile
    } = useRequest({
        name: 'profile',
        params: {
            ProfileID: params.ProfileID,
            View: false
        }
    });

    const {
        data: {
            list: [singleRating]
        },
        loading: loadingRating
    } = useRequest({
        name: params.RatingID ? 'rating' : null,
        params: {
            RatingID: params.RatingID
        }
    });

    const [rating, dispatch] = useReducer(writeClientReviewReducer, {
        Description: '',
        Total: 0
    });

    const sendRating = async () => {
        try {
            setSending(true);
            if (Object.values(rating).every((val) => !!val)) {
                await createRating({
                    ...rating,
                    isProReview: false,
                    EvaluatedID: profile?._id,
                    Help: params.helpID
                });

                navigation.goBack();
            } else {
                Alert.alert('Preencha todos os dados corretamente');
            }
        } catch (err) {
            console.log('@write-client-review, sendRating, err = ', err);
        } finally {
            setSending(false);
        }
    };

    const onChangeRating = (grade) => {
        dispatch({ type: SET_TOTAL, data: grade });
    };

    const scrollToBottom = () => {
        scroll.current?.scrollToEnd({
            animated: true
        });
    };

    useEffect(() => {
        (async () => {
            if (params?.ProfileID === user?._id) {
                Alert.alert('Você não pode se auto avaliar');
                navigation.goBack();
                return;
            }

            SplashScreen.hide();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.ProfileID, user?._id]);

    useEffect(() => {
        if (singleRating) {
            dispatch({ type: SET_TOTAL, data: singleRating?.Total });
            dispatch({ type: SET_DESC, data: singleRating?.Description });
        }
    }, [singleRating]);

    if (loadingProfile || loadingRating)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <NavHeader justify="center" />
                <ScrollView>
                    <Skeleton layout={clientReviewSkeleton} />
                </ScrollView>
            </SafeAreaView>
        );

    return (
        <SafeAreaView
            style={{ flex: 1, height: '100%', backgroundColor: '#FAFAFA' }}
        >
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                contentContainerStyle={{ flex: 1 }}
            >
                <ScrollView
                    testID="scrollView"
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View>
                            <NavHeader
                                backHandler={() => {
                                    Alert.alert(
                                        '',
                                        'Tem certeza que deseja sair sem avaliar o cliente?',
                                        [
                                            {
                                                text: 'Cancelar',
                                                onPress: () => null,
                                                style: 'cancel'
                                            },
                                            {
                                                text: 'Sair',
                                                onPress: () =>
                                                    navigation.navigate(
                                                        'Notifications'
                                                    )
                                            }
                                        ]
                                    );
                                }}
                                title={profile?.Name}
                                justify="center"
                            />
                            <View style={{ padding: 20 }}>
                                <Title align="left">Avaliar Usuário</Title>

                                <Text marg="10px 0px" color="#4E4E4E">
                                    Avalie seu cliente e deixe que outros
                                    usuários da comunidade saibam como foi sua
                                    experiência ao fazer negócios com ele.
                                </Text>

                                <Divider top={5} bottom={10} />

                                <Rating
                                    value={rating.Total.toFixed(1)}
                                    onRating={(grade) => onChangeRating(grade)}
                                    label="Avaliar Usuário"
                                    readOnly={!!sending}
                                />

                                <Input
                                    maxLength={1000}
                                    testID="test-description"
                                    onFocus={scrollToBottom}
                                    label="Descrição Completa"
                                    value={rating.Description}
                                    onChangeText={(text: string) =>
                                        dispatch({
                                            type: SET_DESC,
                                            data: text
                                        })
                                    }
                                    multiline={true}
                                    height={153}
                                    top={10}
                                    placeholder="Insira sua descrição..."
                                    radius={5}
                                    pad="15px"
                                    placeholderTextColor="#4e4e4e"
                                    editable={!sending}
                                />

                                <Button
                                    text={
                                        sending
                                            ? 'Enviando...'
                                            : 'Enviar avaliação'
                                    }
                                    type={sending ? 'disabled' : 'default'}
                                    onPress={checkConnect.bind(
                                        {},
                                        isConnected,
                                        sendRating
                                    )}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default WriteClientReview;
