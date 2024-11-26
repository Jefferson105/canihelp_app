import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import MapView, { Circle } from 'react-native-maps';
import { Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';

import { useSelector } from '@context/index';

import {
    NavHeader,
    Button,
    Text,
    CheckBox,
    Container,
    Small,
    BorderVertical,
    Input,
    Float,
    SafeView
} from '@styles/index';
import { mainColor } from '@styles/colors';
import { Pin } from '@styles/icons';

import { checkConnect } from '@utils/index';
import { socialDispatch } from '@context/dispatches';
import { ILocationLatLng } from '@ts/interfaces/location';

const { width } = Dimensions.get('window');

interface FiltersProps {
    backHandler: () => void;
    onSubmit: (
        distance: any,
        latitude: any,
        longitude: any,
        onlineSearch: any,
        reviewSearch: any,
        changed: any
    ) => void;
    distance?: number;
    location?: ILocationLatLng;
    professional?: boolean;
    online?: boolean;
    review?: boolean;
    item?: string;
    maxDistance?: number;
}

const Filters = ({
    backHandler,
    onSubmit,
    distance: distProps,
    professional,
    location,
    online: onlineP,
    review: reviewP,
    maxDistance = 120
}: FiltersProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected },
        social
    } = useSelector(({ info, social }) => ({ info, social }));

    const [distance, updateDistance] = useState(distProps || 50);
    const [lat, updateLat] = useState(location?.latitude);
    const [lng, updateLng] = useState(location?.longitude);
    const [latDelta, updateLatDelta] = useState(1.0225);
    const [lngDelta, updateLngDelta] = useState(1.0225);
    const [online, setOnline] = useState(!!onlineP);
    const [review, setReview] = useState(!!reviewP);
    const [changed, setChanged] = useState(false);

    let mapView = null;

    useEffect(() => {
        if (social.category) setChanged(true);
    }, [social.category]);

    return (
        <SafeView>
            <NavHeader
                justify="center"
                title={professional ? 'Filtro' : 'Filtro Feed'}
                backHandler={backHandler}
            />
            <Container pad="20px">
                <BorderVertical type="bottom">
                    {!!professional && (
                        <>
                            <Container
                                pad="20px 0 0 0"
                                width="100%"
                                justify="space-between"
                                dir="row"
                                align="center"
                            >
                                <Text size={15}>
                                    Apenas profissionais online
                                </Text>
                                <CheckBox
                                    index={0}
                                    checked={online}
                                    onChange={() => setOnline(!online)}
                                />
                            </Container>

                            <Container
                                width="100%"
                                pad="20px 0 10px 0"
                                justify="space-between"
                                dir="row"
                                align="center"
                            >
                                <Text size={15}>
                                    Apenas profissionais com avaliação
                                </Text>
                                <CheckBox
                                    index={1}
                                    checked={review}
                                    onChange={() => setReview(!review)}
                                />
                            </Container>
                        </>
                    )}
                    {!professional && (
                        <>
                            <Text family="Circularstd-Medium">
                                Filtrar Categoria
                            </Text>
                            <Container
                                dir="row"
                                width="100%"
                                align="center"
                                justify="center"
                                onPress={checkConnect.bind(
                                    {},
                                    isConnected,
                                    () => {
                                        setChanged(true);
                                        navigation.navigate('Categories', {
                                            next: 'Social'
                                        });
                                    }
                                )}
                            >
                                <Float
                                    width="91%"
                                    height="65%"
                                    top="0"
                                    left="0"
                                />
                                <Input
                                    testID="test-categorie-filter"
                                    placeholder={
                                        social?.category?.Name
                                            ? social?.category?.Name
                                            : 'Selecione uma categoria'
                                    }
                                    placeholderTextColor="#4e4e4e8f"
                                    pad="0 42px"
                                    left={true}
                                    rigth={true}
                                    top={4}
                                    onClear={() => {
                                        if (social.category) setChanged(true);
                                        socialDispatch({ category: null });
                                    }}
                                />
                            </Container>
                        </>
                    )}
                </BorderVertical>

                <Container
                    pad="10px 0 0px 0"
                    align="center"
                    width="100%"
                    dir="row"
                    justify="space-between"
                >
                    <Text size={15}>Distância máxima</Text>
                    <Container align="center" dir="row">
                        <Pin />
                        <Small>{distance} km</Small>
                    </Container>
                </Container>

                <Slider
                    style={{
                        width,
                        marginLeft: -20,
                        height: 50
                    }}
                    value={distance}
                    minimumValue={1}
                    maximumValue={maxDistance}
                    minimumTrackTintColor={mainColor}
                    thumbTintColor={mainColor}
                    step={1}
                    onValueChange={(value) => updateDistance(value)}
                />

                <MapView
                    // provider="google"
                    initialRegion={{
                        latitude: Number(location?.latitude),
                        longitude: Number(location?.longitude),
                        latitudeDelta: latDelta,
                        longitudeDelta: lngDelta
                    }}
                    ref={(ref) => (mapView = ref)}
                    style={{
                        height: 200,
                        width: '100%',

                        marginTop: 0,
                        marginBottom: 15
                    }}
                    onMapReady={() => {
                        mapView.animateToRegion(
                            {
                                latitude: lat,
                                longitude: lng,
                                latitudeDelta: latDelta,
                                longitudeDelta: lngDelta
                            },
                            1000
                        );
                    }}
                    onRegionChangeComplete={(region) => {
                        updateLat(String(region.latitude));
                        updateLng(String(region.longitude));
                        updateLatDelta(region.latitudeDelta);
                        updateLngDelta(region.longitudeDelta);
                    }}
                >
                    <Circle
                        fillColor="rgba(255, 111, 92, 0.5)"
                        strokeColor="#F05C27"
                        radius={distance * 1000}
                        center={{
                            latitude: Number(lat),
                            longitude: Number(lng)
                        }}
                    />
                </MapView>
                <Container width="100%" marg={professional ? '0' : '5% 0'}>
                    <Button
                        text="Filtrar"
                        onPress={checkConnect.bind({}, isConnected, () => {
                            onSubmit(
                                distance,
                                lat,
                                lng,
                                online,
                                review,
                                changed
                            );
                        })}
                    />
                </Container>
            </Container>
        </SafeView>
    );
};

export default Filters;
