import React, { useState, useCallback } from 'react';
import { RefreshControl, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Item from '@components/help/list-item';
import helpSkeleton from '@components/help/help-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import Empty from '@components/empty-data/help';
import { useSelector } from '@context/index';
import useRequest from '@hooks/request';

import {
    SafeView,
    Container,
    BorderVertical,
    Small,
    NavHeader,
    Divider,
    Press
} from '@styles/index';
import Unlogged from '@components/empty-data/unlogged';
import { Icon } from '@styles/icon';

const Help = () => {
    const navigation = useNavigation();

    const {
        hasUnreadProposals: {
            list: [proposalsUnread],
            mutate: mutateUnreadProposals
        },
        hasUnreadFinished: {
            list: [finishedUnreads],
            mutate: mutateUnreadFinished
        },
        hasUnreadHelps: {
            list: [helpsUnread],
            mutate: mutateUnreadHelps
        },
        user
    } = useSelector(
        ({
            hasUnreadProposals = { list: [] },
            hasUnreadHelps = { list: [] },
            hasUnreadFinished = { list: [] },
            user
        }) => ({
            hasUnreadProposals,
            hasUnreadHelps,
            hasUnreadFinished,
            user
        })
    );

    const [isTabOfOpenHelps, setIsTabOfOpenHelps] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const {
        data: { list: listOpenHelps, pagination: openHelpsPagination },
        addPage: addOpenHelpPage,
        fetching: isOpenHelpsFetching,
        loading: isOpenHelpsLoading,
        mutate: openMutate
    } = useRequest({
        name: user ? 'helps' : null,
        params: {},
        size: 20
    });

    const {
        data: {
            list: listInProgressHelps,
            pagination: progressHelpsPagination
        },
        addPage: addProgressHelpPage,
        fetching: isProgressHelpsFetching,
        loading: isProgressHelpsLoading,
        mutate: progressMutate
    } = useRequest({
        name: user ? 'helpsProgress' : null,
        params: {},
        size: 20
    });

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <Item
                    testID={`test-index-${index}`}
                    unreads={isTabOfOpenHelps ? item.UnreadProposals : 0}
                    status={item.ProviderStatus}
                    name={item?.Creator?.Name}
                    urgency={item.Urgency}
                    location={
                        item.ShortLocation ||
                        item.DisplayLocation ||
                        item.Transport?.Origin?.ShortLocation ||
                        item.Transport?.Origin?.Address
                    }
                    date={item.CreatedAt}
                    label={item?.Label}
                    category={item.Category || []}
                    sent={item.Type}
                    photo={item?.Creator?.Photo}
                    creatorId={item.Creator._id}
                    helpID={item._id}
                    proposal={item.Proposal}
                    type={item.Type}
                    recents={isTabOfOpenHelps ? item.Recents : []}
                    providerId={item.Provider}
                    proposalId={item.ProposalSelected}
                    readers={item.Readers}
                    myProposal={item.MyProposal}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [isTabOfOpenHelps, listInProgressHelps, listOpenHelps]
    );

    const keyExtractor = useCallback((item) => {
        return String(item._id);
    }, []);

    const onEndReached = async () => {
        if (isTabOfOpenHelps) {
            if (
                openHelpsPagination &&
                openHelpsPagination.next &&
                !isOpenHelpsLoading
            ) {
                addOpenHelpPage();
                return;
            }

            return;
        }

        if (
            progressHelpsPagination &&
            progressHelpsPagination.next &&
            !isProgressHelpsLoading
        ) {
            addProgressHelpPage();
            return;
        }

        return;
    };
    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);

            Promise.all([progressMutate(), openMutate()]);

            if (!isTabOfOpenHelps) {
                Promise.all([mutateUnreadProposals(), mutateUnreadHelps()]);
            } else {
                Promise.all([mutateUnreadFinished()]);
            }
        } finally {
            setRefreshing(false);
        }
    }, [
        isTabOfOpenHelps,
        mutateUnreadFinished,
        mutateUnreadHelps,
        mutateUnreadProposals,
        openMutate,
        progressMutate
    ]);

    if (!user) {
        return (
            <SafeView>
                <Container flex={1} align="center">
                    <BorderVertical marg="6px 24px 0 24px" type="bottom">
                        <NavHeader
                            pad="0px"
                            big={true}
                            title={'Painel de negócios'}
                            back={false}
                            bg="#FAFAFA"
                        />
                    </BorderVertical>
                    <Container flex={1} justify="center">
                        <Unlogged
                            title=" para visualizar o seu
                            painel de negócios
                            "
                        />
                    </Container>
                </Container>
            </SafeView>
        );
    }

    if (!listOpenHelps.length && (isOpenHelpsLoading || isOpenHelpsFetching))
        return (
            <SafeView>
                <Skeleton layout={helpSkeleton} />
            </SafeView>
        );

    return (
        <SafeView>
            <Container
                flex={1}
                width="100%"
                color="#FAFAFA"
                pad="6px 20px 0 20px"
            >
                <NavHeader
                    pad="0px"
                    big={true}
                    title="Painel de negócios"
                    back={false}
                    bg="#FAFAFA"
                    right={
                        user && (
                            <Press
                                onPress={() =>
                                    navigation.navigate('HelpArchive')
                                }
                            >
                                <Icon name="archiveds" />
                            </Press>
                        )
                    }
                />

                <Container marg="-26px 0 0 0" pad="0 0 -2px 0" dir="row">
                    <BorderVertical
                        onPress={() => {
                            setIsTabOfOpenHelps(true);
                        }}
                        bdWidth="border-bottom-width:1px"
                        type="bottom"
                        bdColor={isTabOfOpenHelps ? '#FF6F5C' : 'transparent'}
                        pad="25px 8px 0 0"
                    >
                        <Container align="center" marg="0 0 4px 0px" dir="row">
                            <Small weight="bold" size={14}>
                                {' '}
                                Em aberto
                            </Small>
                            {proposalsUnread > 0 ||
                                (helpsUnread > 0 && (
                                    <Container
                                        marg="0 0 0 8px"
                                        radius={10}
                                        align="center"
                                        width="18px"
                                        height="18px"
                                        color="#FF6F5C"
                                    >
                                        <Small
                                            size={12}
                                            color="#fff"
                                            marg="-2px 0 0 0"
                                        >
                                            {proposalsUnread + helpsUnread}
                                        </Small>
                                    </Container>
                                ))}
                        </Container>
                    </BorderVertical>

                    <BorderVertical
                        bdWidth="border-bottom-width:1px"
                        type="bottom"
                        bdColor={!isTabOfOpenHelps ? '#FF6F5C' : 'transparent'}
                        pad="25px 0 0 8px"
                        onPress={() => {
                            setIsTabOfOpenHelps(false);
                        }}
                    >
                        <Container
                            testID="test-closed-help"
                            align="center"
                            pad=" 0  0 4px 0px"
                            dir="row"
                        >
                            <Small weight="bold" size={14}>
                                {' '}
                                Propostas aceitas
                            </Small>
                            {finishedUnreads > 0 && (
                                <Container
                                    marg="0 0 0 8px"
                                    radius={10}
                                    align="center"
                                    width="18px"
                                    height="18px"
                                    color="#FF6F5C"
                                >
                                    <Small
                                        size={12}
                                        color="#fff"
                                        marg="-2px 0 0 0"
                                    >
                                        {finishedUnreads}
                                    </Small>
                                </Container>
                            )}
                        </Container>
                    </BorderVertical>
                </Container>
                <Divider />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: '100%',
                        flexGrow: 1
                    }}
                    refreshControl={
                        <RefreshControl
                            colors={['#FF6F5C']}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={
                        isTabOfOpenHelps
                            ? listOpenHelps.sort(
                                  (a, b) => b.LastDate - a.LastDate
                              )
                            : listInProgressHelps.sort(
                                  (a, b) => b.LastDate - a.LastDate
                              )
                    }
                    renderItem={renderItem}
                    ListEmptyComponent={
                        (!isOpenHelpsLoading ||
                            !isProgressHelpsLoading ||
                            !isProgressHelpsFetching) && (
                            <Empty isOpen={isTabOfOpenHelps} />
                        )
                    }
                    keyExtractor={keyExtractor}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        </SafeView>
    );
};

export default Help;
