import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, Container, Avatar, Small, BorderVertical } from '@styles/index';

import { markProposalAsRead } from '@context/actions/help';
import { parseCurrency } from '@utils/currency';
import { IProposal } from '@ts/interfaces/help';

type HelpMessageProps = {
    name: string;
    price: number;
    category: string;
    photo?: string;
    proposal: IProposal;
    acceptedProvider: string;
    HelpID: string;
    status: string;
    unreads: number;
};

const PropousalHelp = ({
    name,
    price,
    category,
    photo,
    proposal,
    HelpID,
    status
}: HelpMessageProps) => {
    const navigation = useNavigation();
    const handleNavigateToProposal = async () => {
        if (status === 'sent') {
            markProposalAsRead(proposal._id, HelpID);
        }

        navigation.navigate('Proposal', {
            helpID: proposal.HelpID,
            from: 'ReceivedProposal',
            proposalID: proposal._id
        });
    };

    return (
        <BorderVertical type="bottom">
            <Container
                onPress={handleNavigateToProposal}
                dir="row"
                width="100%"
                marg="12px 0 16px 0"
            >
                <Container marg="8px 0 0 0">
                    <Avatar photo={photo} />
                </Container>

                <Container marg="10px 0 0 10px" width="100%">
                    <Container
                        width="85%"
                        justify="space-between"
                        dir="row"
                        wrap="wrap"
                    >
                        <Text line={16} size={15} family="CircularStd-Medium">
                            {name}
                        </Text>
                        <Text line={16} size={15} family="CircularStd-Medium">
                            R$ {parseCurrency(price.toFixed(2))}
                        </Text>
                    </Container>
                    <Container
                        marg="2px 0 6px 0"
                        width="85%"
                        dir="row"
                        justify="space-between"
                    >
                        <Text size={14} line={14} marg="-2px 0 0 0">
                            {category}
                        </Text>
                        {status === 'sent' && (
                            <Container
                                radius={8}
                                align="center"
                                width="16px"
                                height="16px"
                                color="#FF6F5C"
                            >
                                <Small color="#fff" marg="-2px 0 0 0">
                                    1
                                </Small>
                            </Container>
                        )}
                    </Container>
                    {(status === 'rejected' || status === 'accepted') && (
                        <Text
                            size={14}
                            line={15}
                            color={
                                status === 'accepted' ? '#0EA581' : '#FA1616'
                            }
                        >
                            {status === 'accepted'
                                ? '[Aprovado]'
                                : '[Recusado]'}
                        </Text>
                    )}
                </Container>
            </Container>
        </BorderVertical>
    );
};

export default PropousalHelp;
