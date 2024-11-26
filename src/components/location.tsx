import React from 'react';

import { Input, Title, Container, Text, Small, CheckBox } from '@styles/index';
import { IAddress } from '@ts/interfaces/user';

interface ILocationProps {
    address?: IAddress;
    coords?: {};
    onChange?: () => void;
    setAddress?: (address: IAddress) => void;
    handleCepChange: (value: string) => void;
    cepHasError: boolean;
    scroll: any;
    scrollToBottom: () => void;
    setSearch: (value: boolean) => void;
}

const Location = ({
    address,
    setAddress,
    handleCepChange,
    cepHasError,
    scrollToBottom,
    setSearch
}: ILocationProps) => {
    return (
        <>
            <Title top={4}>Localização Fixa</Title>

            <Input
                testID="test-cep"
                label="CEP"
                value={address.PostCode}
                top={20}
                mBottom={false}
                maxLength={8}
                keyboardType="numeric"
                onChangeText={handleCepChange}
            />
            <Container
                onPress={() => setSearch(true)}
                dir="row"
                marg="0px 0 20px 0"
                justify="space-between"
                align="center"
                width="100%"
            >
                <Text size={14} decoration={'underline'}>
                    Procurar pelo endereço
                </Text>

                {cepHasError && <Small color={'#BE0000'}>* Cep inválido</Small>}
            </Container>

            <Container width="100%" dir="row" justify="space-between">
                <Input
                    label="Estado"
                    value={address.State}
                    editable={false}
                    onFocus={() => setSearch(true)}
                    width="25%"
                />

                <Input
                    label="Cidade"
                    value={address.City}
                    editable={false}
                    onFocus={() => setSearch(true)}
                    width="70%"
                />
            </Container>

            <Input
                label="Bairro"
                editable={false}
                value={address.Neighborhood}
                returnKeyType="next"
                placeholder=""
                autoCapitalize="sentences"
                keyboardType="default"
            />

            <Input
                label="Endereço"
                value={address.Street}
                editable={false}
                onFocus={() => setSearch(true)}
            />

            <Container width="100%" dir="row" justify="space-between">
                <Input
                    testID="test-number"
                    onFocus={() => {
                        scrollToBottom();
                    }}
                    keyboardType="numeric"
                    label="Número"
                    value={address.Number ? String(address.Number) : null}
                    width="25%"
                    onChangeText={(text) => {
                        setAddress({
                            ...address,
                            Number: text
                        });
                    }}
                />

                <Input
                    onFocus={() => {
                        scrollToBottom();
                    }}
                    label="Complemento (andar, apto, casa…)"
                    value={address.Complement}
                    width="70%"
                    onChangeText={(text) => {
                        setAddress({
                            ...address,
                            Complement: String(text)
                        });
                    }}
                />
            </Container>
            <Container align="center" width="100%" dir="row" pad="0 0 16px 0px">
                <Text size={14} weight="bold" marg="0 14px 0 0px">
                    {`Quero que outros usuários vejam meu\n endereço completo. (Lojas)`}
                </Text>
                <Container marg="0 -10px 0 auto">
                    <CheckBox
                        checked={address.Show}
                        onChange={() =>
                            setAddress({
                                ...address,
                                Show: !address.Show
                            })
                        }
                    />
                </Container>
            </Container>
        </>
    );
};

export default Location;
