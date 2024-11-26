import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Press, Float, Shadow } from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';

const ProfileChat = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user,
        profile: {
            list: [profile]
        }
    } = useSelector(({ info, user, profile }) => ({ info, user, profile }));

    const isEdit = profile ? profile._id === user?._id : false;
    const chatUser = { ...profile, UpdatedAt: 'null' };

    if (isEdit) return null;

    return (
        <>
            {/*   <Float right="80px" bottom="20px" pad="0">
                <Shadow
                    radius={24}
                    width={48}
                    background={'#fff'}
                    shadow={{
                        color: '#00000080',
                        height: 4,
                        opacity: 0.5,
                        radius: 4.65,
                        elevation: 8
                    }}
                >

                    TODO:ADD PHONE FUNCTION
                    <Press
                        bg={'#ffff'}
                        height={50}
                        pad="8px 0 0px 0"
                        onPress={() => {
                            console.log('telefone');
                        }}
                    >
                        <Phone color="#000000" />
                    </Press>
                </Shadow>
            </Float> */}
            <Float right="20px" bottom="20px" pad="0">
                <Shadow
                    radius={24}
                    width={48}
                    background={'#fff'}
                    shadow={{
                        color: '#00000080',
                        height: 4,
                        opacity: 0.5,
                        radius: 4.65,
                        elevation: 8
                    }}
                >
                    <Press
                        testID="test-chat-icon"
                        bg={'#ffff'}
                        height={50}
                        onPress={checkConnect.bind({}, isConnected, () => {
                            if (!user)
                                return navigation.navigate('SignUp', {
                                    next: 'Profile'
                                });

                            navigation.navigate('Conversation', {
                                id: null,
                                isHelp: false,
                                archived: false,
                                user: chatUser
                            });
                        })}
                    >
                        <Icon name="chat" color="#000000" />
                    </Press>
                </Shadow>
            </Float>
        </>
    );
};

export default ProfileChat;
