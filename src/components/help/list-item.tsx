import React, { useMemo, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HelpAvatar from '@components/help/help-avatar';
import { useSelector } from '@context/index';

import { Text, Container, Avatar, Small, BorderVertical } from '@styles/index';
import { Icon } from '@styles/icon';

import { handleUrgency } from '@utils/help';
import { markHelpProposalAsRead } from '@context/actions/help';
import { timeParse } from '@utils/index';

// TODO: remove any type
type HelpMessageProps = {
    name: string;
    date: string;
    label: string;
    category: string[];
    urgency: string;
    sent: boolean;
    location: string;
    photo?: string;
    proposal: any;
    creatorId: string;
    helpID: string;
    status: string;
    type: 'default' | 'proposal';
    recents: Array<any>;
    unreads: number;
    providerId: string;
    proposalId: Array<any>;
    readers: Array<any>;
    myProposal: Array<any>;
    testID: string;
    archived?: boolean;
};

const { width } = Dimensions.get('window');

const HelpMessage = ({
    date,
    category,
    label,
    urgency,
    location,
    sent,
    creatorId,
    helpID,
    proposal,
    status,
    type,
    recents,
    name,
    unreads,
    providerId,
    proposalId,
    readers,
    photo,
    myProposal,
    testID,
    archived
}: HelpMessageProps) => {
    const navigation = useNavigation();
    const { user, categories } = useSelector(({ user, categories }) => ({
        user,
        categories
    }));

    const isMe = useMemo(() => {
        if (proposal) {
            return proposal?.User?._id === user?._id;
        }

        return creatorId === user._id;
    }, [creatorId, proposal, user._id]);

    const isNew = useMemo(() => {
        return !readers?.includes(user._id);
    }, [readers, user._id]);

    const urgencyOptions = useMemo(() => {
        return handleUrgency(urgency);
    }, [urgency]);

    const { Recents, Proposal } = useMemo(() => {
        return {
            Recents: recents || [],
            Proposal: proposal?.User || []
        };
    }, [proposal, recents]);

    const hasNotification = useMemo(() => {
        if (isNew) {
            if (status === 'selected' || status === 'finish_pending' || !isMe) {
                return true;
            } else if (unreads > 0) return true;
        }
        return false;
    }, [isMe, isNew, status, unreads]);

    const helpName = useMemo(() => {
        if (proposal) {
            if (isMe) return name;
            return Proposal?.Name;
        }

        if (category?.length === 1) {
            const categoryInfo = categories.find((c) => c._id === category[0]);

            if (categoryInfo?.Name) return categoryInfo?.Name;
        }

        return label;
    }, [categories, label, category, proposal, isMe, Proposal, name]);

    const proposalSent = status === 'proposal_sent';
    const isFinished = status === 'selected' || status === 'finish_pending';

    const handleNavigation = useCallback(() => {
        if (archived) return;

        if (type === 'default') {
            // has a selected provider
            if (providerId) {
                navigation.navigate('Proposal', {
                    helpID: String(helpID),
                    proposalID: String(proposalId),
                    isNew: isNew
                });
                return;
            }

            // help sent
            if (isMe) {
                navigation.navigate('HelpFull', {
                    helpID: String(helpID)
                });
                return;
            }

            // help recived and proposal sent
            if (proposalSent) {
                navigation.navigate('Proposal', {
                    from: 'SentProposal',
                    helpID: String(helpID),
                    proposalID: myProposal,
                    status: 'sent'
                });
                return;
            }

            // help recived and proposal not sent
            navigation.navigate('Proposal', {
                helpID: String(helpID),
                from: 'Help',
                isNew: isNew
            });
            return;
        }

        if (type === 'proposal') {
            // proposal received
            if (proposal.Status === 'sent' && !isMe) {
                markHelpProposalAsRead(helpID);
            }

            navigation.navigate('Proposal', {
                helpID: String(helpID),
                status: 'received',
                from: 'ReceivedProposal',
                isNew: isNew
            });
            return;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMe, proposalSent, helpID, proposal]);

    return (
        <BorderVertical type="bottom">
            <Container
                testID={testID}
                onPress={() => handleNavigation()}
                dir="row"
                width="100%"
                pad="12px 0"
                color="#FAFAFA"
            >
                <Container marg="8px 0 0 4px">
                    {proposal ? (
                        <Avatar photo={isMe ? photo : proposal.User.Photo} />
                    ) : (
                        <HelpAvatar isMe={isMe} />
                    )}
                </Container>

                <Container marg="0 0 0 10px" width="100%">
                    <Container align="center" width="100%" dir="row">
                        <Container maxWidth={width - 160 + 'px'}>
                            <Text
                                ellipsizeMode="tail"
                                numberOfLines={1}
                                size={15}
                                family="CircularStd-Medium"
                            >
                                {helpName}
                            </Text>
                        </Container>
                        <Container marg="0px 54px 0 auto">
                            <Small size={12}>{timeParse(date)}</Small>
                        </Container>
                    </Container>
                    <Container width="100%" dir="row">
                        <Container marg="-6px 0 0 0" dir="row">
                            {proposal ? (
                                <Container dir="row">
                                    <Small color="#FF6F5C">[Orçamento]</Small>
                                    <Small size={13} marg="0 4px 0">
                                        {category}
                                    </Small>
                                </Container>
                            ) : (
                                <>
                                    <Small
                                        size={13}
                                        color={urgencyOptions.Color}
                                    >
                                        [{urgencyOptions.Text}]
                                    </Small>
                                </>
                            )}
                        </Container>
                        {hasNotification && (
                            <Container
                                radius={8}
                                align="center"
                                width="16px"
                                height="16px"
                                color="#FF6F5C"
                                marg="0px 60px 0 auto"
                            >
                                <Small color="#fff" marg="-2px 0 0 0">
                                    {!isMe || isFinished ? '' : unreads}
                                </Small>
                            </Container>
                        )}
                    </Container>
                    {type !== 'proposal' && (
                        <Container
                            marg={sent ? '10px 0 -8px 0' : '10px 0 -8px 0'}
                            align="center"
                            dir="row"
                            width="100%"
                        >
                            <Container
                                height="24px"
                                justify="center"
                                maxWidth={
                                    width - (isFinished ? 100 : 160) + 'px'
                                }
                            >
                                <Text
                                    line={14}
                                    numberOfLines={1}
                                    ellipsizeMode="tail"
                                    size={14}
                                >
                                    {location || proposal?.Location?.Address}
                                </Text>
                            </Container>
                            {!!Recents?.length && (
                                <Container marg="0 54px 0 auto" dir="row">
                                    <Container
                                        style={{
                                            transform: [
                                                {
                                                    rotateY: isMe
                                                        ? '190deg'
                                                        : '0deg'
                                                },
                                                { rotateZ: '0deg' }
                                            ]
                                        }}
                                    >
                                        <Icon name="helpArrow" />
                                    </Container>
                                    {isMe &&
                                        Recents.map((item) => (
                                            <Container
                                                marg="0 0 0 6px"
                                                key={item._id}
                                            >
                                                <Avatar
                                                    shadow={false}
                                                    size="small"
                                                    photo={item.Photo}
                                                />
                                            </Container>
                                        ))}
                                </Container>
                            )}
                        </Container>
                    )}
                </Container>
            </Container>
        </BorderVertical>
    );
};

export default HelpMessage;
