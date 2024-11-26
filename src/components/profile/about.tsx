import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container,
    BorderVertical,
    Text,
    Edit,
    Small,
    Press
} from '@styles/index';

import { checkConnect } from '@utils/index';

const About = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user,
        profile: {
            list: [profile]
        }
    } = useSelector(({ info, user, profile }) => ({ info, user, profile }));

    const isEdit = profile._id === user?._id;

    return (
        <BorderVertical width="100%" type="bottom" marg="10px 0 0 0">
            <Container width="100%" justify="space-between" dir="row">
                <Text family="Circularstd-Medium">Descrição</Text>
                {!!isEdit && (
                    <>
                        {profile.Message ? (
                            <Edit
                                testID="editDesc"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () => navigation.navigate('EditProfile')
                                )}
                            />
                        ) : (
                            <Press
                                testID="editDesc"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () => navigation.navigate('EditProfile')
                                )}
                            >
                                <Text size={15} family="Circularstd-Medium">
                                    Adicionar
                                </Text>
                            </Press>
                        )}
                    </>
                )}
            </Container>
            <Small align="left" size={14} marg="6px 0 10px 0">
                {profile.Message ? profile.Message : 'Insira sua descrição'}
            </Small>
        </BorderVertical>
    );
};

export default About;
