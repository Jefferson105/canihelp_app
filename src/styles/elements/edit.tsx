import React from 'react';

import { Container } from '@styles/index';
import { Icon } from '@styles/icon';

interface EditProps {
    onPress: () => void;
    marg?: string;
    testID?: string;
}

const Edit = ({ onPress, marg, testID = '' }: EditProps) => {
    return (
        <Container
            testID={testID}
            dir="row"
            align="center"
            onPress={onPress}
            marg={marg}
            width={null}
        >
            <Icon name="edit" width={20} height={20} />
        </Container>
    );
};

export default Edit;
