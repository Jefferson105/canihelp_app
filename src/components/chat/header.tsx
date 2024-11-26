import React, { useMemo, useState } from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import ModalChat from '@components/chat/modal-chat';
import { useSelector } from '@context/index';

import { Avatar, NavHeader, Container, Small, Text } from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect, userCategory } from '@utils/index';
import { IUser } from '@ts/interfaces/user';

interface HeaderConversationProps {
    user: IUser;
    id: string;
    isArchived: boolean;
}

type RouteProps = {
    params: {
        from: string;
    };
};

const HeaderConversation = ({
    user: defaultUser,
    id,
    isArchived = false
}: HeaderConversationProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [active, setActive] = useState(false);

    const onClose = () => {
        setActive(false);
    };
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { from } = params;

    const category = useMemo(() => {
        return userCategory(defaultUser);
    }, [defaultUser]);

    return (
        <NavHeader
            bg="#FAFAFA"
            pad="0 10px 0 0"
            backHandler={() => {
                if (from === 'help') navigation.navigate('Conversations');
                else navigation.goBack();
            }}
            right={
                <Container
                    dir="row"
                    align="center"
                    onPress={checkConnect.bind(
                        {},
                        isConnected,
                        () =>
                            defaultUser?._id !== 'deleted' &&
                            navigation.navigate('Profile', {
                                user: defaultUser?._id
                            })
                    )}
                >
                    <Avatar user={defaultUser._id} photo={defaultUser?.Photo} />

                    <Container
                        testID="test-goBack"
                        width="68%"
                        marg="-8px 0 0 5px"
                    >
                        <Container>
                            <Text
                                family="Circularstd-Medium"
                                size={15}
                                numberOfLines={1}
                            >
                                {defaultUser?.Name}
                            </Text>
                        </Container>
                        {defaultUser?._id !== 'deleted' && (
                            <>
                                {category ? (
                                    <Small line={14} top={0}>
                                        {category}
                                    </Small>
                                ) : (
                                    <Small line={14} top={0}>
                                        @{defaultUser?.UserName}
                                    </Small>
                                )}
                            </>
                        )}
                    </Container>
                    {!!id && (
                        <Container
                            dir="row"
                            marg="0 30px 0 auto"
                            onPress={() => {
                                setActive(true);
                            }}
                            testID="open-modal"
                            height="48px"
                            pad="0 15px"
                            align="center"
                        >
                            <Icon name="tripleDot" color="#323232" />
                        </Container>
                    )}

                    <ModalChat
                        active={active}
                        close={onClose}
                        defaultUser={defaultUser}
                        id={id}
                        isArchived={isArchived}
                    />
                </Container>
            }
        />
    );
};

export default HeaderConversation;
