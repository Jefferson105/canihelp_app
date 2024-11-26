import React from 'react';

import { Icon } from '@styles/icon';

import { Container, Text } from '@styles/index';

interface userBadgesProps {
    badge?: string;
    description?: string;
    title?: string;
}

const UserBadges = ({ badge, description, title }: userBadgesProps) => {
    return (
        <Container marg="10px 0 0 0">
            <Container align="center" dir="row">
                {badge === 'verified' && (
                    <Container marg="0 3px 0 0">
                        <Icon name="verified" height={24} width={24} />
                    </Container>
                )}
                {badge !== 'verified' && (
                    <Container marg="0 3px 0 0">
                        <Icon name="checkProfile" height={24} width={24} />
                    </Container>
                )}
                <Text size={15} family="Circularstd-Medium">
                    {title}
                </Text>
            </Container>
            <Text size={14}>{description}</Text>
        </Container>
    );
};

export default UserBadges;
