import React from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import {
    Container as Line,
    Text,
    Float,
    Input,
    Small,
    Button
} from '@styles/index';
import { Icon } from '@styles/icon';

import { checkConnect } from '@utils/index';
import { socialDispatch } from '@context/dispatches';
import { ICategory } from '@ts/interfaces/categories';

interface IProps {
    hasProfessionals: boolean;
    currentCategory: ICategory;
    filter: number;
}

const SearchHeader = ({
    hasProfessionals,
    currentCategory,
    filter
}: IProps) => {
    const navigation = useNavigation();
    const {
        search,
        info: { isConnected }
    } = useSelector(({ search, info }) => ({
        search,
        info
    }));

    const { location, category } = search;

    const handleNavigateToHelpForm = () => {
        if (currentCategory && currentCategory.Group === 'transportation') {
            navigation.navigate('TransportationProHelp', {
                CategoryID: currentCategory._id,
                filter,
                search: true
            });
            return;
        }

        navigation.navigate('MultiProHelp', {
            filter
        });
    };

    return (
        <>
            <Line color="#fff" pad="0 24px">
                <Line
                    testID="testSearch"
                    dir="row"
                    marg="22px 0 -15px 0"
                    justify="center"
                    onPress={checkConnect.bind({}, isConnected, () =>
                        navigation.navigate('Categories', {
                            next: 'SearchResult'
                        })
                    )}
                >
                    <Float width="65%" height="65%" top="0" left="0" />
                    <Input
                        testID="test-search-result"
                        placeholder={category?.Name}
                        placeholderTextColor="#4e4e4e8f"
                        flex="1"
                        pad="0 42px"
                        left={true}
                        bottom={0}
                    />

                    <Line
                        testID="testCancel"
                        justify="center"
                        align="center"
                        pad={'15px 12px'}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Small
                            family="Circularstd-Bold"
                            size={14}
                            align={'center'}
                        >
                            Cancelar
                        </Small>
                    </Line>
                </Line>
                <Line dir="row">
                    <Line
                        testID="test-location"
                        pad="15px 0 10px 0"
                        align="center"
                        width="75%"
                        dir="row"
                        onPress={checkConnect.bind({}, isConnected, () =>
                            navigation.navigate('Location', {
                                next: 'SearchResult'
                            })
                        )}
                    >
                        <Icon name="pin" />
                        <Text
                            numberOfLines={1}
                            ellipsizeMode={'tail'}
                            marg="0 0 0 10px"
                            flex={1}
                        >
                            {search?.location
                                ? search?.location?.displayName
                                : 'Pesquisar sua localização'}
                        </Text>

                        <Icon name="down" />
                    </Line>
                    <Line
                        testID="testFilter"
                        dir="row"
                        align="center"
                        flex={1}
                        pad="15px 0 10px 0"
                        justify="space-around"
                        onPress={checkConnect.bind({}, isConnected, () => {
                            if (location) socialDispatch({ filter: true });
                            else Alert.alert('Selecione uma localização');
                        })}
                    >
                        <Small
                            family="Circularstd-Bold"
                            size={14}
                            align={'center'}
                        >
                            {' '}
                            Filtrar
                        </Small>

                        <Icon name="filter" />
                    </Line>
                </Line>
            </Line>

            {!!hasProfessionals && (
                <Float
                    pad="0"
                    bottom="10px"
                    justify="center"
                    align="center"
                    width={'100%'}
                >
                    <Button
                        color="#fff"
                        text="Pedir Orçamentos"
                        width={200}
                        height={50}
                        size={16}
                        onPress={handleNavigateToHelpForm}
                    />
                </Float>
            )}
        </>
    );
};

export default SearchHeader;
