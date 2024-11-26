import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/core';

import { useSelector } from '@context/index';

import { Container, Tag } from '@styles/index';

import { HelpStatusTypes } from '@utils/help';
import { checkConnect } from '@utils/index';
import {
    HELP_RECEIVED_ANALYSIS,
    HELP_RECEIVED_ACCEPTED,
    HELP_SENT_SELECTED,
    HELP_RECEIVED_SELECTED,
    HELP_RECEIVED_PEDING,
    HELP_SENT_PEDING,
    HELP_SENT,
    HELP_INDIVIDUAL_ACCEPTED,
    HELP_SENT_PROPOSAL_READ,
    HELP_SENT_PROPOSAL_SENT,
    HELP_SENT_PROPOSAL,
    HELP_RECEIVED_SENT,
    HELP_INDIVIDUAL_SENT,
    HELP_INDIVIDUAL_READ
} from '@constants/index';
import { boxConfirmDispatch } from '@context/dispatches';
import { closeHelp, closeProposal, rejectHelp } from '@context/actions/help';

type BottomButtonsProps = {
    status: HelpStatusTypes;
    selection?: (state: boolean) => void;
    button?: () => void;
    loading?: boolean;
    isEdit?: boolean;
    ProposalID?: string;
    helpID?: string;
    isIndividual?: boolean;
    Desc?: string;
    loadingAction?: boolean;
};

const BottomButtons = ({
    status,
    selection,
    button,
    loading,
    isEdit,
    helpID,
    ProposalID,
    isIndividual,
    Desc,
    loadingAction
}: BottomButtonsProps) => {
    const navigation = useNavigation();

    const {
        info: { isConnected }
    } = useSelector(({ info }) => ({
        info
    }));

    const options = useMemo(() => {
        switch (status) {
            case HELP_RECEIVED_ANALYSIS:
                return {
                    display: true,
                    hasOption: true,
                    actionText: 'Deseja responder a este orçamento?',
                    disable: false
                };

            case HELP_RECEIVED_ACCEPTED:
                return {
                    display: true,
                    double: true,
                    disable: true,
                    firstactionText: loading ? 'Carregando' : 'Responder agora',
                    firstAction: button,
                    secondactionText: 'Não poderei realizar o serviço',
                    secondAction: () => {
                        boxConfirmDispatch({
                            title: `Deseja rejeitar esse pedido de orçamento?`,
                            confirm: () => {
                                rejectHelp(helpID);
                                navigation.navigate('Helps');
                            }
                        });
                    }
                };

            case HELP_INDIVIDUAL_READ:
            case HELP_INDIVIDUAL_SENT:
            case HELP_RECEIVED_SENT:
                return {
                    display: true,
                    double: true,
                    disable: true,
                    firstactionText: 'Alterar orçamento',
                    firstAction: () => {
                        navigation.navigate('CreateProposal', {
                            ProposalID,
                            isEdit: true,
                            HelpID: ProposalID ? false : helpID,
                            Desc,
                            isIndividual
                        });
                    },
                    secondactionText: 'Cancelar',
                    secondAction: () => {
                        boxConfirmDispatch({
                            title: `Deseja cancelar essa proposta?`,
                            confirm: async () => {
                                if (isIndividual) closeHelp(helpID);
                                else
                                    closeProposal({
                                        ProposalID,
                                        HelpID: helpID
                                    });

                                navigation.navigate('Helps');
                            }
                        });
                    }
                };

            case HELP_SENT_SELECTED:
            case HELP_SENT_PEDING:
            case HELP_INDIVIDUAL_ACCEPTED:
            case HELP_RECEIVED_SELECTED:
            case HELP_RECEIVED_PEDING:
                return {
                    display: true,
                    unique: true,
                    disable: true,
                    loadingTexts: 'Finalizar serviço'
                };

            case HELP_SENT:
            case HELP_SENT_PROPOSAL_READ:
            case HELP_SENT_PROPOSAL_SENT:
            case HELP_SENT_PROPOSAL:
                return {
                    display: true,
                    hasOption: true,
                    actionText: 'Deseja aceitar a proposta?',
                    disable: false
                };

            case 'create-proposal':
                return {
                    display: true,
                    unique: true,
                    disable: true,
                    loadingTexts: loading
                        ? 'Enviando'
                        : isEdit
                          ? 'Atualizar Proposta de Negócio'
                          : 'Enviar proposta'
                };

            case 'cancel-help':
                return {
                    display: true,
                    unique: true,
                    disable: true,
                    loadingTexts: 'Cancelar orçamento',
                    action: () => {
                        boxConfirmDispatch({
                            title: `Deseja cancelar esse orçamento?`,
                            confirm: async () => {
                                await closeHelp(helpID);

                                navigation.navigate('Helps');
                            }
                        });
                    }
                };

            default:
                return {
                    display: false
                };
        }
    }, [
        Desc,
        ProposalID,
        button,
        helpID,
        isEdit,
        isIndividual,
        loading,
        navigation,
        status
    ]);

    const loadingProps = useMemo(() => {
        if (!loadingAction) return { center: true };

        return {
            center: true,
            press: () => {
                return;
            },
            backGroundColor: '#ececec'
        };
    }, [loadingAction]);

    if (!options.display) return <></>;

    return (
        <Container marg="0px 0 0 20px" width="100%" color="#FAFAFA">
            <Container marg="0 0 34px 0" width="100%">
                {options.unique ? (
                    <Tag
                        minWidth={120}
                        mTop={20}
                        size={15}
                        text={options.loadingTexts}
                        borderColor="black"
                        press={checkConnect.bind(
                            {},
                            isConnected,
                            options.action ? options.action : button
                        )}
                        {...loadingProps}
                    />
                ) : options.double ? (
                    <>
                        <Tag
                            minWidth={120}
                            mTop={20}
                            size={15}
                            text={options.firstactionText}
                            borderColor="black"
                            press={checkConnect.bind(
                                {},
                                isConnected,
                                options.firstAction
                            )}
                            {...loadingProps}
                        />
                        <Tag
                            minWidth={120}
                            mTop={32}
                            size={15}
                            text={options.secondactionText}
                            borderColor="black"
                            press={checkConnect.bind(
                                {},
                                isConnected,
                                options.secondAction
                            )}
                            {...loadingProps}
                        />
                    </>
                ) : (
                    <>
                        <Tag
                            minWidth={120}
                            mTop={32}
                            size={15}
                            text={
                                status === HELP_SENT_PROPOSAL
                                    ? 'Aprovar'
                                    : isIndividual
                                      ? 'Aceitar'
                                      : 'Responder'
                            }
                            borderColor="black"
                            press={() =>
                                checkConnect.bind(
                                    {},
                                    isConnected,
                                    selection(true)
                                )
                            }
                            {...loadingProps}
                        />

                        <Tag
                            minWidth={120}
                            mTop={32}
                            size={15}
                            text="Recusar"
                            borderColor="black"
                            press={() =>
                                checkConnect.bind(
                                    {},
                                    isConnected,
                                    status === HELP_RECEIVED_ANALYSIS
                                        ? boxConfirmDispatch({
                                              title: `Deseja rejeitar esse pedido de orçamento?`,
                                              confirm: () => {
                                                  selection(false);
                                              }
                                          })
                                        : selection(false)
                                )
                            }
                            {...loadingProps}
                        />
                    </>
                )}
            </Container>
        </Container>
    );
};

export default BottomButtons;
