import React from 'react';
import { useNavigation } from '@react-navigation/native';

import { Text, Container } from '@styles/index';
import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon/';

interface ProposalMessageDTO {
    HelpID: object;
    isMe: boolean;
    Date: JSX.Element;
}

const ProposalMessage = ({ HelpID, isMe, Date }: ProposalMessageDTO) => {
    const navigation = useNavigation();

    const navigateToProposal = () => {
        navigation.navigate('Proposal', {
            from: isMe ? 'SentProposal' : 'ReceivedProposal',
            helpID: HelpID
        });
    };

    return (
        <Container align={isMe ? 'flex-end' : 'flex-start'} width="100%">
            <Container
                align="center"
                justify="space-between"
                dir="row"
                width="80%"
                color={isMe ? mainColor : '#fff'}
                border={`1px solid ${isMe ? mainColor : '#7a7a7a20'}`}
                pad="5px 10px"
                bBottomL={isMe ? '10px' : '0'}
                bBottomR={!isMe ? '10px' : '0'}
                bTopL="10px"
                bTopR="10px"
            >
                <Container
                    color="#fff"
                    radius={999}
                    pad="5px"
                    marg="0 10px 0 0"
                    border={`1px solid ${mainColor}`}
                >
                    <Icon
                        name="helpTab"
                        width={20}
                        height={20}
                        color={mainColor}
                    />
                </Container>

                <Container flex={1} onPress={() => navigateToProposal()}>
                    <Text
                        color={isMe ? '#fff' : '#4E4E4E'}
                        align="left"
                        size={13}
                    >
                        Orçamento personalizado
                    </Text>
                    <Text
                        color={isMe ? '#fff' : '#4E4E4E'}
                        size={13}
                        decoration="underline"
                        marg="-5px 0 0 0"
                    >
                        Visualizar
                    </Text>
                </Container>
                {Date}
            </Container>
        </Container>
    );
};

export default ProposalMessage;
