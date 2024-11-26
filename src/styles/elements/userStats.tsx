import React from 'react';

import { Icon } from '@styles/icon';

import { Container, Text, SubTitle } from '@styles/index';

interface userStatsProps {
    text?: string;
    data?: number;
    icon?: string;
}

const UserStats = ({ text, data, icon }: userStatsProps) => {
    return (
        <Container justify="center" align="center" marg="15px 0 0 0">
            <Container align="center" dir="row">
                {icon === 'star' && (
                    <Container marg="0 3px 0 0">
                        <Icon
                            name="starOut"
                            height={14}
                            width={14}
                            color="black"
                        />
                    </Container>
                )}
                {icon === 'eye' && (
                    <Container marg="0 3px 0 0">
                        <Icon name="eyeSvg" height={9} width={12} />
                    </Container>
                )}
                {icon === 'followers' && (
                    <Container marg="0 8px 0px 0">
                        <Icon name="followers" />
                    </Container>
                )}
                <SubTitle>{data}</SubTitle>
            </Container>
            <Text size={12}>{text}</Text>
        </Container>
    );
};

export default UserStats;
