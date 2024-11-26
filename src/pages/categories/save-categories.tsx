import React, { useState, useCallback } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Categories from '@components/categories';
import { useSelector } from '@context/index';

import { NavHeader, SafeView, Button, Container } from '@styles/index';

import { updateUser } from '@context/actions/user';
import { checkConnect } from '@utils/index';

const SaveCategories = () => {
    const navigation = useNavigation();
    const {
        info: { isConnected },
        user
    } = useSelector(({ info, user }) => ({ info, user }));

    const scroll = React.useRef<ScrollView>(null);

    const [loading, setLoading] = useState(false);
    const [categories] = useState(user.Categories || []);

    const [mainCategoryLabel, setMainCategoryLabel] = useState<string>(
        categories.find((c) => c.IsPrimary)?.Label ||
            categories.find((c) => c.IsPrimary)?.Category?.Name
    );

    const scrollToBottom = () => {
        setTimeout(() => {
            scroll.current?.scrollToEnd({
                animated: true
            });
        }, 400);
    };

    const next = useCallback(async () => {
        setLoading(true);
        if (
            !categories.length ||
            mainCategoryLabel.length < 1 ||
            !categories.find((c) => c.IsPrimary)
        ) {
            Alert.alert('Verfique os dados');
            setLoading(false);
            return;
        }

        const req = {
            Categories: categories.map((c) => ({
                CategoryID: String(c.Category._id),
                IsPrimary: c.IsPrimary,
                ...(c.IsPrimary && { Label: mainCategoryLabel })
            }))
        };

        try {
            await updateUser(req);
            navigation.goBack();
        } catch (err) {
            console.log('@save-categories, next, err = ', err);
            Alert.alert('Erro');
        } finally {
            setLoading(false);
        }
    }, [categories, mainCategoryLabel, navigation]);

    return (
        <SafeView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1, width: '100%', height: '100%' }}
            >
                <NavHeader justify={'center'} title="Edição de serviços" />
                <ScrollView
                    testID="scrollView"
                    keyboardShouldPersistTaps="handled"
                    ref={scroll}
                >
                    <Container pad="5px 20px 20px" width="100%">
                        <Categories
                            userCategs={categories}
                            mainCategoryLabel={mainCategoryLabel}
                            setMainCategoryLabel={setMainCategoryLabel}
                            scrollToBottom={scrollToBottom}
                        />

                        <Button
                            top={30}
                            bottom={30}
                            text={loading ? 'Salvando...' : 'Salvar'}
                            disabled={loading}
                            onPress={checkConnect.bind({}, isConnected, next)}
                            type={loading ? 'disabled' : 'default'}
                        />
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default SaveCategories;
