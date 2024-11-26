import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container,
    Avatar,
    Small,
    Text,
    BorderVertical,
    Press
} from '@styles/index';
import { userCategory, checkConnect } from '@utils/index';

import ModalActions from '@components/contacts-blocks/modal-contats';
import { Icon } from '@styles/icon';

interface ContatctDisplayProps {
    index?: number;
    item: any;
    action: any;
    block?: boolean;
}
const ContatctDisplay = ({
    index,
    item,
    action,
    block = false
}: ContatctDisplayProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [modal, setModal] = useState(false);

    const onCloseModal = () => {
        setModal(false);
    };

    return (
        <BorderVertical width="100%" type="bottom">
            <Container
                marg="15px 0 15px 7px"
                align="center"
                dir="row"
                width="100%"
                testID={`Display${index}`}
            >
                <Container
                    width={!action ? '100%' : '90%'}
                    dir="row"
                    align="center"
                    opacity={block ? '0.4' : '1'}
                >
                    <Press
                        testID={`contactDisplayProfile${index}`}
                        onPress={() =>
                            item?._id !== 'deleted' &&
                            navigation.navigate('Profile', {
                                user: item?._id
                            })
                        }
                    >
                        <Avatar photo={item.Photo} />

                        <Container marg="0 0 0 7px">
                            <Text
                                color="#323232"
                                family="Circularstd-Medium"
                                size={15}
                            >
                                {item.Name}
                            </Text>
                            {item?._id !== 'deleted' && (
                                <>
                                    {userCategory(item) ? (
                                        <Small>{userCategory(item)}</Small>
                                    ) : (
                                        <Small>{item.UserName}</Small>
                                    )}
                                </>
                            )}
                        </Container>
                    </Press>
                    <Container
                        pad="0 10px 0 0"
                        marg="0 0 0 auto"
                        align=" center"
                        dir="row"
                    >
                        <Press
                            testID={`contactDisplayConversation${index}`}
                            onPress={checkConnect.bind({}, isConnected, () => {
                                navigation.navigate('Conversation', {
                                    isHelp: false,
                                    archived: false,
                                    user: item
                                });
                            })}
                            aling=" center"
                        >
                            <Icon name="chat" color="#000000" />
                        </Press>
                    </Container>
                </Container>

                {!!action && (
                    <>
                        <Press
                            testID={`contactDisplayDot${index}`}
                            aling=" center"
                            onPress={() => {
                                setModal(true);
                            }}
                        >
                            <Icon name="tripleDot" color="#000000" />
                        </Press>
                        <ModalActions
                            active={modal}
                            action={action}
                            close={onCloseModal}
                            item={item}
                        />
                    </>
                )}
            </Container>
        </BorderVertical>
    );
};

export default ContatctDisplay;
