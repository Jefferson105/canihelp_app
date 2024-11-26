import { CategoryGroupTypes } from '@ts/types/categories';

export interface ICategory {
    _id: string;
    Active: boolean;
    AncestralID: string;
    Level: number;
    ParentID: string;
    Name: string;
    Description: string;
    Type: string;
    self: boolean;
    Search: number;
    Label?: string;
    similars: Array<string>;
    Group: CategoryGroupTypes;
    Styles: {
        BgColor?: string;
        Color?: string;
        Icon?: string;
    };
}

export interface ICategoryPro {
    IsPrimary: boolean;
    Category: ICategory;
    Label?: string;
}

export interface ICategoryProRaw {
    IsPrimary: boolean;
    CategoryID: string;
    Label?: string;
}
