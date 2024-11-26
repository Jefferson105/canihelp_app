export interface ILocation {
    Lat: string;
    Lon: string;
}

export interface ILocationLatLng {
    latitude: string;
    longitude: string;
}

export interface IUpdateLocation {
    latLng: ILocationLatLng;
    from: 'geo' | 'fixed';
}

export interface IGetLocation {
    address: {
        City: string;
        Country: string;
        Neighborhood: string;
        PostCode: string;
        State: string;
        Street: string;
    };
    displayName: string;
    latitude: number;
    longitude: number;
}

export interface ILocationCTX {
    loading: boolean;
    notFound: boolean;
    coords: any;
    from: 'geo' | 'fixed' | 'search' | null;
    latitude: number;
    longitude: number;
}
