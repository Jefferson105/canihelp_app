import { Platform, PermissionsAndroid } from 'react-native';
import Location from 'react-native-geolocation-service';
import { captureException } from '@sentry/react-native';

import { dispatch } from '@context/index';

export const coordsDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
) => {
    const rad = function (x: number) {
        return x * (Math.PI / 180);
    };
    const R = 6378.137;
    const dLat = rad(lat2 - lat1);
    const dLong = rad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(lat1)) *
            Math.cos(rad(lat2)) *
            Math.sin(dLong / 2) *
            Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return Number(d.toFixed(2));
};

export const isValidCoord = (lat, lon) => {
    lat = parseInt(lat, 10);
    lon = parseInt(lon, 10);

    if (!lat || !lon) return false;

    if (lat > 90 || lat < -90 || lon > 180 || lon < -180) return false;

    return true;
};

export const getLocation = () => {
    return new Promise<{
        latitude: number;
        longitude: number;
    }>(async (resolve, reject) => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.check(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );

                if (!granted) {
                    const status = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Canihelp',
                            message:
                                'Para oferecer uma melhor experiência o app precisa da sua localização.',
                            buttonPositive: 'OK',
                            buttonNegative: 'Cancelar'
                        }
                    );

                    if (status !== PermissionsAndroid.RESULTS.GRANTED)
                        throw 'Unauthorized';
                }
            } else {
                const status = await Location.requestAuthorization('whenInUse');

                if (status !== 'granted') throw 'Unauthorized';
            }

            dispatch((state) => {
                return {
                    location: {
                        ...state.location,
                        granted: true
                    }
                };
            });

            // test geo location in emulator
            //resolve({ latitude: -19.9211, longitude: -43.9424 });
            //return;

            Location.getCurrentPosition(
                ({ coords }) => {
                    resolve(coords);
                },
                (err) => {
                    console.log('@getCurrentPosition err', err);
                    captureException(err);
                    reject(err);
                },
                {
                    timeout: 7000,
                    enableHighAccuracy: false,
                    accuracy: {
                        android: 'balanced',
                        ios: 'hundredMeters'
                    }
                }
            );
        } catch (err) {
            console.log('@location, getLocation, err = ', err);
            captureException(err);
            reject(err.message);
        }
    });
};
interface LatLngDTO {
    latitude: number | string;
    longitude: number | string;
}

export const convertLatLngToAddress = (latLng: LatLngDTO) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url =
                'https://nominatim.openstreetmap.org/reverse?format=json&lat=' +
                latLng.latitude +
                '&lon=' +
                latLng.longitude +
                '&zoom=18&addressdetails=1';
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });
            const resJson = await res.json();
            resolve(resJson);
        } catch (err) {
            console.log('@location, convertLatLngToAddress, err = ', err);
            reject(err.message);
        }
    });
};

export const searchLocations = async (search: string) => {
    return new Promise(async (resolve, reject) => {
        try {
            const url = `https://nominatim.openstreetmap.org/search?q=${search}&format=json&addressdetails=1`;
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json'
                }
            });
            const resJson = await res.json();
            resolve(resJson);
        } catch (err) {
            console.log('@location, searchLocations, err = ', err);
            reject(err.message);
        }
    });
};

export async function googleReverseGeo(latLng: LatLngDTO) {
    try {
        const url =
            'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            latLng.latitude +
            ',' +
            latLng.longitude +
            '&key=' +
            'AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI';

        const res = await fetch(url, {
            method: 'GET'
        });
        const responseInJson = await res.json();

        return responseInJson;
    } catch (err) {
        console.log('@location, googleReversoGo, err = ', err);
        throw new Error(err.message);
    }
}

export const googleSearchPlaces = async (search: string) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${search}&key=AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI&language=pt-br&components=country:BR`;

        const res = await fetch(url, {
            method: 'GET'
        });
        const responseInJson = await res.json();

        return responseInJson;
    } catch (err) {
        console.log('@location, googleReversoGo, err = ', err);
        throw new Error(err.message);
    }
};

export const getGoogleDetails = async (placeId: string) => {
    try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?fields=address_components,formatted_address,geometry&place_id=${placeId}&key=AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI&language=pt-br&components=country:BR`;

        const res = await fetch(url, {
            method: 'GET'
        });
        const responseInJson = await res.json();

        return responseInJson;
    } catch (err) {
        console.log('@location, googleReversoGo, err = ', err);
        throw new Error(err.message);
    }
};

export async function googleFromCep(PostalCode: string) {
    try {
        const url =
            'https://maps.googleapis.com/maps/api/geocode/json?components=' +
            'country:BR' +
            '=|postal_code:' +
            PostalCode +
            '&key=' +
            'AIzaSyBBVMEPDktEjcindc7_NjCpFWsSWVspyKI';

        const res = await fetch(url, {
            method: 'GET'
        });
        const responseInJson = await res.json();

        return responseInJson;
    } catch (err) {
        console.log('@location, googleReversoGo, err = ', err);
        throw new Error(err.message);
    }
}

export const getCEPApi = async (cep) => {
    try {
        const res = await fetch(
            `https://www.cepaberto.com/api/v3/cep?cep=${cep}`,
            {
                method: 'GET',
                headers: {
                    Authorization:
                        'Token token=5d43d8f3c4d57c23978889f80f84d819'
                }
            }
        );

        const jsonRes = await res.json();

        return jsonRes;
    } catch (err) {
        console.log('@location, getCEPApi, err = ', err);
        throw new Error(err.message);
    }
};

export const formatCepAberto = (addr) => {
    return {
        Street: addr.logradouro,
        City: addr?.cidade?.nome,
        State: addr?.estado?.sigla,
        PostCode: addr?.cep,
        Country: 'BR',
        Neighborhood: addr?.bairro
    };
};

export const formatCepRes = (addr) => {
    return {
        Street: addr?.logradouro,
        City: addr?.localidade,
        State: addr?.uf,
        PostCode: addr?.cep,
        Country: 'BR',
        Neighborhood: addr?.bairro
    };
};

export const formatAddressGoogle = (addr) => {
    let Street = addr.find((a) => a.types.indexOf('route') > -1);
    let City = addr.find(
        (a) => a.types.indexOf('administrative_area_level_2') > -1
    );
    let State = addr.find(
        (a) => a.types.indexOf('administrative_area_level_1') > -1
    );
    let PostCode = addr.find((a) => a.types.indexOf('postal_code') > -1);
    let Country = addr.find((a) => a.types.indexOf('country') > -1);
    let Neighborhood = addr.find(
        (a) =>
            a.types.indexOf('sublocality_level_1') > -1 ||
            a.types.indexOf('administrative_area_level_4') > -1
    );

    Street = Street ? Street.long_name : null;
    City = City ? City.long_name : null;
    State = State ? State.short_name : null;
    PostCode = PostCode ? PostCode.long_name.replace('-', '') : '00000000';
    Country = Country ? Country.short_name : null;
    Neighborhood = Neighborhood ? Neighborhood.long_name : null;

    if (!Country || Country !== 'BR') return null;

    return { Street, City, State, PostCode, Country, Neighborhood };
};

export const formatAddress = (addr, type) => {
    const Street = addr.road || addr.address100 || null;
    const City =
        addr.city || addr.town || addr.city_district || addr.hamlet || null;
    const State = addr.state;
    const PostCode = addr.postcode || '00000';
    const Country = 'BR';
    const Neighborhood = addr.neighbourhood || addr.suburb || null;

    if (type === 'any') {
        if (addr.country !== 'Brasil') return null;
    } else {
        if (!Street || !City || !State || addr.country !== 'Brasil')
            return null;
    }

    return { Street, City, State, PostCode, Country, Neighborhood };
};

export const displayAddress = (addr, showOnlyCityAndState = false) => {
    if (showOnlyCityAndState) {
        return `${addr?.Neighborhood ? `${addr?.Neighborhood} - ` : ''}${
            addr?.City ? `${addr.City}` : ''
        }${addr?.State ? ` / ${addr.State}` : ''}`;
    }

    return `${addr?.Street ? `${addr.Street}, ` : ''}${
        addr?.Neighborhood ? `${addr.Neighborhood} - ` : ''
    }${addr?.City ? `${addr.City}` : ''}${
        addr?.State ? ` / ${addr.State}` : ''
    }${addr?.PostCode && addr.PostCode !== '00000' ? ` ${addr.PostCode}` : ''}`;
};

export const completeAddress = (addr, showReducedAddress = false) => {
    if (showReducedAddress) {
        return `${addr.Neighborhood} - ${addr?.City ? `${addr.City}` : ''}${
            addr?.State ? ` / ${addr.State}` : ''
        }`;
    }
    return `${addr?.Street}, ${addr?.Number}${
        addr?.Complement ? ' ' + addr.Complement : ''
    }, ${addr?.Neighborhood} - ${addr?.PostCode} ${addr?.City} - ${addr?.State}`;
};
