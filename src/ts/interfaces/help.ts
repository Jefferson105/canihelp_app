import { CategoryGroupTypes } from '@ts/types/categories';
import { THelpUrgency, TProposalStatus } from '@ts/types/help';
import { IUser, IUserSimpleOut } from '@ts/interfaces/user';
import { ICategory } from '@ts/interfaces/categories';
import { IMessage } from '@ts/interfaces/chat';
import { ILocation } from '@ts/interfaces/location';

export interface IHelpTransport {
    Lat: number;
    Lon: number;
    Address: string;
    Reference?: string;
    ShortLocation?: string;
}

export interface ICreateHelp {
    Providers?: string[];
    CategoryID?: string;
    Description?: string;
    DisplayLocation?: string;
    Location?: {
        address: {
            City: string;
            Country: string;
            Neighborhood: string;
            PostCode: string;
            State: string;
            Street: string;
        };
        displayName: string;
        latitude: number;
        longitude: number;
    };
    Urgency?: THelpUrgency;
    Group?: CategoryGroupTypes;
    Type?: 'default' | 'proposal';
    Transport?: {
        Origin: IHelpTransport;
        Destiny: IHelpTransport;
    };
    SubCategories?: string[];
    Label?: string;
}

export interface IProposal {
    _id: string;
    Name: string;
    Description: string;
    Finish: Date;
    User: IUserSimpleOut;
    HelpID: string;
    Price: number;
    Status: TProposalStatus;
}

export interface ICreateProposal {
    Creator: string;
    Proposal: Omit<IProposal, '_id' | 'User' | 'HelpID' | 'Status'>;
    Transport?: {
        Origin: IHelpTransport;
        Destiny: IHelpTransport;
    };
}

export interface IHelp {
    _id: string;
    CategoryID: string;
    Category: ICategory;
    Readers: number;
    Read: boolean;
    CreatedAt: string;
    formatedTime?: string;
    Creator: IUserSimpleOut;
    Description: string;
    DisplayLocation: string;
    Location: ILocation;
    Messages: Array<IMessage>;
    Providers: Array<IUserSimpleOut> | string[];
    ShortLocation: string;
    UpdatedAt: string;
    LastDate: Date;
    Urgency: THelpUrgency;
    isClosed: boolean;
    Group: CategoryGroupTypes;
    Proposal?: Omit<IProposal, '_id'>;
    Transport?: {
        Origin: IHelpTransport;
        Destiny: IHelpTransport;
    };
    Recents?: IUser[];
    bottom?: any;
    UnreadProposals: number;
    Type: 'default' | 'proposal';
    Label: string;
}

export interface IProposal {
    _id: string;
    Name: string;
    Description: string;
    Finish: Date;
    User: IUserSimpleOut;
    HelpID: string;
    Price: number;
    Status: TProposalStatus;
}

export type IUpdateHelpProposal = {
    Urgency: THelpUrgency;
    Proposal: Omit<IProposal, '_id' | 'Status' | 'HelpID' | 'User'>;
    HelpID: string;
};
