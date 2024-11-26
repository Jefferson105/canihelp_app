import { captureMessage } from '@sentry/react-native';
import Location from 'react-native-geolocation-service';

import { globalState } from '@context/index';

import { updateUser } from '@context/actions/user';
import {
    getLocation,
    formatAddressGoogle,
    displayAddress,
    googleReverseGeo
} from '@services/location';

import { searchDispatch, locationDispatch } from '@context/dispatches';
import { IUpdateLocation } from '@ts/interfaces/location';

export const updateLocation = async ({ latLng, from }: IUpdateLocation) => {
    try {
        const { results } = await googleReverseGeo(latLng);

        if (!results.length) throw 'Local inválido 0';

        const address = formatAddressGoogle(results[0].address_components);

        if (!address) throw 'Local inválido 1';

        const { lat, lng } = results[0].geometry.location;

        const { user } = globalState;

        if (user)
            updateUser(
                {
                    LocationMobile: {
                        Lat: String(lat),
                        Lon: String(lng)
                    },
                    AddressMobile: displayAddress(address, true)
                },
                false
            );

        const location = {
            address,
            displayName: displayAddress(address),
            shortAddr: displayAddress(address, true),
            latitude: lat,
            longitude: lng
        };

        locationDispatch({ coords: location, from, notFound: false });

        return location;
    } catch (err) {
        console.log('update location error ', err);

        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@updateLocation{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const searchLocation = (location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!location?.address) {
                const { results } = await googleReverseGeo(location);

                if (!results.length) throw 'Endereço não encontrado';

                location.address = formatAddressGoogle(
                    results[0].address_components
                );

                if (!location?.address) throw 'Procure endereços no Brasil';
            }

            location.displayName = displayAddress(location.address);

            resolve(location);
        } catch (err) {
            reject(err);
            //Alert.alert(err);
            // throw new Error(err);
        }
    });
};

export const watchLocation = async () => {
    Location.watchPosition(
        ({ coords }) => {
            updateLocation({
                latLng: {
                    latitude: String(coords.latitude),
                    longitude: String(coords.longitude)
                },
                from: 'geo'
            });
        },
        (err) => {
            console.log('@watch position err', err);
        },
        {
            useSignificantChanges: true,
            distanceFilter: 1000
        }
    );
};

export const userGeoLocation = () => {
    return new Promise(async (resolve, reject) => {
        const { user } = globalState;
        try {
            const curLocation = await getLocation(); // geo

            updateLocation({
                latLng: {
                    latitude: String(curLocation.latitude),
                    longitude: String(curLocation.longitude)
                },
                from: 'geo'
            });

            const location = await searchLocation(curLocation);

            if (user && user.Categories?.length) watchLocation();

            locationDispatch({ from: 'geo', coords: location });

            resolve(location);
        } catch (err) {
            console.log('@userGeoLocation err', err);
            reject(err);
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@userGeoLocation{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }
    });
};

export const getFixedLocation = () => {
    const { LocationFixed, Address } = globalState.user || {};

    let location = null;

    if (LocationFixed?.Lat && LocationFixed?.Lon)
        location = {
            latitude: LocationFixed.Lat,
            longitude: LocationFixed.Lon
        };

    if (!location) {
        console.error('Location not found');
        return;
    }

    location.displayName = displayAddress(Address);
    location.address = Address;

    locationDispatch({ from: 'fixed', coords: location });
    searchDispatch({ location });

    return location;
};

export const getUserLocation = () => {
    return new Promise(async (resolve) => {
        const { user, location: ctxLocation } = globalState;

        let location = null;
        locationDispatch({ loading: true });
        try {
            location = await userGeoLocation();
        } catch (err) {
            if (!ctxLocation?.coords && user) location = getFixedLocation();
            const userName = globalState?.user?.Name || null;
            captureMessage(
                `@getUserLocation{${new Date().toLocaleDateString(
                    'pt-BR'
                )}}{${userName}}`
            );
        }

        locationDispatch({ loading: false });
        if (!location && ctxLocation?.coords) return;

        if (location) {
            searchDispatch({ location });
            locationDispatch({ notFound: false });
            resolve('Success');
        } else {
            locationDispatch({ notFound: true });
            resolve('not found');
        }
    });
};
