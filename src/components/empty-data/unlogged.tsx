import React, { ReactElement } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Button, Container, Text } from '@styles/index';

type UnloggedProps = {
    title: string;
    icon?: ReactElement;
};

const Unlogged = ({ icon, title }: UnloggedProps) => {
    const navigation = useNavigation();

    return (
        <Container width="100%" justify="center" pad="20% 0" align="center">
            <Container justify="center" align="center">
                {icon && icon}
                <Text
                    line={32}
                    weight="600"
                    align="center"
                    size={20}
                    marg="30px 0 15px 0px"
                    width={'269px'}
                >
                    Entre ou{' '}
                    <Text
                        line={32}
                        weight="600"
                        align="center"
                        size={20}
                        decoration="underline"
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        cadastre
                    </Text>
                    {title}
                </Text>
                <Button
                    width={111}
                    height={30}
                    size={13}
                    text={'Entrar'}
                    weight={'normal'}
                    onPress={() => navigation.navigate('Login')}
                />
            </Container>
        </Container>
    );
};

export default Unlogged;
