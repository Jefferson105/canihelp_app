import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { RefreshControl } from 'react-native';

import Empty from '@components/empty-data/contacts';
import { useSelector } from '@context/index';
import BigList from 'react-native-big-list';
import useRequest from '@hooks/request';

import {
    NavHeader,
    SafeView,
    RadioGroup,
    Container,
    ContatctDisplay,
    Loading
} from '@styles/index';
import { mainColor } from '@styles/colors';

import { numberFormatter } from '@utils/index';
import { mutateApi } from '@services/mutate-api';
import { boxConfirmDispatch } from '@context/dispatches';

const ContactsModal = () => {
    const isFocused = useIsFocused();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [refreshing, setRefreshing] = useState(false);
    const [toShow, setToShow] = useState('contacts');

    const {
        data: contacts,
        mutate,
        loading,
        addPage: addContacts,
        fetching: fetchingCont
    } = useRequest({
        name: isFocused ? 'contacts' : null
    });

    const {
        data: following,
        mutate: fwingmutate,
        loading: fwingloading,
        addPage: addFollowing,
        fetching: fetchingFwing
    } = useRequest({
        name: isFocused ? 'following' : null
    });

    const {
        data: followers,
        loading: fwerloading,
        mutate: fwermutate,
        addPage: addFollowers,
        fetching: fetchingFwer
    } = useRequest({
        name: isFocused ? 'followers' : null
    });

    const contactsAction = {
        action: (item) => {
            boxConfirmDispatch({
                title: `Deseja remover este contato?`,
                confirm: () => {
                    mutateApi({
                        name: 'contactsToggle',
                        params: { ContactID: item._id }
                    });

                    mutate(
                        (contacts) =>
                            contacts.filter((c) => c._id !== item._id),
                        false
                    );
                }
            });
        },
        text: 'Remover Contato'
    };

    const followingAction = {
        action: (item) => {
            boxConfirmDispatch({
                title: `Deseja Deixar de seguir este contato?`,
                confirm: () => {
                    mutateApi({
                        name: 'profileFollow',
                        params: { FollowID: item._id }
                    });

                    fwingmutate(
                        (following) =>
                            following.filter((f) => f._id !== item._id),
                        false
                    );
                }
            });
        },
        text: 'Deixar de seguir'
    };

    const isLoading = useMemo(
        () => loading || fwingloading || fwerloading,
        [fwerloading, fwingloading, loading]
    );

    const dataList = useMemo(() => {
        switch (toShow) {
            case 'following':
                return following?.list || [];
            case 'followers':
                return followers?.list || [];
            default:
                return contacts?.list || [];
        }
    }, [followers, following, contacts, toShow]);

    const radioData = useMemo(() => {
        return [
            {
                label: 'Todos',
                total: `(${numberFormatter(contacts?.pagination?.total || 0)})`,
                onPress: () => setToShow('contacts')
            },
            {
                label: 'Seguindo',
                total: `(${numberFormatter(
                    following?.pagination?.total || 0
                )})`,
                onPress: () => setToShow('following')
            },
            {
                label: 'Seguidores',
                total: `(${numberFormatter(
                    followers?.pagination?.total || 0
                )})`,
                onPress: () => setToShow('followers')
            }
        ];
    }, [contacts, following, followers]);

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);

            switch (toShow) {
                case 'contacts':
                    await mutate();
                    break;
                case 'following':
                    await fwingmutate();
                    break;
                case 'followers':
                    await fwermutate();
                    break;
            }

            setRefreshing(false);
        } catch (err) {
            console.log('@messages, onRefresh, err = ', err);
        }
    }, [fwermutate, fwingmutate, mutate, toShow]);

    const loadMore = useCallback(() => {
        if (!isConnected) return;

        if (toShow === 'contacts') {
            if (contacts.pagination?.next && !loading && !fetchingCont)
                addContacts();
        } else if (toShow === 'following') {
            if (following.pagination?.next && !fwingloading && !fetchingFwing)
                addFollowing();
        } else {
            if (followers.pagination?.next && !fwerloading && !fetchingFwer)
                addFollowers();
        }
    }, [
        addContacts,
        addFollowers,
        addFollowing,
        contacts,
        fetchingCont,
        fetchingFwer,
        fetchingFwing,
        followers,
        following,
        fwerloading,
        fwingloading,
        isConnected,
        loading,
        toShow
    ]);

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <ContatctDisplay
                    item={item}
                    action={
                        toShow === 'contacts'
                            ? contactsAction
                            : toShow === 'following'
                              ? followingAction
                              : null
                    }
                    index={index}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [contacts, mutate, toShow]
    );

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    useEffect(() => {
        if (fwingloading && loading && fwerloading && isFocused) return;
        mutate();
        fwingmutate();
        fwermutate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
        <SafeView>
            <NavHeader justify="center" title="Contatos" />
            <Container align="center" pad="20px" flex={1}>
                <RadioGroup data={radioData} />
                <BigList
                    itemHeight={80}
                    getItemLayout={(_, index) => ({
                        length: 80,
                        offset: 80 * index,
                        index
                    })}
                    style={{ width: '100%' }}
                    data={dataList}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    refreshControl={
                        <RefreshControl
                            colors={[mainColor]}
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    renderEmpty={() =>
                        !isLoading ? <Empty showing={toShow} /> : <></>
                    }
                    renderFooter={() =>
                        isLoading ? (
                            <Container>
                                <Loading overlay={false} />
                            </Container>
                        ) : (
                            <></>
                        )
                    }
                    renderHeader={null}
                    contentContainerStyle={{
                        paddingBottom: 20
                    }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMore}
                />
            </Container>
        </SafeView>
    );
};

export default ContactsModal;
