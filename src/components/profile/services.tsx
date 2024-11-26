import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container as Line,
    Name,
    Text,
    Edit,
    BorderVertical,
    Press
} from '@styles/index';

import { checkConnect } from '@utils/index';
import { parseCurrency } from '@utils/currency';
import { Icon } from '@styles/icon';

const Services = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({ info, profile, user }));

    const isEdit = profile._id === user?._id;

    if (!isEdit && !profile?.Services?.length) return null;
    if (profile.Categories.length < 1) return <></>;

    return (
        <Line marg="20px 0 0 0">
            <Line
                marg="0 0 6px 0"
                width="100%"
                justify="space-between"
                dir="row"
            >
                <Name size={16} family="Circularstd-Medium">
                    Serviços
                </Name>
                {!!isEdit && (
                    <>
                        {profile.Services.length ? (
                            <Edit
                                testID="editServices"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () =>
                                        navigation.navigate('EditProfile', {
                                            type: 'services'
                                        })
                                )}
                            />
                        ) : (
                            <Press
                                testID="editServices"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () =>
                                        navigation.navigate('EditProfile', {
                                            type: 'services'
                                        })
                                )}
                            >
                                <Text size={15} family="Circularstd-Medium">
                                    Adicionar
                                </Text>
                            </Press>
                        )}
                    </>
                )}
            </Line>

            <Line>
                {profile.Services.map((s, i) => (
                    <Line
                        marg="10px 0 10px 0"
                        dir="row"
                        justify="space-between"
                        align="center"
                        key={i}
                        width="90%"
                        pad="0px 10px"
                    >
                        <Icon
                            name="checkProfile"
                            color={'black'}
                            width={24}
                            height={24}
                        />
                        <Text
                            width="80%"
                            marg="0 13px"
                            size={14}
                            family="Circularstd-Medium"
                        >
                            {s.Name}
                        </Text>
                        <Text size={14} family="Circularstd-Medium">
                            R$ {parseCurrency(s.Price.toFixed(2))}
                        </Text>
                    </Line>
                ))}
            </Line>
            <BorderVertical width="100%" type="bottom" />
        </Line>
    );
};

export default Services;
