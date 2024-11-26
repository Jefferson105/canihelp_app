import React, { useEffect, useRef } from 'react';
import { ScrollView } from 'react-native';

import { Container, Float, Text } from '@styles/index';
import { mainColor } from '@styles/colors';

interface IProps {
    data: Array<string | number>;
    onScroll: (i: string | number) => void;
    index: number;
    width: string;
}

const Scroller = ({ data, index, onScroll, width }: IProps) => {
    const elem = useRef<ScrollView>(null);

    const onDateScroll = (e) => {
        const posY = e.nativeEvent.contentOffset.y;
        const rest = posY % 50;

        let finalPos = 0;

        if (rest > 25) {
            finalPos = posY - rest + 50;
        } else {
            finalPos = posY - rest;
        }

        onScroll(data[finalPos / 50 + 1]);

        elem.current.scrollTo({
            animated: true,
            y: finalPos
        });
    };

    useEffect(() => {
        elem.current.scrollTo({
            animated: false,
            y: index * 50
        });
    }, [index]);

    return (
        <Container width={width} align="center" justify="center">
            <Float
                top="0"
                left="0"
                width="100%"
                height="48px"
                pad="0"
                bg="rgba(255,255,255,.6)"
                style={{ borderBottomColor: mainColor, borderBottomWidth: 2 }}
            />
            <ScrollView
                onMomentumScrollEnd={onDateScroll}
                ref={elem}
                showsVerticalScrollIndicator={false}
            >
                {data.map((v, i) => (
                    <Container
                        key={i}
                        height="50px"
                        align="center"
                        justify="center"
                    >
                        <Text>{v}</Text>
                    </Container>
                ))}
            </ScrollView>
            <Float
                bottom="0"
                left="0"
                width="100%"
                height="48px"
                pad="0"
                bg="rgba(255,255,255,.6)"
                style={{ borderTopColor: mainColor, borderTopWidth: 2 }}
            />
        </Container>
    );
};

export default Scroller;
