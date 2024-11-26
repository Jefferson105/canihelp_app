import React, { useState, useCallback } from 'react';
import { RefreshControl, FlatList } from 'react-native';

import Item from '@components/help/list-item';
import helpSkeleton from '@components/help/help-skeleton';
import Skeleton from '@components/skeleton/skeleton';
import Empty from '@components/empty-data/help';
import { useSelector } from '@context/index';
import useArchive from '@hooks/archive-request';

import { SafeView, Container, NavHeader, Divider } from '@styles/index';

const Help = () => {
    const { user } = useSelector(({ user }) => ({
        user
    }));

    const [refreshing, setRefreshing] = useState(false);

    const {
        data: { list, pagination },
        addPage,
        fetching,
        loading,
        mutate
    } = useArchive({
        name: user ? 'helps' : null,
        path: '/archive/help',
        params: '&user=' + user._id,
        size: 20
    });

    const renderItem = useCallback(({ item, index }) => {
        return (
            <Item
                testID={`test-index-${index}`}
                unreads={0}
                status={item.ProviderStatus}
                name={item.Creator.Name}
                urgency={item.Urgency}
                location={
                    item.ShortLocation ||
                    item.DisplayLocation ||
                    item.Transport?.Origin?.ShortLocation ||
                    item.Transport?.Origin?.Address
                }
                date={item.CreatedAt}
                category={
                    item.Category?.Name || item.CategoryID?.Name || item?.Label
                }
                sent={item.Type}
                photo={item?.Creator?.Photo}
                creatorId={item?.Creator?._id || item?.Creator}
                helpID={item._id}
                proposal={item.Proposal}
                type={item.Type}
                recents={[]}
                providerId={item.Provider}
                proposalId={item.ProposalSelected}
                readers={item.Readers}
                myProposal={item.MyProposal}
                archived={true}
            />
        );
    }, []);

    const keyExtractor = useCallback((item) => {
        return String(item._id);
    }, []);

    const onEndReached = async () => {
        if (pagination && pagination.next && !fetching) {
            addPage();
        }
    };

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);

            await mutate();
        } finally {
            setRefreshing(false);
        }
    }, [mutate]);

    if (!list.length && loading)
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
                pad=" 6px 20px 0 20px"
            >
                <NavHeader
                    pad="0px"
                    title="Orçamentos arquivados"
                    back={true}
                    bg="#FAFAFA"
                />
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
                    data={list}
                    renderItem={renderItem}
                    ListEmptyComponent={<Empty archived={true} />}
                    keyExtractor={keyExtractor}
                    onEndReached={onEndReached}
                    onEndReachedThreshold={0.1}
                />
            </Container>
        </SafeView>
    );
};

export default Help;
