import { IUser } from '@ts/interfaces/user';

export type AppRootParamList = {
    FirstStep: {};
    SecondStep: {};
    ThirdStep: {};
    Categories: { next: string };
    Account: {};
    DeleteAccount: {};
    ArchivedMessages: {};
    AddressProof: {};
    Blocks: {};
    Home: {};
    Help: {};
    CategorieResult: { search: string; edit?: boolean };
    CellPhoneValidation: { registerId: string; next?: string };
    ChangePassword: {};
    CreateProposal: {
        UserID?: string | boolean;
        goHelp?: boolean;
        HelpID?: string | false;
        fromChat?: boolean;
        ConversationID?: string;
        ProposalID?: string;
        isEdit?: boolean;
        Desc?: string;
        isIndividual?: boolean;
    };
    CreatePost: {
        edit?: string;
        type?: string | null;
        search?: boolean;
    };
    Cnpj: {};
    Contacts: {};
    Contract: {};
    Conversation: {
        archived?: boolean;
        isHelp?: boolean;
        user?: IUser;
        id?: string | null;
        chatUser?: string;
        postId?: string;
        description?: string;
        from?: string;
    };
    Conversations: {};
    EmailTokenValidation: {
        isPassword?: boolean;
        registerId: string;
        next?: string;
        Email?: string;
        UserId?: string;
    };
    EditProfile: {
        type?: string;
    };
    FinalVerification: {};
    Helps: {};
    HelpArchive: {};
    HelpFull: { helpID: string; goHelp?: boolean };
    HelpReceived: {
        HelpID?: string;
    };
    HomeStack: {};
    Location: {
        next?: string;
        pass?: any;
    };
    LocationNotFound: {
        next?: string;
    };
    Login: { next?: string };
    MultiProHelp: { filter?: number };
    Notifications: {};
    Notification: {};
    Post: {
        post?: string;
        full?: boolean;
        from?: string;
    };
    Profile: { user?: string };
    Social: {};
    Proposal: {
        from?: string;
        status?: string;
        helpID?: string | object;
        goHelp?: boolean;
        isNew?: boolean;
        proposalID?: string | object;
    };
    ProviderService: {
        edit?: boolean;
    };
    ProviderKeyWord: {
        edit?: boolean;
        skiped?: boolean;
    };
    ProServiceProviders: {};
    Privacy: {};
    Ratings: { user?: string };
    RecoveryPassword: { tokenChecked?: boolean };
    SaveCategories: {};
    SaveLocation: {
        edit?: number;
    };
    SelectEspc: {
        edit?: boolean;
    };
    SearchResult: {};
    SearchKeyWord: { edit: boolean };
    SignUp: { next?: string };
    SignUpCellPhone: { registerId: string; next?: string };
    Stories: { storyId?: string };
    TransportationProHelp: {
        CategoryID?: string;
        filter?: number;
        search?: boolean;
    };
    WriteReview: {
        ProfileID?: string;
        RatingID?: string;
        helpID?: string | object;
    };
    WriteClientReview: {
        ProfileID?: string;
        RatingID?: string;
        helpID?: string | object;
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends AppRootParamList {}
    }
}
