import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';

import EditInfo from '@components/profile/edit-info';
import EditServices from '@components/profile/edit-services';

import { SafeView } from '@styles/index';

type RouteParams = {
    params: {
        type?: string;
    };
};

const EditProfile = () => {
    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    return (
        <SafeView>{params?.type ? <EditServices /> : <EditInfo />}</SafeView>
    );
};

export default EditProfile;
