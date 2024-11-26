import React from 'react';

import { Text } from '@styles/index';

interface proposalLabelProps {
    title: string;
    content: string;
}

const ProposalLabel = ({ title, content }: proposalLabelProps) => {
    return (
        <>
            <Text
                marg="16px 0 0 0"
                family="CircularStd-Medium"
                size={15}
                line={15}
            >
                {title}
            </Text>
            <Text line={14} size={14} marg="8px 0 0 0">
                {content}
            </Text>
        </>
    );
};

export default ProposalLabel;
