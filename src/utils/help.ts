import {
    HELP_INDIVIDUAL_REJECTED,
    HELP_RECEIVED_PEDING,
    HELP_RECEIVED_PROPOSAL_REJECTED,
    HELP_RECEIVED_REJECTED,
    HELP_RECEIVED_SENT,
    HELP_SENT,
    HELP_SENT_PEDING,
    HELP_SENT_PROPOSAL,
    HELP_SENT_PROPOSAL_READ,
    HELP_SENT_PROPOSAL_REJECT,
    HELP_SENT_PROPOSAL_SENT,
    HELP_SENT_REJECTED
} from '@constants/index';
import { THelpUrgency } from '@ts/types/help';

//Deal with urgency with color and urgency text
export const handleUrgency = (urgency: string) => {
    switch (urgency) {
        case 'immediate':
            return {
                Text: HELP_URGENCY_LABEL.immediate,
                Color: '#FA1616'
            };
        case 'urgent':
            return {
                Text: HELP_URGENCY_LABEL.urgent,
                Color: '#FF6F5C'
            };
        case 'medium':
            return {
                Text: HELP_URGENCY_LABEL.medium,
                Color: '#FF9D00'
            };
        case 'can_wait':
            return {
                Text: HELP_URGENCY_LABEL.can_wait,
                Color: '#0EA581'
            };
        default:
            return {
                Text: 'Carregando',
                Color: '#FA1616'
            };
    }
};

export type HelpStatusTypes =
    | 'HelpReceived-under_analysis'
    | 'HelpReceived-accepted'
    | 'HelpReceived-rejected'
    | 'HelpReceived-proposal_sent'
    | 'HelpReceived-proposal_rejected'
    | 'HelpReceived-selected'
    | 'HelpReceived-finish_confirmated'
    | 'HelpReceived-finish_pending'
    | 'HelpSent-sent'
    | 'HelpSent-read'
    | 'HelpSent-hasProposal'
    | 'HelpSent-hasProposals'
    | 'HelpSent-loading'
    | 'HelpSent-selected'
    | 'HelpSent-finish_confirmated'
    | 'HelpSent-finish_pending'
    | 'ProposalSent-sent'
    | 'ProposalSent-read'
    | 'ProposalSent-accepted'
    | 'ProposalSent-rejected'
    | 'ProposalSent-finished'
    | 'ProposalSent-finish_pending'
    | 'ProposalSent-finish_confirmated'
    | 'ProposalSent-expired'
    | 'ProposalReceived-sent'
    | 'ProposalReceived-read'
    | 'ProposalReceived-accepted'
    | 'ProposalReceived-rejected'
    | 'ProposalReceived-finished'
    | 'ProposalReceived-finish_pending'
    | 'ProposalReceived-selected'
    | 'ProposalReceived-finish_confirmated'
    | 'ProposalReceived-expired'
    | string;

export const handleStatus = (status: HelpStatusTypes) => {
    switch (status) {
        case HELP_SENT_PROPOSAL_READ:
        case HELP_SENT_PROPOSAL_SENT:
        case HELP_SENT_PROPOSAL:
            return {
                Text: 'Recebido',
                Color: '#FA1616',
                Bg: '#fff'
            };

        case 'HelpReceived-accepted':
            return {
                Text: 'Aceito',
                Color: '#0EA581',
                Bg: '#0EA5810D'
            };
        case 'HelpSent-hasProposals':
        case 'HelpSent-hasProposal':
        case HELP_SENT:
            return {
                Text: 'Enviado',
                Color: '#0EA581',
                Bg: '#faf2f2'
            };

        case 'HelpReceived-under_analysis':
            return {
                Text: 'Recebido',
                Color: '#FA1616',
                Bg: '#FF6F5C0D'
            };

        case HELP_RECEIVED_SENT:
            return {
                Text: 'Respondido',
                Color: '#0EA581',
                Bg: '#fff'
            };

        case HELP_INDIVIDUAL_REJECTED:
            return {
                Text: 'Help Rejeitado',
                Color: '#FA1616',
                Bg: '#FF6F5C0D'
            };
        case 'HelpSent-finished':
        case 'HelpReceived-finished':
        case 'HelpReceived-finish_confirmated':
        case 'HelpSent-finish_confirmated':
            return {
                Text: 'Serviço Finalizado',
                Color: '#707070',
                Bg: '#E8E8E8'
            };

        case 'HelpSent-selected':
        case 'HelpReceived-selected':
            return {
                Text: 'Aprovado',
                Color: '#0EA581',
                Bg: '#0EA5810D'
            };
        case HELP_RECEIVED_REJECTED:
        case HELP_SENT_REJECTED:
        case HELP_SENT_PROPOSAL_REJECT:
        case HELP_RECEIVED_PROPOSAL_REJECTED:
            return {
                Text: 'Recusado',
                Color: '#FA1616',
                Bg: '#FF6F5C0D'
            };

        case 'HelpSent-loading':
            return {
                Text: 'Carregando',
                Color: '#FA1616',
                Bg: '#FF6F5C0D'
            };
        case HELP_RECEIVED_PEDING:
        case HELP_SENT_PEDING:
            return {
                Text: 'Confirmação Pendente',
                Color: '#707070',
                Bg: '#E8E8E8'
            };

        default:
            return {
                Text: 'Carregando',
                Color: '#FA1616',
                Bg: '#FF6F5C0D'
            };
    }
};

export const HELP_URGENCY_LABEL: Record<THelpUrgency, string> = {
    immediate: 'Imediato',
    urgent: 'Imediato',
    medium: 'Nos próximos dias',
    can_wait: 'Sou flexível'
};

export const HELP_URGENCY_TIME: Record<THelpUrgency, string> = {
    immediate: '12 Horas',
    urgent: '48 Horas',
    medium: '7 Dias',
    can_wait: '30 Dias'
};
export const HELP_URGENCY_FULL: Record<THelpUrgency, string> = {
    immediate: 'Imediato: até 12 Horas',
    urgent: 'Urgente: até 48 Horas',
    medium: 'Pouco Urgente: até 7 Dias',
    can_wait: 'Pode Esperar: 30 Dias ou Mais'
};
