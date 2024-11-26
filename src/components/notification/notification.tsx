import React from 'react';

import {
    Container,
    Avatar,
    Name,
    Small,
    Circle,
    BorderVertical
} from '@styles/index';
interface NotificationProps {
    photo: string;
    userName: string;
    notificationText: string;
    timeFromCreation: string;
    onPressNotification: () => void;
    showUnread?: boolean;
    testID: string;
}

const Notification = ({
    userName,
    notificationText,
    timeFromCreation,
    photo,
    showUnread,
    onPressNotification,
    testID
}: NotificationProps) => {
    return (
        <BorderVertical type="bottom" marg="0 24px" pad="15px 0">
            <Container
                testID={testID}
                onPress={onPressNotification}
                dir="row"
                align="center"
            >
                <Avatar
                    photo={
                        photo || require('../../assets/logo/logo-singUp.png')
                    }
                />
                <Container marg="0 0 0 15px" flex={1}>
                    <Name
                        family="Circularstd-Medium"
                        size={14}
                        color={'#323232'}
                    >
                        <Name
                            family="Circularstd-Medium"
                            size={14}
                            color={'#323232'}
                        >
                            {userName}
                        </Name>
                        {userName && ' '}
                        {notificationText}
                    </Name>
                    <Small>{timeFromCreation}</Small>
                </Container>
                {!!showUnread && (
                    <Container marg="0 0 0 auto" width={null}>
                        <Circle width={12} height={12} />
                    </Container>
                )}
            </Container>
        </BorderVertical>
    );
};

export default Notification;
