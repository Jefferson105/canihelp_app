import { captureMessage } from '@sentry/react-native';

import { showError } from '@utils/index';
import { displayAddress } from '@services/location';
import { globalState } from '@context/index';
import { mutateApi } from '@services/mutate-api';
import {
    ICreateHelp,
    ICreateProposal,
    IProposal,
    IUpdateHelpProposal
} from '@ts/interfaces/help';

export const getHelp = async (HelpID: string) => {
    const { info } = globalState;

    if (!info.isConnected) {
        throw new Error('not connected');
    }

    try {
        const { success, data, error } = await mutateApi({
            name: 'help',
            params: {
                HelpID: String(HelpID)
            }
        });

        if (!success) throw error;

        return data;
    } catch (err) {
        showError(err, 'Conversation');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@getHelp{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
    }
};

export const createHelp = async ({
    Providers,
    CategoryID,
    Description,
    Location,
    Urgency,
    Group,
    Transport,
    Type,
    SubCategories,
    Label
}: ICreateHelp) => {
    const { helps } = globalState;

    const req = {
        CategoryID,
        Description,
        DisplayLocation: Location?.displayName,
        Location: Location
            ? {
                  Lat: String(Location.latitude),
                  Lon: String(Location.longitude)
              }
            : undefined,
        Providers,
        ShortLocation: Location && displayAddress(Location.address, true),
        Urgency,
        Group,
        Type,
        ...(Transport && { Transport }),
        ...(SubCategories && { SubCategories }),
        ...(Label && { Label })
    };

    try {
        const { success, data, error } = await mutateApi({
            name: 'helpsCreate',
            params: req
        });

        if (!success) throw error;

        if (helps?.mutate) helps.mutate(() => [data, ...helps.list], false);

        return data;
    } catch (err) {
        showError(err, 'create_help');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@createHelp{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

export const rejectHelp = async (HelpID) => {
    const { helps } = globalState;

    try {
        const { success, error } = await mutateApi({
            name: 'helpsReject',
            params: {
                HelpID: String(HelpID)
            }
        });

        if (!success) throw error;

        if (helps?.mutate) {
            helps.mutate(
                (list) => list.filter((h) => String(h._id) !== String(HelpID)),
                false
            );
        }
    } catch (err) {
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@rejectHelp{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const closeHelp = async (HelpID) => {
    const { helps } = globalState;

    try {
        const { success, error } = await mutateApi({
            name: 'helpsClose',
            params: {
                HelpID: String(HelpID)
            }
        });

        if (!success) throw error;

        if (helps?.mutate) {
            helps.mutate(
                (list) => list?.filter((h) => String(h._id) !== String(HelpID)),
                false
            );
        }

        return HelpID;
    } catch (err) {
        console.log('closeHelp', err);
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@closeHelp{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
        throw err;
    }
};

export const createIndividualProposal = async (
    { Creator, Proposal }: ICreateProposal,
    conversationId: string
) => {
    const { helps, messages, user, conversations } = globalState;

    const req = {
        Creator,
        Proposal,
        CategoryID: user.MainCategory.CategoryID,
        Providers: [user._id],
        Type: 'proposal',
        Urgency: 'medium'
    };

    try {
        const { success, data, error } = await mutateApi({
            name: 'helpsCreate',
            params: req
        });

        if (!success) throw error;

        if (helps?.mutate) helps.mutate(() => [data, ...helps.list], false);

        const message = {
            ConversationID: conversationId,
            Message: 'Proposta individual',
            Sender: user._id,
            Type: 'proposal',
            Help: data._id,
            Status: 'sent',
            CreatedAt: data.CreatedAt,
            UpdatedAt: data.UpdatedAt
        };

        // add proposal message in conversation between users
        if (
            messages?.mutate &&
            String(messages.list[0]?.ConversationID) === String(conversationId)
        ) {
            messages.mutate(() => [message, ...messages.list], false);
        }

        if (conversations?.mutate)
            conversations.mutate(
                () =>
                    conversations?.list?.map((c) =>
                        String(c._id) === String(conversationId)
                            ? {
                                  ...c,
                                  LastMessage: {
                                      CreatedAt: message.CreatedAt,
                                      Sender: message.Sender,
                                      Message: message.Message
                                  }
                              }
                            : c
                    ),
                false
            );

        return data;
    } catch (err) {
        showError(err, 'create_help');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@createIndividualProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

export const createHelpProposal = async ({ HelpID, Proposal }) => {
    const req = {
        HelpID,
        ...Proposal
    };

    const { helps, user } = globalState;

    try {
        const { data, success, error } = await mutateApi({
            name: 'proposalsCreate',
            params: req
        });

        if (!success) throw error;

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.map((help) =>
                        help._id === HelpID
                            ? {
                                  ...help,
                                  ProviderStatus: 'proposal_sent',
                                  MyProposal: data._id,
                                  LastDate: new Date(),
                                  Recents: help.Recents
                                      ? [...help.Recents, user]
                                      : [user]
                              }
                            : help
                    ),
                false
            );

        return data;
    } catch (err) {
        showError(err, 'create_proposal');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@createHelpProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

export const updateHelpProposal = async ({
    Proposal,
    Urgency,
    HelpID
}: IUpdateHelpProposal) => {
    const { singleHelp, helps } = globalState;

    const req = {
        Urgency: Urgency,
        Type: 'proposal',
        Proposal,
        HelpID: String(HelpID)
    };

    try {
        const { success, data, error } = await mutateApi({
            name: 'helpsEditProposal',
            params: req
        });

        if (!success) throw error;

        const proposalToEdit = singleHelp.list[0];
        const updatedProposal = [
            {
                ...proposalToEdit,
                Proposal: { ...proposalToEdit.Proposal, ...Proposal }
            }
        ];
        singleHelp?.mutate(() => updatedProposal, false);

        helps?.mutate(
            () =>
                helps.list.map((h) =>
                    String(h._id) === String(HelpID) ? updatedProposal[0] : h
                ),
            false
        );

        return data;
    } catch (err) {
        showError(err, 'create_help');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@updateHelpProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

// read help
export const readHelp = async () => {
    const {
        singleHelp,
        helps,
        helpsProgress,
        hasUnreadFinished,
        hasUnreadHelps,
        user
    } = globalState;
    const help = singleHelp.list[0];

    try {
        await mutateApi({
            name: 'helpsRead',
            params: {
                HelpID: String(help._id)
            }
        });

        console.log('Provider Status', help.ProviderStatus);

        if (
            help.ProviderStatus === 'selected' ||
            help.ProviderStatus === 'finish_pending'
        ) {
            if (helpsProgress?.mutate)
                helpsProgress.mutate(
                    () =>
                        helpsProgress.list.map((h) =>
                            String(h._id) === String(help._id)
                                ? {
                                      ...h,
                                      Readers: [...help.Readers, user._id]
                                  }
                                : h
                        ),
                    false
                );

            if (hasUnreadFinished?.mutate)
                hasUnreadFinished.mutate(
                    () => [hasUnreadFinished.list[0] - 1],
                    false
                );
        } else {
            if (helps?.mutate)
                helps.mutate(
                    () =>
                        helps.list.map((h) =>
                            String(h._id) === String(help._id)
                                ? {
                                      ...h,
                                      Readers: [...help.Readers, user._id]
                                  }
                                : h
                        ),
                    false
                );

            if (hasUnreadHelps?.mutate)
                hasUnreadHelps.mutate(
                    () => [hasUnreadHelps.list[0] - 1],
                    false
                );
        }
    } catch (err) {
        console.error('readhelp', JSON.stringify(err));
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@readHelp{${new Date().toLocaleDateString('pt-BR')}}{${userName}}`
        );
        throw err;
    }
};

// handle accpeted or rejected received help
export const acceptOrRejectHelp = async (accepted: boolean) => {
    const { singleHelp, helps } = globalState;
    const helpId = singleHelp.list[0]._id;

    try {
        await mutateApi({
            name: accepted ? 'helpsAccept' : 'helpsReject',
            params: {
                HelpID: helpId
            }
        });

        const ProviderStatus = accepted ? 'accepted' : 'rejected';

        singleHelp.mutate(
            () => [
                {
                    ...singleHelp.list[0],
                    ProviderStatus
                }
            ],
            false
        );

        if (helps?.mutate)
            helps.mutate(() =>
                helps.list.map((h) =>
                    h._id === helpId
                        ? { ...h, ProviderStatus, LastDate: new Date() }
                        : h
                )
            );

        return;
    } catch (err) {
        showError(err, 'acceptOrRejectHelp');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@acceptOrRejectHelp{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};
// handle accpeted or rejected received help
export const acceptOrRejectIndividualHelp = async (accepted: boolean) => {
    const { singleHelp, helps } = globalState;

    const helpId = singleHelp.list[0]._id;

    try {
        await mutateApi({
            name: accepted ? 'helpsAcceptProposal' : 'helpsRejectProposal',
            params: {
                HelpID: helpId
            }
        });

        const Proposal = {
            ...singleHelp.list[0].Proposal,
            Status: accepted ? 'accepted' : 'rejected'
        };

        await singleHelp.mutate(
            () => [
                {
                    ...singleHelp.list[0],
                    Proposal: {
                        ...singleHelp.list[0].Proposal,
                        Proposal
                    }
                }
            ],
            false
        );

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.map((h) =>
                        String(h._id) === helpId
                            ? { ...h, Proposal, LastDate: new Date() }
                            : h
                    ),
                false
            );
    } catch (err) {
        console.log('@acceptOrRejectIndividualHelp', err);
        showError(err, 'acceptOrRejectIndividualHelp');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@acceptOrRejectIndividualHelp{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
        throw err;
    }
};

//finish help
export const finishHelp = async () => {
    const { singleHelp, user, helpsProgress } = globalState;

    const help = singleHelp.list[0];

    const creator = help?.Creator?._id || help?.Creator;
    const isMe = creator === user?._id;

    try {
        await mutateApi({
            name: 'helpsFinish',
            params: {
                HelpID: help._id
            }
        });

        // TODO: avoid mutate revalidating
        await singleHelp.mutate(
            () => [
                {
                    ...help,
                    ProviderStatus:
                        help.ProviderStatus === 'finish_pending'
                            ? 'finished'
                            : 'finish_confirmated'
                }
            ],
            isMe
        );

        if (help.ProviderStatus === 'finish_pending' && helpsProgress?.mutate)
            helpsProgress.mutate(
                () =>
                    helpsProgress.list.filter(
                        (h) => String(h._id) !== String(help._id)
                    ),
                false
            );

        return;
    } catch (err) {
        showError(err, 'finishHelp');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@finishHelp{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
//move help from 'Em Aberto' to 'Negócios Fechados'
export const moveHelpToDealDone = async () => {
    const {
        helps,
        proposal: ctxProposal,
        singleHelp,
        helpsProgress
    } = globalState;

    const help = singleHelp.list[0];

    if (helps?.mutate)
        helps?.mutate(
            () => helps.list.filter((h) => String(h._id) !== String(help._id)),
            false
        );

    const proposal =
        help.Type === 'proposal' ? help.Proposal : ctxProposal?.list[0];

    const updatedHelp = {
        ...help,
        Provider: proposal?.User,
        ProposalSelected: proposal?._id || undefined,
        ProviderStatus: 'selected',
        LastDate: new Date(),
        Readers: [help.Creator._id],
        Recents: []
    };

    singleHelp.mutate(() => [updatedHelp], false);

    if (helpsProgress?.mutate) {
        await helpsProgress.mutate(
            () => [updatedHelp, ...helpsProgress.list],
            false
        );
    }

    await readHelp();

    //if (hasUnreadFinished?.mutate) hasUnreadFinished.mutate();
};

// Proposal ---

export const getProposal = async (ProposalID: string) => {
    const {
        info: { isConnected }
    } = globalState;

    if (!isConnected) {
        throw new Error('not connected');
    }

    try {
        const { success, data, error } = await mutateApi({
            name: 'proposal',
            params: {
                ProposalID: String(ProposalID)
            }
        });

        if (!success) throw error;

        return data;
    } catch (err) {
        showError(err, 'Conversation');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@getProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const markProposalAsRead = async (ProposalID, HelpID) => {
    const { hasUnreadProposals, helps, user } = globalState;

    try {
        await mutateApi({
            name: 'proposalsRead',
            params: { ProposalID }
        });

        if (helps?.mutate)
            helps.mutate(
                () =>
                    helps.list.map((h) =>
                        h._id === HelpID
                            ? {
                                  ...h,
                                  UnreadProposals: h.UnreadProposals - 1
                              }
                            : h
                    ),
                false
            );

        const proposals = globalState['proposals' + String(HelpID)];

        if (proposals?.mutate)
            proposals.mutate(
                (list) =>
                    list.map((p) =>
                        p._id === ProposalID
                            ? {
                                  ...p,
                                  Status: 'read'
                              }
                            : p
                    ),
                false
            );

        if (hasUnreadProposals?.mutate)
            hasUnreadProposals.mutate(
                () => [hasUnreadProposals.list[0] - 1],
                false
            );

        return;
    } catch (err) {
        showError(err, 'read proposal');
        const userName = user?.Name || null;
        captureMessage(
            `@markProposalAsRead{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const markHelpProposalAsRead = async (HelpID) => {
    try {
        const { mutate, list } = globalState?.helps || {};

        if (mutate)
            mutate(
                () =>
                    list.map((h) =>
                        h._id === HelpID
                            ? {
                                  ...h,
                                  UnreadProposals: h.UnreadProposals - 1
                              }
                            : h
                    ),
                false
            );

        await mutateApi({
            name: 'helpsReadProposal',
            params: { HelpID }
        });
    } catch (err) {
        showError(err, 'read proposal');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@markHelpProposalAsRead{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

export const closeProposal = async ({ ProposalID, HelpID }) => {
    const {
        helps: { mutate, list },
        user
    } = globalState;

    try {
        mutate(
            () =>
                list.map((h) =>
                    h._id === HelpID
                        ? {
                              ...h,
                              Recents: h.Recents.filter(
                                  (r) => r._id !== user._id
                              ),
                              ProviderStatus: 'accepted'
                          }
                        : h
                ),
            false
        );

        const proposals = globalState['proposals' + String(HelpID)];

        if (proposals?.mutate) {
            proposals.mutate(
                (list) => list.filter((p) => p._id !== ProposalID),
                false
            );
        }

        await mutateApi({
            name: 'proposalClose',
            params: {
                ProposalID
            }
        });
    } catch (err) {
        console.log('closeProposal', err);
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@closeProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

type UpdateProposalType = Omit<IProposal, 'Status' | 'HelpID' | 'User'>;

export const updateProposal = async ({
    Proposal
}: {
    Proposal: UpdateProposalType;
}) => {
    const { proposal } = globalState;

    try {
        if (proposal?.mutate)
            proposal.mutate(
                () => [{ ...proposal.list[0], ...Proposal }],
                false
            );

        const { success, error } = await mutateApi({
            name: 'proposalEdit',
            params: Proposal
        });

        if (!success) throw error;
    } catch (err) {
        showError(err, 'updateProposal');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@updateProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};

//handle accpeted or rejected  proposal
export const acceptOrRejectProposal = async (accepted: boolean) => {
    const {
        proposal: { list, mutate }
    } = globalState;

    const proposal = list[0];

    try {
        await mutateApi({
            name: accepted ? 'proposalAccept' : 'proposalReject',
            params: { ProposalID: String(proposal._id) }
        });

        const Status = accepted ? 'accepted' : 'rejected';

        mutate(() => [{ ...proposal, Status }], false);

        const proposals = globalState['proposals' + String(proposal.HelpID)];

        if (proposals?.mutate)
            proposals.mutate(
                (list) =>
                    list.map((p) =>
                        String(proposal._id) === String(p._id)
                            ? {
                                  ...proposal,
                                  Status
                              }
                            : proposal
                    ),
                false
            );
    } catch (err) {
        showError(err, 'acceptOrRejectProposal');
        const userName = globalState?.user?.Name || null;
        captureMessage(
            `@acceptOrRejectProposal{${new Date().toLocaleDateString(
                'pt-BR'
            )}}{${userName}}`
        );
    }
};
