import React from 'react';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { useDispatch, useSelector } from '@context/index';
import { getState } from '@hooks/context';

import { Button, NavHeader } from '@styles/index';

import { publishPost } from '@context/actions/local/create-post';
import { checkConnect } from '@utils/index';

type RouteParams = {
    params: {
        type: 'help' | 'check' | null;
        edit: any;
        search: boolean;
    };
};

const CreatePostHeader = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { params } = useRoute<RouteProp<RouteParams, 'params'>>();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const [crPost, dispatchCtx] = getState();

    const handlePublishPost = () => {
        checkConnect(isConnected, () => {
            dispatch(publishPost(params, navigation, dispatchCtx, crPost));
        });
    };

    return (
        <NavHeader
            justify="center"
            title="Novo"
            paddingText="0 45px 0 30%"
            right={
                <Button
                    testID="buttom-teste"
                    onPress={handlePublishPost}
                    type={
                        crPost.Text || params.type === 'check' || params.search
                            ? 'default'
                            : 'disabled'
                    }
                    text={params.edit ? 'Editar' : 'Postar'}
                    width={90}
                    height={30}
                    family="Axiforma-SemiBold"
                    size={13}
                    linearType="vertical"
                />
            }
        />
    );
};

export default CreatePostHeader;
