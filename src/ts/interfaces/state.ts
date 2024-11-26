import { IConversation, IMessage } from '@ts/interfaces/chat';
import { IComment, IPost, ISocial, IStory } from '@ts/interfaces/social';
import { IUser, IUserSimpleOut } from '@ts/interfaces/user';
import { ICreateHelp, IHelp } from '@ts/interfaces/help';
import { ICategory } from '@ts/interfaces/categories';
import { IAsset } from '@ts/interfaces/media';
import { INotification } from '@ts/interfaces/notifications';
import { IRegister, IRegisterPro } from '@ts/interfaces/register';
import { ILocationCTX } from '@ts/interfaces/location';

export interface ISearch {
    location: any;
    nearProviders: any[];
    notFound: boolean;
    online: boolean;
    category: any;
    distance: number;
    loading: boolean;
    maxDistance: number;
    page: number;
    pagination: any;
    professionals: any[];
    review: boolean;
    subCategory: any;
}

export interface IInfo {
    isConnected: boolean;
    checkingAuth: boolean;
    firstAccess: boolean;
    onlineUsers: Array<string>;
}

interface IPostState {
    list: IPost[];
    mutate: Function;
}

export interface IToastMessage {
    id?: string;
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
    showProgress?: boolean;
    visibleTime?: number | null;
    action?: () => void;
    actionLabel?: string;
}

export interface IState {
    info?: IInfo;
    pendingMessages?: Array<IMessage>;
    categories?: ICategory[];
    categoriesTranportation?: {
        list: ICategory[];
        mutate: Function;
        loading?: boolean;
        fetched?: boolean;
    };
    categoriesPrimary?: {
        list: ICategory[];
        mutate: Function;
        loading?: boolean;
        fetched?: boolean;
    };
    categoriesSpecialty?: {
        list: ICategory[];
        mutate: Function;
        loading?: boolean;
        fetched?: boolean;
    };
    contacts?: {
        list?: [{ _id?: string }];
        loading?: boolean;
        fetched?: boolean;
    };
    conversations?: {
        list: IConversation[];
        mutate: Function;
        pagination: object;
    };
    conversation?: {
        list: IConversation[];
        mutate: Function;
        pagination: object;
    };
    createHelp?: ICreateHelp;
    createPost?: {
        edit: any;
        textareaOnFocus: any;
        showCamera: boolean;
        Images: Array<IAsset>;
        SmallImage?: string;
        Videos: Array<IAsset>;
        Text: string;
        Location: any;
        loading: boolean;
        suggestions: IUserSimpleOut[];
        isSuggestionsLoading: boolean;
        selection: any;
        Markeds: any[];
        info: any;
    };
    comments?: {
        list: IComment[];
        mutate: Function;
    };
    helpsProgress?: {
        list: IHelp[];
        mutate: Function;
    };
    hasUnreadMessages?: {
        list: [number];
        mutate: Function;
    };
    hasUnreadProposals?: {
        list: [number];
        mutate: Function;
    };
    hasUnreadFinished?: {
        list: [number];
        mutate: Function;
    };
    hasUnreadHelps?: {
        list: [number];
        mutate: Function;
    };
    helps?: {
        archiveds: IHelp[];
        create: any;
        list: IHelp[];
        mutate: Function;
    };
    location?: ILocationCTX;
    layout?: {
        boxConfirm: {
            title: string;
            confirm: () => void;
        } | null;
        toast: IToastMessage[];
    };
    nearProviders?: {
        list: IUser[];
        mutate: Function;
        pagination: object;
    };
    notifications?: {
        list: INotification[];
        mutate: Function;
        pagination: object;
    };
    social?: ISocial;
    postsList?: IPostState;
    post?: IPostState;
    postsUser?: IPostState;
    conversationsArchived?: {
        list: IConversation[];
        mutate: Function;
        pagination: object;
    };
    messages?: {
        list: IMessage[];
        mutate: Function;
        pagination: object;
    };
    stories?: {
        list: IStory[];
        mutate: Function;
        fetched: boolean;
        loading: boolean;
    };
    ratings?: any[];
    proposal?: {
        list: any[];
        mutate: Function;
    };
    singleHelp?: {
        list: any[];
        mutate: Function;
    };
    search?: ISearch;
    user?: IUser;
    profile?: {
        list: IUser[];
        mutate: Function;
        pagination: object;
    };
    register?: IRegister;
    registerPro?: IRegisterPro;
    unreadNotifications?: {
        list: [number];
        mutate: Function;
    };
}
