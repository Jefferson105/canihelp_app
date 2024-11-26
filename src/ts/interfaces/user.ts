import { ICategory, ICategoryPro } from '@ts/interfaces/categories';
import { IRatingUser } from '@ts/interfaces/ratings';
import { IAsset } from '@ts/interfaces/media';
import { ILocation } from '@ts/interfaces/location';

export interface IAddress {
    City: string;
    Complement?: string;
    Country: string;
    Neighborhood: string;
    Number?: number | string;
    PostCode: string;
    Show?: boolean;
    State: string;
    Street: string;
}

export interface ILike {
    LikedID: string;
}

export interface IContact {
    ContactID: string;
}

export interface IFollow {
    FollowID: string;
}

export interface IPortfolio {
    _id?: string;
    Url: string;
}

interface IUserBase {
    _id: string;
    Email: string;
    Name: string;
    Photo: string;
    UserName: string;
}

export interface IUserComplete extends IUserBase {
    Address: IAddress;
    AddressMobile?: string;
    Categories: Array<ICategoryPro>;
    Cellphones: Array<string>;
    Contacts: Array<IContact>;
    Email: string;
    Following: Array<IFollow>;
    Followers: Array<IFollow>;
    Likes: Array<ILike>;
    Liking: Array<ILike>;
    MainCategory: { CategoryID: string; Label: string; Name: string };
    Online?: boolean;
    Message: string;
    Portfolio: Array<IPortfolio>;
    Rating: IRatingUser;
    Services: Array<string>;
}

export interface IUserAuth extends IUserComplete {
    LocationFixed?: ILocation;
    LocationMobile?: ILocation;
    MailNotification?: {
        Cancelled: boolean;
    };
    PushToken: object;
    Token: string;
}

export interface IUser extends IUserComplete {
    Distance?: number;
    Image?: string;
    LocationSrc?: string;
    Views: number;
}

export interface IUserUpdate
    extends Partial<Omit<IUserAuth, 'Photo' | 'Categories'>> {
    Photo?: { Url?: string } & IAsset;
    Password?: string;
    Categories?: ICategoryPro[];
}

export interface IUserSimpleOut extends IUserBase {
    MainCategory: ICategory | null;
    Rating: number | null;
    Online: boolean;
    Categories: Array<ICategoryPro>;
}
