import React, { memo, useMemo } from 'react';
import { SvgUri } from 'react-native-svg';

import { Text, Container } from '@styles/index';
import { Icon } from '@styles/icon';

interface SearchTextProps {
    name?: any;
    onPress?: () => void;
    location?: boolean;
    type?: string;
    fontStyle?: string;
    interval?: number[];
    styles?: {
        IconColor: string;
        Icon: string;
    };
}

const SearchText = ({
    name,
    onPress,
    type,
    fontStyle = null,
    interval,
    styles
}: SearchTextProps) => {
    const fillImmediate = useMemo(() => {
        if (type === 'search' || type === 'recent') return false;

        if (name === 'Carreto' || name === 'Fretes') return true;

        return false;
    }, [name, type]);

    if (type === 'location') {
        return (
            <Container onPress={onPress} pad="10px 0">
                <Text>{name}</Text>
            </Container>
        );
    }

    return (
        <Container
            onPress={onPress}
            align="center"
            dir="row"
            pad="12px 0"
            accessible={true}
            accessibilityLabel="Search text"
        >
            {type === 'search' && <Icon name="loupe" color="#000" />}
            {type === 'recent' && <Icon name="recent" width={15} height={15} />}
            {type === 'immediate' && (
                <SvgUri
                    stroke={fillImmediate ? styles.IconColor : 'transparent'}
                    fill={fillImmediate ? 'transparent' : styles.IconColor}
                    strokeWidth={1}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    uri={styles.Icon}
                    width={20}
                    height={20}
                />
            )}
            <Text
                pad="0 0 0 11px"
                size={18}
                marg={`0 0 0 ${type ? '5px' : '0'}`}
                fontStyle={fontStyle}
                // location={location}
            >
                {interval ? (
                    [0, 1, 2].map((v) => (
                        <Text
                            size={16}
                            key={v}
                            weight={v === 1 ? 'bold' : 'normal'}
                            fontStyle={fontStyle}
                        >
                            {v === 0 && name.slice(0, interval[0])}
                            {v === 1 && name.slice(interval[0], interval[1])}
                            {v === 2 && name.slice(interval[1], name.length)}
                        </Text>
                    ))
                ) : (
                    <Text size={16} fontStyle={fontStyle}>
                        {name}
                    </Text>
                )}
            </Text>
        </Container>
    );
};

export default memo(SearchText);
