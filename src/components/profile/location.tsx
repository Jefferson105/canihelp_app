import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container as Cont,
    BorderVertical,
    Edit,
    Description,
    Name
} from '@styles/index';

import { LocFixed, Cell } from '@styles/icons';

import { checkConnect } from '@utils/index';
import { completeAddress } from '@services/location';

const Location = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({ info, profile, user }));

    const isEdit = profile._id === user?._id;

    if (!profile.Address) return null;

    return (
        <BorderVertical width="100%" type="bottom" marg="15px 0 0 0">
            <Name size={16} family="Circularstd-Medium">
                Localizações
            </Name>
            <Cont dir="row" marg="16px 0 10px 0">
                <Cont width="90%">
                    {!!profile.Address && (
                        <Cont dir="row" align="center">
                            <LocFixed
                                width={24}
                                height={24}
                                color={'#5C7BFF'}
                            />
                            <Description
                                size="15px"
                                family="Circularstd-Book"
                                marg="0 0 0 10px"
                            >
                                {completeAddress(
                                    profile.Address,
                                    !profile?.Address?.Show
                                )}
                            </Description>
                        </Cont>
                    )}
                    {!!profile.AddressMobile && (
                        <Cont align="center" pad="19px 0 0px 0px " dir="row">
                            <Cell width={24} height={24} color={'#5C7BFF'} />
                            <Description
                                size="15px"
                                family="Circularstd-Book"
                                marg="0 0 0 10px"
                            >
                                {profile.AddressMobile}
                            </Description>
                        </Cont>
                    )}
                </Cont>
                {!!isEdit && (
                    <Cont marg={'0 0 0px auto '} height="100%">
                        <Edit
                            testID="testLoc"
                            onPress={checkConnect.bind({}, isConnected, () =>
                                navigation.navigate('SaveLocation', {
                                    edit: 1
                                })
                            )}
                        />
                    </Cont>
                )}
            </Cont>
        </BorderVertical>
    );
};

export default Location;
