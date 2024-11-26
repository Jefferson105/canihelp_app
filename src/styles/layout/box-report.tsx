import React, { useState } from 'react';

import { Container, Text, Button, Input, SubTitle } from '@styles/index';

import { boxReportDispatch } from '@context/dispatches';
import { Icon } from '@styles/icon';

interface BoxReportProps {
    sendReport: (denunciationDescription: string) => void;
    title: string;
    desc: string;
    getDesc: any;
    back: any;
}

export const BoxReport = ({
    title,
    sendReport,

    back
}: BoxReportProps) => {
    const [denunciationDescription, setDenunciationDescription] = useState<
        string | null
    >();

    return (
        <Container
            position="absolute"
            pad="20px"
            color="rgba(0,0,0,.2)"
            width="100%"
            height="100%"
            justify="center"
            align="center"
            onPress={() => {
                back();
                boxReportDispatch(null);
            }}
        >
            <Container
                justify="center"
                radius={10}
                align="center"
                width="100%"
                color="#fff"
            >
                <Container
                    justify="space-between"
                    width="100%"
                    pad="16px"
                    dir="row"
                    align="center"
                >
                    <Container pad="0  0 0 10%" align="center" width="90%">
                        <Text>{title}</Text>
                    </Container>
                    <Container
                        onPress={() => {
                            boxReportDispatch(null);
                        }}
                    >
                        <Icon name="close" />
                    </Container>
                </Container>

                <Container
                    justify="center"
                    marg="auto auto 0 auto"
                    align="flex-start"
                    width="100%"
                    color="#fff"
                    radius={10}
                    pad="10px 10px 25px"
                >
                    <SubTitle align="left">Descrição da denúncia</SubTitle>
                    <Input
                        radius={0}
                        placeholder="Insira sua descrição…"
                        placeholderTextColor="#4e4e4e8f"
                        value={denunciationDescription}
                        onChangeText={(txt) =>
                            setDenunciationDescription(String(txt))
                        }
                        maxHeight={153}
                        multiline={true}
                        top={10}
                    />

                    <Button
                        radius={10}
                        onPress={() => {
                            sendReport(denunciationDescription);
                            boxReportDispatch(null);
                        }}
                        text={'Enviar Denúncia'}
                        type={'default'}
                    />
                </Container>
            </Container>
        </Container>
    );
};
