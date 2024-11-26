import { MessageStatus, MessageTypes } from '@ts/types/chat';
import { IAsset } from '@ts/interfaces/media';
import { IUserSimpleOut } from '@ts/interfaces/user';
import { IHelp } from '@ts/interfaces/help';

export interface ISendMessage {
    ConversationID: string;
    Message?: string;
    Type: MessageTypes;
    File?: IAsset;
    metadata?: {
        Duration: number;
        Size: number;
    };
    Mime?: string;
    Extension?: string;
    Reference?: {
        Type: string;
        ResourceID: string;
        Content: string;
    };
    SmallImage?: string;
}

export interface IStoreMessage {
    ConversationID: string;
    Message?: string;
    Type: MessageTypes;
    File?: any;
    MessageID: string;
}

export interface IMessageOffline {
    ConversationID: string;
    Message: string;
    Type: string;
    File?: string;
    MessageID: string;
}

export interface IMessage {
    _id?: string;
    ConversationID?: string;
    Message?: string;
    Sender?: string;
    Type?: MessageTypes;
    HelpID?: string;
    Status?: MessageStatus;
    CreatedAt?: string;
    UpdatedAt?: string;
    Extension?: string;
    Mime?: string;
    Url?: string;
    SmallImage?: string;
    metadata?: {
        Size?: number;
        Duration?: number;
    };
    formatedTime?: string;
    Help?: IHelp | null;
    Reference?: {
        Type: string;
        ResourceID: string;
        Content: string;
    };
}

export interface IConversation {
    _id: string;
    CreatedAt: string;
    LastMessage: IMessage | null;
    Unread: number;
    UpdatedAt: string;
    Messages: Array<IMessage>;
    Archived: Array<{
        UserID: string;
        Date: string;
    }>;
    Deleted: Array<{
        UserID: string;
        Date: string;
    }>;
    Participants: Array<IUserSimpleOut | null>;
}
