import React, { useEffect } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import {
    SafeView,
    Image,
    Close,
    Pagination,
    Title,
    Text,
    Container,
    Button
} from '@styles/index';

import { infoDispatch } from '@context/dispatches';

interface WelcomeProps {
    image?: { height?: number; width?: number; marg?: string; source?: any };
    pIndex: number;
    titleFirst?: string;
    titleSecond?: string;
    txt?: string;
    nav: 'SecondStep' | 'ThirdStep' | 'Home';
}

const Welcome = ({
    image,
    pIndex,
    titleFirst,
    titleSecond,
    txt,
    nav
}: WelcomeProps) => {
    const navigation = useNavigation();

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <SafeView>
            <Container align="center">
                <Container
                    align="flex-end"
                    width="100%"
                    pad="24px 24px 15px 0px"
                >
                    <Close
                        height={48}
                        width={48}
                        radius={48}
                        navigation={() => {
                            navigation.navigate('Home');
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                })
                            );
                            infoDispatch({ firstAccess: false });
                        }}
                    />
                </Container>
                <Image
                    height={image.height}
                    width={image.width}
                    marg={image.marg}
                    source={image.source}
                />
                <Pagination bottom="0px" ammount={3} selectedIndex={pIndex} />
            </Container>
            <Container
                pad="10px 24px 25px 24px"
                align="center"
                flex={1}
                justify="space-evenly"
            >
                <Container align="center">
                    <Title color="#323232" family="Axiforma-SemiBold" size={24}>
                        {titleFirst}
                    </Title>
                    <Title color="#FF6F5C" family="Axiforma-SemiBold" size={24}>
                        {titleSecond}
                    </Title>
                </Container>

                <Text marg="15px 0px" align="center">
                    {txt}
                </Text>
                <Button
                    testID="next-button"
                    text="Avançar"
                    onPress={() => {
                        navigation.navigate(nav);
                        if (nav === 'Home') {
                            infoDispatch({ firstAccess: false });
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: 'Home' }]
                                })
                            );
                        }
                    }}
                />
            </Container>
        </SafeView>
    );
};

export default Welcome;
