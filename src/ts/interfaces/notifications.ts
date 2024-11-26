import { IUserSimpleOut } from '@ts/interfaces/user';
import { TNotificationTypes } from '@ts/types/notifications';

export interface IGetNotifications {
    page?: number;
    size?: number;
    next?: boolean;
}

export interface INotification {
    _id: string;
    CreatedAt: string;
    Text: string;
    Type: TNotificationTypes;
    Url: string;
    Viewed: boolean;
    Post: string | null;
    RatingID: string | null;
    Other: IUserSimpleOut;
    User: IUserSimpleOut;
    HelpID: string;
    ProposalID: string;
}
