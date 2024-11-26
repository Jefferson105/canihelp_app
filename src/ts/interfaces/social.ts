import { IUser, IUserSimpleOut } from '@ts/interfaces/user';
import { IAsset } from '@ts/interfaces/media';
import { IHelp } from '@ts/interfaces/help';

export interface ICreateComment {
    Text: string;
    PostID: string;
    Markeds: IUser[];
}

export interface IComment {
    _id: string;
    CreatedAt: string;
    Text: string;
    UpdatedAt: string;
    Markeds: string[];
    PostID: string;
    User: {
        _id: string;
        Email: string;
        MainCategory: {
            _id: string;
            Description: string;
            Name: string;
        };
        Name: string;
        Photo: string;
        Online: boolean;
        Rating: number;
        UserName: string;
        Verified: string;
    };
    Fake?: boolean;
}

export interface IPost {
    _id?: string;
    Address?: string;
    CheckIn?: boolean;
    Comments?: IComment[];
    CreatedAt?: string;
    Deleted?: boolean;
    Help?: {} | null;
    Images?: { Url: string }[];
    SmallImage?: string;
    Videos?: { Url: string }[];
    Likes?: {
        LikedID: string;
    };
    Location: {
        lat: string | number;
        lon: string | number;
    };
    Markeds?: string[];
    Readers?: number;
    Read?: boolean;
    Text?: string;
    UpdatedAt?: string;
    PostID: string;
}

export interface ICreatePost {
    Address?: string;
    Markeds?: string[];
    Text: string;
    SmallImage?: string;
    Images: Array<IAsset & { Url?: string }>;
    Videos: Array<IAsset & { Url?: string }>;
    Help: any;
    CheckIn: boolean;
    Location: {
        lat: string | number;
        lon: string | number;
    };
}

export interface IUpdatePost {
    PostID: string;
    Address?: string;
    Markeds?: string[];
    Text: string;
    Location: {
        lat: string | number;
        lon: string | number;
    };
}
export interface IEditComment {
    PostID: string;
    CommentID: string;
    Text: string;
    Markeds?: string[];
}

export interface IDeleteComment {
    PostID: string;
    CommentID: string;
    Text: string;
}

export interface IStory {
    _id: string;
    Comments: IComment[];
    Distance: null | number | string;
    Help: IHelp | null;
    Images: { Url: string }[];
    SmallImage: string | null;
    Likes: number;
    Liked: boolean;
    Location: {
        Lat: number;
        Lon: number;
    };
    Markeds?: string[];
    Readers?: number;
    Read?: boolean;
    Text: string;
    User: IUserSimpleOut;
    CreatedAt: string;
    UpdatedAt: string;
}

export interface ISocial {
    distance: number;
    filter: boolean;
    list: any[];
    location: any;
    next: boolean;
    notification: boolean;
    page: number;
    from: string;
    category: { _id: string; Name: string };
    help: boolean;
    hasNewPost: boolean;
    toTop: boolean;
}
