import React from 'react';

import { useSelector } from '@context/index';

import { BorderVertical, Container, Text, Button } from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';
import { IAsset } from '@services/media';

interface PickerHeaderProps {
    Picks: IAsset[];
    action: any;
    close: any;
    handleModal: () => void;
    albumName?: string | null;
    albuns: string[];
}

const PickerHeader = ({
    Picks,
    action,
    close,
    handleModal,
    albumName,
    albuns
}: PickerHeaderProps) => {
    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const handleData = async () => {
        close();

        try {
            action(Picks);
        } catch (err) {
            console.log('@media-picker, media picker problem , err = ', err);
        }
    };

    return (
        <BorderVertical type="bottom">
            <Container width="100%" pad="16px 8px 12px 24px" dir="row">
                <Container dir="row" align="center" marg="0  8% 0 0%">
                    <Container
                        onPress={() => {
                            close();
                        }}
                    >
                        <Icon name="close" color="#000" />
                    </Container>
                    <Container
                        dir="row"
                        align="center"
                        onPress={() => {
                            handleModal();
                        }}
                        activeOpacity={albuns.length > 0 ? 0.2 : 1}
                    >
                        <Text
                            marg="0 0 0 16%"
                            family="Axiforma-SemiBold"
                            size={16}
                        >
                            {albumName ? albumName : 'Galeria'}
                        </Text>
                        {albuns.length > 0 && (
                            <Container marg="1px 0  0 6px">
                                <Icon name="down" width={16} height={16} />
                            </Container>
                        )}
                    </Container>
                </Container>
                <Container marg="0 0 0 auto">
                    <Button
                        top={-5}
                        onPress={checkConnect.bind({}, isConnected, handleData)}
                        type={Picks.length > 0 ? 'default' : 'disabled'}
                        text={`Escolher ${
                            Picks.length > 0 ? `(${Picks.length})` : ''
                        }`}
                        width={105}
                        height={36}
                        family="Axiforma-SemiBold"
                        size={13}
                        linearType="vertical"
                    />
                </Container>
            </Container>
        </BorderVertical>
    );
};

export default PickerHeader;
