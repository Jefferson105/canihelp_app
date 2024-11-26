import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RefreshControl } from 'react-native';
import BigList from 'react-native-big-list';
import SplashScreen from 'react-native-splash-screen';

import HelpInfo from '@components/help/help-info';
import EmptyProposals from '@components/help/empty-proposals';
import useRequest from '@hooks/request';
import ProposalHelp from '@components/help/proposal-help';

import { useSelector } from '@context/index';

import { NavHeader, SafeView, Loading, Text } from '@styles/index';

import { handleStatus as statusStyle } from '@utils/help';
import { mainColor } from '@styles/colors';

type RouteProps = {
    params: {
        helpID: string;
        goHelp: boolean;
    };
};

const HelpSend = () => {
    const { params } = useRoute<RouteProp<RouteProps, 'params'>>();
    const { helpID } = params;

    const navigation = useNavigation();

    const [collapse, setcollapse] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [headerHeight, setHeaderHeight] = useState(20);

    const { helps, helpsProgress, singleHelp } = useSelector(
        ({ helps, helpsProgress, singleHelp }) => ({
            helps,
            helpsProgress,
            singleHelp
        })
    );

    const {
        data: { list: proposals },
        mutate,
        loading
    } = useRequest({
        name: 'proposals',
        alias: 'proposals' + String(helpID),
        params: {
            HelpID: String(helpID)
        },
        size: 20
    });

    const {
        data: {
            list: [help]
        }
    } = useRequest({
        name: 'help',
        params: {
            HelpID: String(helpID)
        },
        cacheFirst: Array.isArray(singleHelp?.list)
            ? String(singleHelp.list[0]?._id) === String(helpID)
            : false,
        alias: 'singleHelp'
    });

    const onRefresh = useCallback(async () => {
        try {
            setRefreshing(true);
            await mutate();
            setRefreshing(false);
        } catch (err) {
            console.log('@messages, onRefresh, err = ', err);
        }
    }, [mutate]);

    const helpInfo = useMemo(() => {
        if (help) return help;
        if (!helps) return null;

        return [...helps.list, ...helpsProgress.list].find(
            (item) => String(item._id) === String(helpID)
        );
    }, [help, helpID, helps, helpsProgress]);

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <ProposalHelp
                    acceptedProvider={help?.Provider}
                    HelpID={helpID}
                    proposal={item}
                    key={index}
                    name={item.User.Name}
                    price={item.Price}
                    category={item.User.MainCategory?.Label}
                    photo={item.User.Photo}
                    status={item.Status}
                    unreads={help?.UnreadProposals}
                />
            );
        },
        [help, helpID]
    );

    const keyExtractor = useCallback((item) => {
        return String(item._id);
    }, []);

    const handleBack = () => {
        navigation.navigate('Helps');
    };

    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <SafeView style={{ flex: 1 }}>
            <NavHeader
                backHandler={handleBack}
                justify="center"
                title="Pedido de orçamento"
                help={true}
                right={
                    <Text
                        size={15}
                        marg="0 16px 0 0"
                        color={
                            statusStyle(`HelpSent-${helpInfo?.ProviderStatus}`)
                                .Color
                        }
                    >
                        [
                        {
                            statusStyle(`HelpSent-${helpInfo?.ProviderStatus}`)
                                .Text
                        }
                        ]
                    </Text>
                }
            />

            <BigList
                style={{
                    marginTop: 30,
                    marginLeft: 20,
                    marginRight: 20,
                    paddingBottom: 50
                }}
                data={proposals}
                renderItem={renderItem}
                itemHeight={80}
                headerHeight={headerHeight}
                footerHeight={100}
                keyExtractor={keyExtractor}
                refreshControl={
                    <RefreshControl
                        colors={[mainColor]}
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                renderHeader={() => (
                    <HelpInfo
                        help={helpInfo}
                        from="Help"
                        animated={true}
                        colapse={() => {
                            setcollapse(!collapse);
                        }}
                        isSent={true}
                        onChangeHeight={(h) => setHeaderHeight(h)}
                    />
                )}
                renderEmpty={() => (loading ? <></> : <EmptyProposals />)}
                renderFooter={() =>
                    loading ? <Loading overlay={false} /> : <></>
                }
            />
        </SafeView>
    );
};

export default HelpSend;
