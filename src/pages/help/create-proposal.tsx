import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { z } from 'zod';

import {
    SafeView,
    Container,
    NavHeader,
    Input,
    DateTimePicker,
    Text,
    Button
} from '@styles/index';

import {
    createHelpProposal,
    createIndividualProposal,
    getHelp,
    getProposal,
    updateHelpProposal,
    updateProposal as updateProposalAction
} from '@context/actions/help';
import { useDispatch, useSelector } from '@context/index';
import { getFormatedDate } from '@utils/date-time';
import { handleUrgency } from '@utils/help';
import {
    currencyToFloat,
    joinNumberInput,
    parseCurrency
} from '@utils/currency';

type RouteProps = {
    params: {
        ProposalID?: string;
        UserID?: string;
        HelpID?: string;
        isEdit?: boolean;
        fromChat?: boolean;
        goHelp?: boolean;
        ConversationID: any;
        Desc?: string;
        isIndividual?: boolean;
    };
};

const proposalSchema = z
    .object({
        _id: z.string().optional(),
        Name: z
            .string({
                invalid_type_error: 'Por favor, informe o nome do serviço'
            })
            .min(1, {
                message: 'Por favor, informe o nome do serviço'
            }),
        Description: z
            .string({
                invalid_type_error: 'Por favor, informe uma descrição.'
            })
            .min(1, { message: 'Por favor, informe uma descrição.' }),
        Finish: z
            .date({
                invalid_type_error: 'Por favor, informe a data de término '
            })
            .transform((finish) => {
                const now = new Date();
                now.setHours(0, 0, 0, 0);

                if (now >= finish)
                    throw 'A data de término deve ser maior que a data atual';

                return finish;
            }),
        Price: z
            .number()
            .gt(0.0, { message: 'Por favor, informe o valor do seu serviço.' })
    })
    .strict();

const CreateProposal = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const {
        params: {
            UserID,
            HelpID,
            ProposalID,
            isEdit = false,
            goHelp = false,
            fromChat = false,
            ConversationID,
            Desc,
            isIndividual
        }
    } = useRoute<RouteProp<RouteProps, 'params'>>();

    const { helps, singleHelp, user } = useSelector(
        ({ helps, singleHelp, user }) => ({
            helps,
            singleHelp,
            user
        })
    );

    const { list: helpList = [] } = helps || { list: [] };

    const currentHelp = useMemo(() => {
        return (
            helpList.find((h) => String(h._id) === String(HelpID)) ||
            singleHelp?.list[0]
        );
    }, [HelpID, helpList, singleHelp]);

    const [Loading, setLoading] = useState(false);
    const [Name, setName] = useState(
        currentHelp?.Label || currentHelp?.Category?.Name
    );
    const [Description, setDescription] = useState('');
    const [Price, setPrice] = useState('0');

    const [Finish, setFinish] = useState({
        value: null,
        label: null
    });

    const changePriceInput = (price) => {
        const val = joinNumberInput(String(price));

        if (val.length > 9) return;

        setPrice(val);
    };

    const sendProposal = async () => {
        const proposalInfo = {
            Name,
            Description,
            Finish: Finish.value,
            Price: currencyToFloat(Price)
        };

        setLoading(true);

        try {
            if (!Description) {
                proposalInfo.Description =
                    user.Message || 'Olá, sou usuário do Canihelp';
            }

            await proposalSchema.parseAsync(proposalInfo);

            if (UserID) {
                const response = await createIndividualProposal(
                    {
                        Creator: UserID,
                        Proposal: proposalInfo
                    },
                    ConversationID
                );

                navigation.navigate('Proposal', {
                    helpID: response._id,
                    from: fromChat ? 'Chat' : 'SentProposal',
                    isNew: true,
                    goHelp
                });
            } else {
                // help proposal
                await createHelpProposal({
                    HelpID: HelpID,
                    Proposal: proposalInfo
                });

                navigation.navigate('Helps');
            }
        } catch (err) {
            setLoading(false);
            console.log(err);
            Alert.alert(err.issues[0].message);
        }
    };

    const updateProposal = async () => {
        try {
            const proposalInfo = {
                _id: String(ProposalID),
                Name,
                Description,
                Finish: Finish.value,
                Price: currencyToFloat(Price)
            };

            setLoading(true);

            if (!Description) {
                proposalInfo.Description =
                    user.Message || 'Olá, sou usuário do Canihelp';
            }

            await proposalSchema.parseAsync(proposalInfo);

            if (ProposalID) {
                await updateProposalAction({
                    Proposal: proposalInfo
                });

                navigation.goBack();

                return;
            }

            await updateHelpProposal({
                HelpID: String(HelpID),
                Proposal: {
                    Name,
                    Description,
                    Finish: Finish.value,
                    Price: currencyToFloat(Price)
                },
                Urgency: 'medium'
            });

            navigation.goBack();
        } catch (err) {
            console.log('update help err = ', err);
            Alert.alert(err.issues[0].message);
        } finally {
            setLoading(false);
        }
    };

    const fetchHelpData = useCallback(async () => {
        try {
            const helpToEdit =
                helpList.find((help) => String(help._id) === String(HelpID)) ||
                (await getHelp(HelpID));

            if (!helpToEdit) navigation.goBack();

            const { Proposal } = helpToEdit;
            // Edit individual proposal
            if (helpToEdit.Type === 'proposal') {
                setName(Proposal.Name);
                setDescription(Proposal?.Description);
                setPrice(Proposal.Price.toFixed(2));
                setFinish({
                    label: getFormatedDate(Proposal.Finish),
                    value: new Date(Proposal.Finish)
                });
            } else {
                // Fetch help data for create a new proposal
                setName(helpToEdit?.Category?.Description || helpToEdit?.Label);
            }

            setLoading(false);
        } catch (err) {
            console.log('fetch help err = ', err);
            navigation.goBack();
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HelpID, dispatch, helpList]);

    const fetchProposalData = useCallback(async () => {
        try {
            setLoading(true);

            const proposalToEdit = await getProposal(ProposalID);

            if (!proposalToEdit) navigation.goBack();

            setName(proposalToEdit.Name);
            setDescription(proposalToEdit.Description);
            setPrice(proposalToEdit.Price.toFixed(2));
            setFinish({
                label: getFormatedDate(proposalToEdit.Finish),
                value: new Date(proposalToEdit.Finish)
            });

            setLoading(false);
        } catch (err) {
            console.log('fetch proposal err = ', err);
            navigation.goBack();
            setLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HelpID, dispatch, helpList]);

    useEffect(() => {
        if (HelpID) {
            fetchHelpData();
        } else if (isEdit && ProposalID) {
            fetchProposalData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [HelpID, ProposalID, isEdit]);

    return (
        <SafeView>
            <NavHeader justify="center" title="Orçamento" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                style={{ flex: 1 }}
            >
                <ScrollView
                    testID="scrollView"
                    keyboardShouldPersistTaps="handled"
                >
                    <Container pad="34px 20px 20px">
                        <Container width="100%">
                            <Text
                                weight="bold"
                                size={15}
                                line={15}
                                family="Circularstd-Medium"
                            >
                                {UserID ? 'Titulo do serviço' : Name}
                            </Text>
                            {HelpID && (
                                <Text
                                    size={14}
                                    marg="8px 0 0px 0 "
                                    line={15}
                                    color={
                                        handleUrgency(currentHelp?.Urgency)
                                            .Color
                                    }
                                >
                                    [{handleUrgency(currentHelp?.Urgency).Text}]
                                </Text>
                            )}
                            {UserID && (
                                <Input
                                    maxLength={200}
                                    testID="test-service-title"
                                    placeholder="Ex: troca de chaves, ou chaveiro"
                                    placeholderTextColor="#4e4e4e8f"
                                    value={Name}
                                    onChangeText={(value) =>
                                        setName(String(value))
                                    }
                                />
                            )}
                            {Desc && (
                                <>
                                    <Text
                                        marg="16px 0 0 0"
                                        family="CircularStd-Medium"
                                        size={15}
                                        line={15}
                                    >
                                        Descrição
                                    </Text>
                                    <Text
                                        size={14}
                                        marg="8px 0 0px 0 "
                                        line={14}
                                    >
                                        {Desc}
                                    </Text>
                                </>
                            )}
                            <Text
                                marg={UserID ? '0px' : '16px 0 7px 0'}
                                family="CircularStd-Medium"
                                size={15}
                                line={15}
                            >
                                {UserID || isIndividual
                                    ? 'Descrição'
                                    : 'Resposta'}
                            </Text>
                            <Input
                                maxLength={2000}
                                testID="test-description"
                                multiline={true}
                                placeholder="Descreva de forma detalhada o serviço a ser executado..."
                                placeholderTextColor="#4e4e4e8f"
                                value={Description}
                                onChangeText={(txt: string) => {
                                    if (
                                        txt[0] === '\n' ||
                                        (txt[txt.length - 1] === '\n' &&
                                            txt[txt.length - 2] === '\n')
                                    )
                                        return;

                                    setDescription(txt);
                                }}
                            />
                            <Text
                                marg="0 0 8px 0"
                                family="CircularStd-Medium"
                                size={15}
                                line={15}
                            >
                                Entrega
                            </Text>
                            <DateTimePicker
                                mBottom={16}
                                value={Finish}
                                onChangeValue={(value) => {
                                    setFinish({
                                        label: getFormatedDate(value),
                                        value: new Date(value)
                                    });
                                }}
                                width="100%"
                            />
                            <Text
                                marg="8px 0"
                                family="CircularStd-Medium"
                                size={15}
                                line={15}
                            >
                                Valor
                            </Text>
                            <Input
                                testID="test-price"
                                keyboardType="numeric"
                                placeholder="R$850,00"
                                placeholderTextColor="#4E4E4E"
                                value={parseCurrency(String(Price))}
                                onChangeText={changePriceInput}
                            />
                        </Container>
                        <Button
                            top={8}
                            text={
                                Loading
                                    ? 'Carregando'
                                    : isEdit
                                      ? 'Editar'
                                      : 'Enviar'
                            }
                            disabled={Loading}
                            type={Loading ? 'disabled' : 'default'}
                            onPress={isEdit ? updateProposal : sendProposal}
                        />
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeView>
    );
};

export default CreateProposal;
