import React, { useState, useCallback } from 'react';
import { Alert, Modal } from 'react-native';

import MediaPicker from '@components/media-picker/media-picker';

import { useSelector } from '@context/index';

import { Container, Slider } from '@styles/index';
import { Icon } from '@styles/icon';

import { addPortfolio, removePortfolio } from '@context/actions/profile';
import { checkConnect } from '@utils/index';
import { IAsset } from '@services/media';

const Portfolio = ({ handleCamera }) => {
    const {
        info: { isConnected },
        profile: {
            list: [profile]
        },
        user
    } = useSelector(({ info, profile, user }) => ({
        info,
        profile,
        user
    }));

    const [modal, setModal] = useState(false);

    const handleModal = async () => {
        setModal(!modal);
    };

    const portfolio = profile.Portfolio;
    const isEdit = profile._id === user?._id;

    const onRemovePortfolio = React.useCallback(
        async (id: string) => {
            try {
                if (!isConnected) {
                    Alert.alert(
                        'Verifique sua conexão',
                        'Sinal de internet fraco ou sem conexão.'
                    );
                    return;
                }

                await removePortfolio(id);
            } catch (err) {
                Alert.alert(
                    'Ocorreu um erro ao remover a foto',
                    'Tente novamente.'
                );
                console.log('@portfolio, onRemovePortfolio, err = ', err);
            }
        },

        [isConnected]
    );

    const handleAction = useCallback(async (files: Array<IAsset>) => {
        await addPortfolio(files);
    }, []);

    const onCameraCaptureImg = (pic: { uri: string }) => {
        addPortfolio([
            {
                name: pic.uri.split('/cache/')[1],
                uri: pic.uri,
                type: 'image/jpeg'
            }
        ]);
    };

    if (!profile.Categories?.length) return <Container marg="20px 20px" />;

    return (
        <Container
            height={isEdit || portfolio.length ? '250px' : '70px'}
            justify="center"
            align="center"
            color={isEdit ? '#E8E8E8' : 'transparent'}
            onPress={
                isEdit &&
                !portfolio.length &&
                checkConnect.bind({}, isConnected, handleModal)
            }
        >
            <Modal
                visible={modal}
                onRequestClose={handleModal}
                animationType="slide"
                transparent={false}
            >
                <MediaPicker
                    maxImages={5 - portfolio.length}
                    setCamera={() => {
                        handleCamera(onCameraCaptureImg);
                        handleModal();
                    }}
                    action={handleAction}
                    close={handleModal}
                    maxVideos={0}
                    assetType={['image']}
                />
            </Modal>
            {!!portfolio.length && (
                <Slider
                    images={portfolio}
                    height={250}
                    onRemove={isEdit ? onRemovePortfolio : null}
                    onAdd={handleModal}
                    isEdit={isEdit}
                />
            )}
            {!!(isEdit && !portfolio?.length) && (
                <Icon name="addImage" height={56} width={56} />
            )}
        </Container>
    );
};

export default Portfolio;
