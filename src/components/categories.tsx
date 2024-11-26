import React, { useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from '@context/index';

import { Small, Input, Container, Press, Text, Shadow } from '@styles/index';

import { Icon } from '@styles/icon';

import { ICategoryPro } from '@ts/interfaces/categories';
import { registerProDispatch } from '@context/dispatches';

interface CategoriesProps {
    userCategs: Array<ICategoryPro>;
    mainCategoryLabel: string;
    setMainCategoryLabel: React.Dispatch<React.SetStateAction<string>>;
    scrollToBottom: () => void;
}

const Categories = ({
    userCategs,
    setMainCategoryLabel,
    mainCategoryLabel,
    scrollToBottom
}: CategoriesProps) => {
    const navigation = useNavigation();

    const { categories } = useSelector(({ categories }) => ({
        categories
    }));

    const mainCategory: ICategoryPro | null = useMemo(() => {
        if (userCategs.length > 0) {
            const priCat = userCategs.find((c) => c.IsPrimary);
            if (priCat) {
                priCat.Category.Label =
                    mainCategoryLabel || priCat.Category.Name;
                return priCat;
            } else return null;
        } else {
            return null;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCategs]);

    const onChangeLabel = (text: string) => {
        setMainCategoryLabel(text);
    };

    useEffect(() => {
        registerProDispatch({ category: mainCategory?.Category });
        registerProDispatch({
            subs: userCategs
                .filter((c) => !c.IsPrimary && c.Category.Type === 'default')
                .map((c) => c.Category)
        });
        registerProDispatch({
            specialties: userCategs
                .filter((c) => !c.IsPrimary && c.Category.Type === 'specialty')
                .map((c) => c.Category)
        });
    }, [userCategs, mainCategory]);

    return (
        <>
            <Container
                marg="15px 0 5px 0"
                pad="5px 10px"
                radius={5}
                color="#fff"
                border="1px solid #cdcdcd80"
                width="100%"
                dir="row"
                justify="space-between"
                align="center"
                onPress={() =>
                    navigation.navigate('ProviderService', { edit: true })
                }
            >
                <Text>{mainCategory?.Category?.Name}</Text>

                <Icon name="plus" width={36} height={36} />
            </Container>

            <Container dir="row" wrap="wrap" pad="10px 0 0 0">
                {userCategs
                    ?.filter((uc) => !uc.IsPrimary)
                    ?.map(({ Category }, i) => {
                        return (
                            <Press
                                key={i}
                                bg="rgba(241, 241, 241, 1)"
                                pad="3px 10px"
                                radius={10}
                                marg="0 5px 5px 0"
                            >
                                <Small weight="bold">{Category.Name}</Small>
                            </Press>
                        );
                    })}
            </Container>

            <Shadow
                mTop={10}
                mBottom={10}
                radius={5}
                width={'100%'}
                background={'#f3f3f3'}
                shadow={{
                    color: '#00000080',
                    height: 4,
                    opacity: 0.3,
                    radius: 4.65,
                    elevation: 8
                }}
            >
                <Container
                    dir="row"
                    radius={5}
                    pad="10px 10px"
                    align="center"
                    color="#fff"
                    onPress={() => {
                        if (
                            categories.some(
                                (c) =>
                                    String(c.ParentID) ===
                                    String(mainCategory?.Category?._id)
                            )
                        )
                            navigation.navigate('SelectEspc', {
                                edit: true
                            });
                        else
                            navigation.navigate('ProviderKeyWord', {
                                edit: true,
                                skiped: true
                            });
                    }}
                >
                    <Icon name="loupe" />
                    <Text size={15} marg="0 0 0 10px">
                        Edite suas especialidades…
                    </Text>
                    <Container marg="0 0 0 auto">
                        <Icon name="plus" width={36} height={36} />
                    </Container>
                </Container>
            </Shadow>

            <Text pad="15px 0 10px 0">
                A categoria principal cadastrada não pode ser alterada. Mas se
                necessário, altere o nome a ser visualizado pelos usuários
                abaixo.
            </Text>

            <Input
                testID="test-see-cat"
                label="Como os usuários visualizarão"
                value={mainCategoryLabel}
                onChangeText={onChangeLabel}
                editable
                top={20}
                mBottom={false}
                onFocus={() => scrollToBottom()}
            />

            <Text pad="15px 0 0 0">
                Este nome aparecerá junto ao seu perfil em toda a plataforma,
                esteja ciente que o nome escolhido representa de uma maneira
                direta seus serviço ofertados
            </Text>
        </>
    );
};

export default Categories;
