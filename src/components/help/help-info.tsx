import React, { useState, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';

import Client from '@components/help/client-help';
import BottomButtons from '@components/help/bottom-buttons';
import ProposalLabel from '@components/help/proposal-label';

import { Text, Container } from '@styles/index';

import { handleUrgency, HelpStatusTypes } from '@utils/help';
import { getFormatedDate } from '@utils/date-time';
import { timeParse } from '@utils/index';
import { parseCurrency } from '@utils/currency';

type HelpMessageProps = {
    animated?: boolean;
    colapse?: () => void;
    help?: any;
    showClient?: boolean;
    receivedProposal?: any;
    myProposal?: any;
    from: string;
    full?: boolean;
    altStatus?: string;
    status?: HelpStatusTypes;
    isSent?: boolean;
    isIndividual?: boolean;
    onChangeHeight?: (h: number) => void;
};
const { width } = Dimensions.get('window');

const HelpInfo = ({
    animated = false,
    colapse,
    help,
    showClient = false,
    receivedProposal,
    myProposal,
    from,
    full = true,
    altStatus,
    status,
    isSent = false,
    isIndividual = false,
    onChangeHeight
}: HelpMessageProps) => {
    const getHelpInfo = () => ({
        service:
            help?.Label || help?.Category?.Name || 'Carregando informações',
        location: help?.ShortLocation,
        desc: help?.Description,
        urgency: handleUrgency(help?.Urgency),
        isClient: true,
        user: help?.Creator,
        origin: !showClient
            ? help?.Transport?.Origin.ShortLocation
            : help?.Transport?.Origin.Address,
        destiny: !showClient
            ? help?.Transport?.Destiny.ShortLocation
            : help?.Transport?.Destiny.Address
    });

    const getReceivedProposalInfo = () => ({
        service:
            receivedProposal?.User?.MainCategory?.Name ||
            receivedProposal?.Name,
        location: help?.ShortLocation,
        urgency: handleUrgency(receivedProposal?.Urgency || help?.Urgency),
        start: receivedProposal?.Start,
        finish: receivedProposal?.Finish,
        price: receivedProposal?.Price,
        hasAnswer: true,
        answer: receivedProposal?.Description,
        isClient: true,
        user: help?.Creator,
        origin: help?.Transport?.Origin.Address,
        destiny: help?.Transport?.Destiny.Address
    });

    const getSentProposalInfo = () => ({
        service: myProposal?.User?.MainCategory?.Label,
        location: myProposal?.Location?.Address,
        urgency: handleUrgency(help?.Urgency),
        start: myProposal?.Start,
        finish: myProposal?.Finish,
        price: myProposal?.Price,
        hasAnswer: true,
        answer: myProposal?.Description,
        isClient: false,
        user: receivedProposal?.User,
        origin: help?.Transport?.Origin.Address,
        destiny: help?.Transport?.Destiny.Address
    });

    const infoMapping = {
        Help: getHelpInfo,
        ReceivedProposal: getReceivedProposalInfo,
        SentProposal: getSentProposalInfo
    };

    const helpInfoOptions = useMemo(() => {
        const getInfo = infoMapping[from];
        return getInfo ? getInfo() : {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, help, myProposal, receivedProposal, altStatus, status]);

    //Control DropDown Animation
    const [rotate, setRotate] = useState(false);
    const colapsableContainer = React.useRef(new Animated.Value(0)).current;
    const rotateDown = React.useRef(new Animated.Value(0)).current;

    const animate = () => {
        // TODO: animate transform instead height
        Animated.timing(colapsableContainer, {
            toValue: rotate ? 0 : 100,
            duration: 400,
            useNativeDriver: false
        }).start();
        Animated.timing(rotateDown, {
            toValue: rotate ? 0 : 1,
            duration: 400,
            useNativeDriver: false
        }).start();
    };

    const fullSpace = useMemo(() => {
        // remove padleft/right
        const realWidth = width - 40;
        // calculate how many words fits in one line
        const space = Math.ceil(realWidth / 8);
        // calculate how many lines the description have
        const usedLines = helpInfoOptions?.desc?.length / space;
        // calculate how much space it will use
        const usedSpace = usedLines * 16;
        // calculate the original space + the description space
        if (help?.Group === 'transportation') return 336 + usedSpace;
        return 266 + usedSpace;

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [helpInfoOptions]);

    const handleContainer = colapsableContainer.interpolate({
        inputRange: [0, 100],
        outputRange: [50, fullSpace || 400]
    });

    return (
        <Container
            onLayout={(e) =>
                onChangeHeight && onChangeHeight(e.nativeEvent.layout.height)
            }
            width="100%"
        >
            <Animated.View
                style={{
                    height: animated ? handleContainer : '100%',
                    width: '100%',
                    overflow: 'hidden',
                    paddingTop: 12,
                    paddingBottom: 12
                }}
            >
                {showClient && (
                    <Client
                        isClient={helpInfoOptions?.isClient}
                        creator={helpInfoOptions?.user}
                    />
                )}
                <Container width="100%" dir="row">
                    <Container
                        flex={1}
                        marg={colapse ? '-14px 0 0 0' : '20px 0 0 0'}
                        dir="row"
                        justify="space-between"
                    >
                        <Container width="80%">
                            <Text
                                family="CircularStd-Medium"
                                size={15}
                                line={17}
                            >
                                {helpInfoOptions?.service}
                            </Text>
                        </Container>
                        <Text
                            size={14}
                            line={16}
                            marg={colapse ? '0 0 0 auto' : '0 4px 0 auto'}
                        >
                            {timeParse(help?.CreatedAt)}
                        </Text>
                    </Container>
                </Container>
                <Container
                    marg="4px 0 0 0"
                    align="center"
                    dir="row"
                    justify="space-between"
                >
                    <Text
                        size={14}
                        line={15}
                        color={helpInfoOptions?.urgency?.Color}
                    >
                        [{helpInfoOptions?.urgency?.Text}]
                    </Text>
                    <Container
                        onPress={() => {
                            animate();
                            setRotate(!rotate);
                        }}
                    >
                        {colapse && (
                            <Text
                                family="Circularstd-Bold"
                                size={15}
                                line={15}
                                decoration="underline"
                            >
                                Detalhes
                            </Text>
                        )}
                    </Container>
                </Container>

                {full && from !== 'SentProposal' && (
                    <>
                        {help?.Group === 'transportation' ? (
                            <Container dir="column" marg="16px 0 0 0">
                                <ProposalLabel
                                    title="Origem"
                                    content={helpInfoOptions.origin}
                                />
                                <ProposalLabel
                                    title="Destino"
                                    content={helpInfoOptions.destiny}
                                />
                            </Container>
                        ) : (
                            !!helpInfoOptions.location && (
                                <ProposalLabel
                                    title="Local"
                                    content={helpInfoOptions.location}
                                />
                            )
                        )}
                    </>
                )}
                {help?.Description && !isIndividual && (
                    <ProposalLabel
                        title="Descrição"
                        content={help?.Description}
                    />
                )}

                {helpInfoOptions.hasAnswer && (
                    <ProposalLabel
                        title={isIndividual ? 'Descrição' : 'Resposta'}
                        content={helpInfoOptions.answer}
                    />
                )}

                {full && from !== 'Help' && (
                    <Container width="50%">
                        <ProposalLabel
                            title="Entrega"
                            content={getFormatedDate(helpInfoOptions.finish)}
                        />
                        <ProposalLabel
                            title="Valor"
                            content={parseCurrency(
                                helpInfoOptions.price.toFixed(2)
                            )}
                        />
                    </Container>
                )}

                {isSent && (
                    <Container marg="34px 0 0 -20px">
                        <BottomButtons
                            helpID={String(help?._id)}
                            status={'cancel-help'}
                        />
                    </Container>
                )}
            </Animated.View>
        </Container>
    );
};

export default HelpInfo;
