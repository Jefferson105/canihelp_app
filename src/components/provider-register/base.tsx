import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { NavHeader, Container, SafeView, Close } from '@styles/index';

type RouteProps = {
    params: {
        edit: boolean;
    };
};

const ProRegisterBase = ({ children, percent }) => {
    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    return (
        <SafeView style={{ flex: 1 }}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <Container color="#E3E3E3">
                    <Container
                        width={percent + '%'}
                        height="7px"
                        color="#FF6F5C"
                    />
                </Container>
                <NavHeader
                    bg="#FAFAFA"
                    right={
                        !params?.edit && (
                            <Container marg="8px 48px 8px auto">
                                <Close
                                    height={40}
                                    width={40}
                                    radius={40}
                                    navigation={() => {
                                        params?.edit
                                            ? navigation.navigate(
                                                  'SaveCategories'
                                              )
                                            : navigation.navigate('Home');
                                    }}
                                />
                            </Container>
                        )
                    }
                />
                <Container pad="0 20px">{children}</Container>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default ProRegisterBase;
