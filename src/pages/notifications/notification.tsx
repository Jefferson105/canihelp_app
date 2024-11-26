import React from 'react';
import { ScrollView } from 'react-native';

import {
    NavHeader,
    SafeView,
    Container,
    Text,
    BorderVertical
} from '@styles/index';
import { useSelector } from '@context/index';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
    const navigation = useNavigation();
    const { user, location } = useSelector(({ user, location }) => ({
        user,
        location
    }));

    return (
        <SafeView>
            <NavHeader justify={'center'} title="Recados" big={true} />
            <ScrollView>
                {user.Categories.length > 0 && (
                    <BorderVertical type="bottom" marg="0 24px" pad="15px 0">
                        <Container width="100%">
                            <Text
                                weight="bold"
                                line={16}
                                size={16}
                                color={'#323232'}
                            >
                                Canihelp
                            </Text>
                            <Text align="justify">
                                Parabéns, você acaba de se cadastrar como
                                profissional.
                            </Text>
                            <Text>
                                Oferecer serviços na plataforma é gratuito.
                            </Text>
                            <Text align="justify">
                                Seguem algumas dicas importantes para sua maior
                                visibilidade na plataforma.
                            </Text>

                            <Text align="justify">
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Profile', {
                                            user: user._id
                                        })
                                    }
                                    decoration="underline"
                                >
                                    Preencha seu perfil detalhadamente
                                </Text>
                                , adicione fotos ao perfil e portfólio. Descreva
                                sobre seu negócio, experiência e adicione
                                serviços de preço fixo, caso os tenha.
                            </Text>

                            <Text align="justify">
                                Fique sempre atento ao aplicativo, pois o mesmo
                                funciona em tempo real e você poderá receber
                                mensagens e/ou solicitação de orçamentos a
                                qualquer hora.
                            </Text>
                            <Text align="justify">
                                Permaneça com o GPS ligado, desta forma quando
                                você se deslocar, um potencial cliente poderá te
                                ter por perto.
                            </Text>

                            <Text align="justify">
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Social')
                                    }
                                    decoration="underline"
                                >
                                    Utilize o feed para divulgar serviços já
                                    realizados
                                </Text>
                                , novidades e interagir com outros usuários
                            </Text>

                            <Text align="justify">
                                Através do{' '}
                                <Text
                                    onPress={() => {
                                        if (location?.coords) {
                                            navigation.navigate('CreatePost', {
                                                type: 'check'
                                            });
                                        } else {
                                            navigation.navigate('Location', {
                                                next: 'CreatePost',
                                                pass: { type: 'check' }
                                            });
                                        }
                                    }}
                                    decoration="underline"
                                >
                                    check-in
                                </Text>{' '}
                                você pode mostrar sua disponibilidade para novos
                                orçamentos e serviços, em um local específico
                            </Text>

                            <Text align="justify">
                                Com o perfil profissional, você também pode
                                contratar outro profissional ou serviço na{' '}
                                <Text
                                    onPress={() =>
                                        navigation.navigate('Categories')
                                    }
                                    decoration="underline"
                                >
                                    pesquisa
                                </Text>
                                , ou através do{' '}
                                <Text
                                    onPress={() =>
                                        navigation.navigate('MultiProHelp')
                                    }
                                    decoration="underline"
                                >
                                    orçamento
                                </Text>
                                .
                            </Text>
                            <Text marg="4px 0" align="justify">
                                Bons negócios!
                            </Text>
                            <Text marg="4px 0 16px 0" align="justify">
                                Canihelp - O seu shopping de serviços
                            </Text>
                        </Container>
                    </BorderVertical>
                )}

                <BorderVertical type="bottom" marg="0 24px" pad="15px 0">
                    <Container>
                        <Text
                            weight="bold"
                            line={16}
                            size={16}
                            color={'#323232'}
                        >
                            Canihelp
                        </Text>

                        <Text marg="4px 0">Seja bem-vindo ao Canihelp! </Text>
                        <Text marg="4px 0" align="justify">
                            Criamos uma plataforma inteligente, para que você
                            possa contratar e oferecer serviços de maneira
                            simples, direta e segura. Para que o funcionamento
                            ocorra de maneira correta, fique sempre atento ao
                            aplicativo, pois toda a interação entre usuários da
                            plataforma ocorrerá por aqui, em tempo real. Você
                            não receberá qualquer comunicado fora deste
                            ambiente.
                        </Text>
                        <Text marg="4px 0">Você já pode:</Text>
                        <Text marg="4px 0" align="justify">
                            <Text
                                onPress={() =>
                                    navigation.navigate('Categories')
                                }
                                decoration="underline"
                            >
                                Pesquisar por um profissional ou serviço
                            </Text>{' '}
                            específico através da busca, navegar entre perfis,
                            conversar e negociar diretamente com o profissional.
                        </Text>

                        <Text marg="4px 0" align="justify">
                            <Text
                                onPress={() =>
                                    navigation.navigate('MultiProHelp')
                                }
                                decoration="underline"
                            >
                                Receber vários orçamentos através de um pedido
                            </Text>
                            , avaliar e fechar com o profissional que atende sua
                            necessidade.
                        </Text>
                        <Text marg="4px 0" align="justify">
                            Enviar um orçamento direto para{' '}
                            <Text
                                onPress={() =>
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Home' }]
                                    })
                                }
                                decoration="underline"
                            >
                                serviços em transportes
                            </Text>
                        </Text>
                        <Text marg="4px 0" align="justify">
                            <Text
                                onPress={() => navigation.navigate('Social')}
                                decoration="underline"
                            >
                                Navegar pelo feed
                            </Text>
                            , acompanhar as novidades em serviços e interagir
                            com usuários na região
                        </Text>
                        <Text marg="4px 0" align="justify">
                            <Text
                                onPress={() =>
                                    navigation.navigate('ProviderService')
                                }
                                decoration="underline"
                            >
                                Oferecer serviços
                            </Text>{' '}
                            na plataforma
                        </Text>
                        <Text marg="4px 0">
                            Agora navegue, explore e faça bons negócios.
                        </Text>
                        <Text marg="4px 0 16px 0">
                            Canihelp - O seu shopping de serviços
                        </Text>
                    </Container>
                </BorderVertical>
            </ScrollView>
        </SafeView>
    );
};

export default Notification;
