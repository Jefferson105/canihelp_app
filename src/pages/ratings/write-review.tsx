import React, { useReducer, useEffect, useState, useRef } from 'react';
import {
    Alert,
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import Rating from '@components/my-rating';
import reviewSkeleton from '@components/notification/review-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import useRequest from '@hooks/request';

import {
    NavHeader,
    Input,
    Container as Line,
    Button,
    Title,
    Text,
    Divider
} from '@styles/index';

import { useSelector } from '@context/index';
import { createRating } from '@context/actions/ratings';
import { checkConnect } from '@utils/index';
import writeReviewReducer, {
    SET_AGI,
    SET_CORD,
    SET_DESC,
    SET_PRICE,
    SET_PROF,
    SET_PUNC,
    SET_QUAL
} from '@context/reducers/local/write-review';

type RatingOptions = {
    label: string;
    onRating: (type, rate: number) => void;
    type;
    value: number;
};

type RouteProps = {
    params: {
        ProfileID: string;
        RatingID?: string;
        helpID: string;
    };
};

const WriteReview = () => {
    const navigation = useNavigation();
    const scroll = useRef<ScrollView>(null);
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const [sending, setSending] = useState(false);

    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({
        info,
        user
    }));

    const {
        data: {
            list: [profile]
        },
        loading: loadingData
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

    const [rating, dispatch] = useReducer(writeReviewReducer, {
        Description: '',
        Agility: 0,
        Cordiality: 0,
        Price: 0,
        Professionalism: 0,
        Quality: 0,
        Punctuality: 0,
        isProReview: true
    });

    const final =
        (rating.Agility +
            rating.Cordiality +
            rating.Price +
            rating.Professionalism +
            rating.Quality +
            rating.Punctuality) /
        6;

    const sendRating = async () => {
        try {
            setSending(true);

            if (Object.values(rating).every((val) => !!val)) {
                await createRating({
                    ...rating,
                    Total: final,
                    EvaluatedID: profile?._id,
                    Help: params.helpID
                });

                navigation.navigate('Notifications');
            } else {
                Alert.alert('Preencha todos os campos');
            }
        } catch (err) {
            console.log('@write-review, sendRating, err = ', err);
        } finally {
            setSending(false);
        }
    };

    const changeRating = (type, rate: number) => {
        dispatch({ type: type, data: rate });
    };

    const ratingArray: RatingOptions[] = [
        {
            label: 'Profissionalismo',
            onRating: changeRating,
            type: SET_PROF,
            value: rating.Professionalism
        },
        {
            label: 'Qualidade',
            onRating: changeRating,
            type: SET_QUAL,
            value: rating.Quality
        },
        {
            label: 'Agilidade',
            onRating: changeRating,
            type: SET_AGI,
            value: rating.Agility
        },
        {
            label: 'Pontualidade',
            onRating: changeRating,
            type: SET_PUNC,
            value: rating.Punctuality
        },
        {
            label: 'Cordialidade',
            onRating: changeRating,
            type: SET_CORD,
            value: rating.Cordiality
        },
        {
            label: 'Preço',
            onRating: changeRating,
            type: SET_PRICE,
            value: rating.Price
        }
    ];

    const scrollToBottom = () => {
        scroll.current?.scrollToEnd({
            animated: true
        });
    };

    useEffect(() => {
        (async () => {
            if (params.ProfileID === user._id) {
                Alert.alert('Você não pode se auto avaliar');
                navigation.goBack();
                return;
            }

            SplashScreen.hide();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.ProfileID, user?._id]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    useEffect(() => {
        if (singleRating) {
            dispatch({ type: SET_AGI, data: singleRating?.Agility });
            dispatch({ type: SET_CORD, data: singleRating?.Cordiality });
            dispatch({ type: SET_DESC, data: singleRating?.Description });
            dispatch({ type: SET_PRICE, data: singleRating?.Price });
            dispatch({ type: SET_PROF, data: singleRating?.Professionalism });
            dispatch({ type: SET_PUNC, data: singleRating?.Punctuality });
            dispatch({ type: SET_QUAL, data: singleRating?.Quality });
        }
    }, [singleRating]);

    if (loadingRating || loadingData)
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <NavHeader justify="center" />
                <ScrollView>
                    <Skeleton layout={reviewSkeleton} />
                </ScrollView>
            </SafeAreaView>
        );

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FAFAFA' }}>
            <KeyboardAvoidingView
                style={{
                    flex: 1
                }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                contentContainerStyle={{ flex: 1 }}
            >
                <ScrollView
                    testID="scrollView"
                    ref={scroll}
                    keyboardShouldPersistTaps="handled"
                >
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={{ flex: 1, backgroundColor: '#fafafa' }}>
                            <NavHeader
                                backHandler={() => {
                                    Alert.alert(
                                        '',
                                        'Tem certeza que deseja sair sem avaliar o profissional?',
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

                            <View style={{ marginBottom: 30, flex: 1 }}>
                                <View
                                    style={{
                                        marginHorizontal: 20,
                                        marginTop: 20
                                    }}
                                >
                                    <Title align="left">
                                        Avaliar Profissional
                                    </Title>

                                    <Text marg="10px 0px" color="#4E4E4E">
                                        Avalie o profissional e deixe que outros
                                        usuários da comunidade saibam como foi
                                        sua experiência ao fazer negócios com
                                        ele.
                                    </Text>

                                    <Divider top={5} bottom={10} />
                                </View>

                                <Line
                                    justify="center"
                                    dir="column"
                                    marg="0 20px"
                                >
                                    {ratingArray.map((rating, index) => (
                                        <Rating
                                            isPro={true}
                                            key={index}
                                            onRating={(rate) =>
                                                rating.onRating(
                                                    rating.type,
                                                    rate
                                                )
                                            }
                                            label={rating.label}
                                            value={Number(
                                                rating?.value?.toFixed(1)
                                            )}
                                            readOnly={sending}
                                        />
                                    ))}
                                    <Line
                                        width="100%"
                                        dir="row"
                                        align="center"
                                        justify="space-between"
                                    >
                                        <Text
                                            size={20}
                                            weight="500"
                                            marg="15px 0"
                                        >
                                            Avaliação Final
                                        </Text>
                                        <Text
                                            size={20}
                                            weight="500"
                                            marg="15px 0"
                                        >
                                            {final.toFixed(2)}
                                        </Text>
                                    </Line>
                                </Line>

                                <View style={{ marginHorizontal: 20 }}>
                                    <Input
                                        maxLength={1000}
                                        testID="test-description"
                                        onFocus={scrollToBottom}
                                        label="Descrição Completa"
                                        onChangeText={(text: string) =>
                                            dispatch({
                                                type: SET_DESC,
                                                data: text
                                            })
                                        }
                                        multiline={true}
                                        height={153}
                                        top={20}
                                        placeholder="Insira sua descrição..."
                                        radius={5}
                                        pad="15px"
                                        placeholderTextColor="#4e4e4e"
                                        value={rating.Description}
                                        editable={!sending}
                                    />

                                    <Button
                                        top={20}
                                        bottom={10}
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
                        </View>
                    </TouchableWithoutFeedback>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default WriteReview;
