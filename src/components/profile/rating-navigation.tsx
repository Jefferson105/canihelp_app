import React from 'react';

import { Text, BorderVertical } from '@styles/index';

interface RatingNavigationProps {
    active: string;
    type: string;
    set: (string) => void;
    text: string;
}

const RatingNavigation = ({
    active,
    type,
    set,
    text
}: RatingNavigationProps) => {
    return (
        <BorderVertical
            testID={`test-${type}`}
            onPress={() => {
                set(type);
            }}
            bdWidth="border-bottom-width:1px"
            marg="0 12px 0 0"
            type="bottom"
            bdColor={active === type ? '#FF7D2C' : 'transparent'}
            align="center"
        >
            <Text family="Axiforma-SemiBold" marg="4px">
                {text}
            </Text>
        </BorderVertical>
    );
};

export default RatingNavigation;
