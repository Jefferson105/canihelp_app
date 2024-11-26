import React from 'react';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Container, Text } from '@styles/index';
import { checkConnect } from '@utils/index';
import { AppRootParamList } from '../../types/nav-types';
import { mainColor } from '@styles/colors';
import { Icon } from '@styles/icon';

interface NewsProps {
    txt: string;
    txtWithDecoration: string;
    onPress?: () => void;
    path?: keyof AppRootParamList;
    params?: object;
    imageName?: string;
}

const { width } = Dimensions.get('window');

const Notice = ({
    txt,
    onPress,
    path,
    params,
    txtWithDecoration
}: NewsProps) => {
    const navigation = useNavigation();
    const { isConnected } = useSelector(({ info }) => info);

    return (
        <Container
            testID="test-multi-help"
            onPress={
                path
                    ? checkConnect.bind({}, isConnected, () =>
                          navigation.navigate(path, params)
                      )
                    : onPress
            }
            width={width - 44 + 'px'}
            height="105px"
            radius={16}
            color={mainColor}
            marg="0 0 0 22px"
            dir="row"
            align="center"
            justify="center"
        >
            <Container
                marg="20px 0 0 0"
                width="48px"
                height="48px"
                color="#FAFAFA"
                justify="center"
                align="center"
                radius={100}
                style={{
                    shadowColor: '#000',
                    shadowOffset: {
                        width: 1,
                        height: 1
                    },
                    shadowOpacity: 0.2,
                    shadowRadius: 1.41,
                    elevation: 8,
                    marginBottom: 20
                }}
            >
                <Icon name="megaphone" />
            </Container>

            <Container
                width={width - 148 + 'px'}
                maxWidth="400px"
                align={'center'}
                justify={'center'}
                pad="0 0px 0 8px"
            >
                <Text
                    weight={600}
                    size={13}
                    line={16}
                    color="#fff"
                    align="left"
                >
                    {txt}
                    <Text
                        weight={600}
                        size={13}
                        line={16}
                        color="#fff"
                        align="left"
                        decoration="underline #fff"
                    >
                        {txtWithDecoration}
                    </Text>
                </Text>
            </Container>
        </Container>
    );
};

export default Notice;
