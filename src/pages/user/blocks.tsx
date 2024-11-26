import React, { useMemo, useCallback } from 'react';

import useRequest from '@hooks/request';
import Empty from '@components/empty-data/contacts';

import {
    NavHeader,
    SafeView,
    Container,
    List,
    ContatctDisplay,
    Loading
} from '@styles/index';

import { toggleBlock } from '@context/actions/blocks';

const ABlocks = () => {
    const {
        data: { list: blocks },
        loading,
        mutate
    } = useRequest({
        name: 'blockeds'
    });

    const blocksAction = {
        action: (item) => {
            toggleBlock(item._id);
            mutate(
                (blockeds) => blockeds.filter((b) => b._id !== item._id),
                false
            );
        },
        text: 'Desbloquear Contato'
    };

    const hasBlocks = useMemo(() => {
        return blocks?.length;
    }, [blocks]);

    const renderItem = useCallback(
        ({ item, index }) => {
            return (
                <ContatctDisplay
                    index={index}
                    item={item}
                    action={blocksAction}
                    block={true}
                />
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );

    const keyExtractor = useCallback((item) => {
        return item._id;
    }, []);

    return (
        <SafeView>
            <NavHeader justify="center" title="Contatos Bloqueados" />
            {loading ? (
                <Container width="100%" marg="50% 0">
                    <Loading overlay={false} />
                </Container>
            ) : (
                <Container pad="0px 24px 0 14px">
                    {!hasBlocks ? (
                        <Empty blocks={true} />
                    ) : (
                        <Container width="100%" marg="0px 0 0 0">
                            <List
                                style={{ width: '100%' }}
                                data={blocks}
                                keyExtractor={keyExtractor}
                                renderItem={renderItem}
                            />
                        </Container>
                    )}
                </Container>
            )}
        </SafeView>
    );
};

export default ABlocks;
