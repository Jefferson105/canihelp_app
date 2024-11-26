import React from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';

import { NavHeader, Text } from '@styles/index';
import { handleStatus } from '@utils/help';
import {
    HELP_INDIVIDUAL_READ,
    HELP_INDIVIDUAL_SENT,
    HELP_RECEIVED_ACCEPTED,
    HELP_RECEIVED_ANALYSIS,
    HELP_RECEIVED_REJECTED,
    HELP_SENT_PROPOSAL
} from '@constants/index';

interface HeaderConversationProps {
    goHelp: boolean;
    chatUser: any;
    isRecived?: boolean | string;
    status?: string;
}

const HeaderHelp = ({
    goHelp,
    chatUser = null,
    status
}: HeaderConversationProps) => {
    const navigation = useNavigation();

    const handleBack = () => {
        if (chatUser) {
            navigation.navigate('Conversation', {
                id: null,
                isHelp: false,
                archived: false,
                chatUser: chatUser
            });
        } else {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Helps' }]
                })
            );
            navigation.navigate('Helps');
        }
    };

    const isSentProposal =
        status === HELP_SENT_PROPOSAL ||
        status === HELP_INDIVIDUAL_READ ||
        status === HELP_INDIVIDUAL_SENT;

    const isRecivedProposal =
        status === 'HelpReceived-proposal_sent' ||
        status === HELP_RECEIVED_ACCEPTED ||
        status === HELP_RECEIVED_ANALYSIS ||
        status === HELP_RECEIVED_REJECTED;

    return (
        <>
            <NavHeader
                backHandler={(goHelp || chatUser) && handleBack}
                title={
                    isSentProposal || isRecivedProposal
                        ? 'Pedido de orçamento'
                        : 'Orçamento'
                }
                help={isSentProposal ? false : true}
                justify={isSentProposal ? 'center' : 'space-between'}
                right={
                    !isSentProposal && (
                        <Text size={15} color={handleStatus(status).Color}>
                            [{handleStatus(status).Text}]
                        </Text>
                    )
                }
            />
        </>
    );
};

export default HeaderHelp;
