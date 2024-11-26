import React from 'react';
import { iconRegistry } from '../icon/';

import { Container, Text } from '@styles/index';

interface emptyProfileStatsProps {
    text?: string;
    icon?: string;
}

const EmptyProfile: React.ForwardRefRenderFunction<
    emptyProfileStatsProps,
    any
> = ({ text, icon }) => {
    return (
        <Container
            color="#F2F2F2"
            justify="center"
            align="center"
            marg="15px 0 10px 0"
            width="100%"
            height="151px"
        >
            {icon === 'ratings' && (
                <iconRegistry.circleStar height={48} width={48} />
            )}
            {icon === 'posts' && (
                <iconRegistry.circlePosts height={48} width={48} />
            )}

            <Text size={16} pad="10px">
                {text}
            </Text>
        </Container>
    );
};

export default EmptyProfile;
