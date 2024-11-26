import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { BackHandler, ScrollView } from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import HeaderHelp from '@components/help/header';
import BottomButtons from '@components/help/bottom-buttons';
import HelpInfo from '@components/help/help-info';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import { SafeView, Container, Text, Loading } from '@styles/index';

import { HelpStatusTypes } from '@utils/help';
import {
    HELP_SENT_SELECTED,
    HELP_SENT_PEDING,
    HELP_RECEIVED_SELECTED,
    HELP_RECEIVED_PEDING,
    HELP_RECEIVED_ANALYSIS,
    HELP_SENT_ANALYSIS,
    HELP_SENT,
    HELP_SENT_PROPOSAL_SENT,
    HELP_SENT_PROPOSAL_READ,
    HELP_RECEIVED_ACCEPTED,
    HELP_SENT_PROPOSAL,
    HELP_RECEIVED_REJECTED
} from '@constants/index';
import {
    acceptOrRejectHelp,
    acceptOrRejectIndividualHelp,
    moveHelpToDealDone,
    acceptOrRejectProposal,
    finishHelp,
    readHelp
} from '@context/actions/help';
import { boxConfirmDispatch } from '@context/dispatches';

type RouteProps = {
    params: {
        helpID: string;
        from: string;
        proposalID?: string;
        isNew?: boolean;
        goHelp?: boolean;
    };
};

const Proposal = () => {
    const { user } = useSelector(({ user }) => ({
        user
    }));

    const navigation = useNavigation();
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();

    const [opened, setOpened] = useState(false);
    const [loadingAct, setLoadingAct] = useState(false);

    const { helpID, from, proposalID, isNew = false, goHelp = false } = params;
    const isProposal = !!proposalID;

    const {
        data: {
            list: [help]
        },
        loading,
        fetching: helpLoading
    } = useRequest({
        name: helpID ? 'help' : null,
        params: {
            HelpID: String(helpID)
        },
        alias: 'singleHelp',
        cacheFirst: false
    });

    const {
        data: {
            list: [proposal]
        },
        fetching: proposalLoading
    } = useRequest({
        name: isProposal ? 'proposal' : null,
        params: {
            ProposalID: String(proposalID)
        }
    });

    const isMe = useMemo(() => {
        const creator = help?.Creator?._id || help?.Creator;

        return creator === user?._id;
    }, [help?.Creator, user?._id]);

    const isIndividual = help && !!help.Proposal;

    const boxAndButtonsStatus: HelpStatusTypes =
        useMemo((): HelpStatusTypes => {
            if (isIndividual && !help.Provider) {
                if (isMe && help?.Proposal?.Status === 'accepted')
                    return 'HelpSent-selected';
                if (isMe) return `HelpSent-proposal_${help?.Proposal?.Status}`;

                return `HelpIndividual-${help?.Proposal?.Status}`;
            }

            if (isMe) {
                if (proposal?.Status === 'rejected') return `HelpSent-rejected`;

                if (help?.ProviderStatus === 'sent') return `HelpSent-proposal`;

                return `HelpSent-${help?.ProviderStatus}`;
            }

            if (proposal?.Status === 'rejected')
                return `HelpSent-${proposal?.Status}`;

            return `HelpReceived-${help?.ProviderStatus}`;
        }, [help, isIndividual, isMe, proposal]);

    const fromInfo = useMemo(() => {
        switch (boxAndButtonsStatus) {
            case HELP_RECEIVED_ACCEPTED:
            case HELP_RECEIVED_ANALYSIS:
            case HELP_RECEIVED_REJECTED:
                return 'Help';

            default:
                if (isIndividual) isMe ? 'ReceivedProposal' : 'SentProposal';
                return isMe ? 'SentProposal' : 'ReceivedProposal';
        }
    }, [boxAndButtonsStatus, isIndividual, isMe]);

    const wasRead = useMemo(() => {
        if (!help) return true;
        if (!isNew) return true;
        if (opened) return true;

        return help?.Readers?.includes(user._id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [help?._id, isNew, opened]);

    const redirectToReview = useCallback(() => {
        navigation.navigate(isMe ? 'WriteReview' : 'WriteClientReview', {
            ProfileID: isMe ? proposal.User._id : help.Creator._id,
            helpID: String(help._id),
            RatingID: null
        });
    }, [help?.Creator?._id, help?._id, isMe, navigation, proposal?.User?._id]);

    const handleSelection = useCallback(
        async (action) => {
            switch (boxAndButtonsStatus) {
                // creator and provider must confirm if help was finished
                case HELP_SENT_SELECTED:
                case HELP_SENT_PEDING:
                case HELP_RECEIVED_SELECTED:
                case HELP_RECEIVED_PEDING:
                    if (action) {
                        setLoadingAct(true);
                        await finishHelp();

                        if (
                            boxAndButtonsStatus === HELP_SENT_PEDING ||
                            boxAndButtonsStatus === HELP_RECEIVED_PEDING
                        ) {
                            redirectToReview();
                        }

                        setLoadingAct(false);
                    }
                    break;

                // Provider must accept or reject help
                case HELP_RECEIVED_ANALYSIS:
                    setLoadingAct(true);
                    if (action) {
                        await acceptOrRejectHelp(true);
                    } else {
                        await acceptOrRejectHelp(false);
                    }
                    setLoadingAct(false);
                    break;
                case HELP_SENT_PROPOSAL_SENT:
                case HELP_SENT_PROPOSAL_READ:
                    // add sufix if is an individual proposal
                    setLoadingAct(true);
                    if (action) {
                        await acceptOrRejectIndividualHelp(true);
                        moveHelpToDealDone();
                    } else {
                        await acceptOrRejectIndividualHelp(false);
                    }
                    setLoadingAct(false);

                    break;

                case HELP_SENT:
                case HELP_SENT_ANALYSIS:
                case HELP_SENT_PROPOSAL:
                    setLoadingAct(true);
                    if (action) {
                        await acceptOrRejectProposal(true);
                        moveHelpToDealDone();
                    } else {
                        await acceptOrRejectProposal(false);
                    }

                    setLoadingAct(false);
                    break;
            }
        },

        [boxAndButtonsStatus, redirectToReview]
    );

    const isRecived = useMemo(() => {
        if (
            boxAndButtonsStatus === 'HelpReceived-under_analysis' ||
            boxAndButtonsStatus === 'HelpReceived-accepted'
        )
            return 'not-sent';

        if (
            boxAndButtonsStatus === 'HelpReceived-proposal_sent' ||
            boxAndButtonsStatus === HELP_RECEIVED_SELECTED ||
            boxAndButtonsStatus === HELP_RECEIVED_PEDING
        )
            return 'sent';

        return false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [proposal, help]);

    const handleButton = useCallback(() => {
        if (
            boxAndButtonsStatus === HELP_SENT_SELECTED ||
            boxAndButtonsStatus === HELP_SENT_PEDING ||
            boxAndButtonsStatus === HELP_RECEIVED_SELECTED ||
            boxAndButtonsStatus === HELP_RECEIVED_PEDING
        ) {
            boxConfirmDispatch({
                title: `Serviço foi realizado?`,
                confirm: async () => {
                    setLoadingAct(true);
                    await finishHelp();

                    if (
                        boxAndButtonsStatus === HELP_SENT_PEDING ||
                        boxAndButtonsStatus === HELP_RECEIVED_PEDING
                    )
                        redirectToReview();

                    setLoadingAct(false);
                }
            });
        } else {
            navigation.navigate('CreateProposal', {
                UserID: false,
                HelpID: helpID,
                Desc: help?.Description
            });
        }
    }, [boxAndButtonsStatus, help, helpID, navigation, redirectToReview]);

    useEffect(() => {
        if (wasRead || loading) return;

        setOpened(true);
        readHelp();
    }, [loading, wasRead]);

    useEffect(() => {
        if (!loading && !help) {
            navigation.goBack();
            return;
        }
    }, [help, loading, navigation]);

    useEffect(() => {
        const backAction = () => {
            if (from === 'SentProposal' && isNew) {
                navigation.navigate('Helps');
            } else if (from === 'Chat') {
                navigation.navigate('Conversation', {
                    id: null,
                    isHelp: false,
                    archived: false,
                    chatUser: help?.Creator
                });
            } else {
                navigation.goBack();
            }
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [from, help, isNew, navigation]);

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    if (helpLoading || proposalLoading) return <Loading />;

    if (!help && !proposal) {
        return (
            <Container width="100%">
                <Text>Help or Proposal not found</Text>
            </Container>
        );
    }

    return (
        <SafeView>
            <HeaderHelp
                chatUser={from === 'Chat' && help?.Creator}
                goHelp={goHelp}
                isRecived={isRecived}
                status={boxAndButtonsStatus}
            />
            <ScrollView>
                <Container flex={1} marg="0 20px 12px 20px">
                    <HelpInfo
                        from={fromInfo}
                        showClient={
                            boxAndButtonsStatus === HELP_RECEIVED_ANALYSIS ||
                            boxAndButtonsStatus === HELP_RECEIVED_REJECTED
                                ? false
                                : true
                        }
                        help={help}
                        myProposal={isProposal ? proposal : help.Proposal}
                        receivedProposal={isProposal ? proposal : help.Proposal}
                        full={true}
                        status={boxAndButtonsStatus}
                        isIndividual={isIndividual}
                    />
                </Container>
                <BottomButtons
                    loading={helpLoading || proposalLoading}
                    loadingAction={loadingAct}
                    status={boxAndButtonsStatus}
                    selection={handleSelection}
                    button={handleButton}
                    helpID={helpID}
                    ProposalID={proposalID}
                    isIndividual={isIndividual}
                    Desc={help?.Description}
                />
                {loadingAct && <Loading overlay={false} />}
            </ScrollView>
        </SafeView>
    );
};

export default Proposal;
