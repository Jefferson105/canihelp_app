import React from 'react';
import { Modal } from 'react-native';

import Filters from '@components/shared/filters';
import { useSelector } from '@context/index';

import { socialDispatch } from '@context/dispatches';
import { ILocationLatLng } from '@ts/interfaces/location';

interface FilterProps {
    online?: boolean;
    review?: boolean;
    visible?: boolean;
    professional?: boolean;
    onSubmit?: (
        distanceQuery: any,
        latitude: any,
        longitude: any,
        onlineSearch?: boolean,
        reviewSearch?: boolean,
        changed?: any
    ) => Promise<void>;
    distance?: number;
    location?: ILocationLatLng;
    maxDistance?: number;
}

const Filter = ({
    visible,
    onSubmit,
    distance,
    location,
    professional,
    online,
    review,
    maxDistance = 120
}: FilterProps) => {
    const {
        social: { filter }
    } = useSelector(({ social }) => ({ social }));

    return (
        <Modal
            visible={filter && visible}
            onRequestClose={() => socialDispatch({ filter: false })}
            animationType="slide"
        >
            <Filters
                online={online}
                review={review}
                location={location}
                distance={distance}
                backHandler={() => socialDispatch({ filter: false })}
                onSubmit={onSubmit}
                professional={professional}
                maxDistance={maxDistance}
            />
        </Modal>
    );
};

export default Filter;
