import { IUser } from '@ts/interfaces/user';

export interface ISendRating {
    NotificationID: string;
    Description: string;
    EvaluatedID: string;
    isProReview: boolean;
    Total: number;
    Agility: number;
    Cordiality: number;
    Price: number;
    Professionalism: number;
    Punctuality: number;
    Quality: number;
    Help: string;
}

export interface IRating {
    Title: string;
    Description: string;
    EvaluatorID: IUser;
    EvaluatedID: IUser;
    isProReview: boolean;
    CreatedAt: string;
    Agility: number;
    Cordiality: number;
    Price: number;
    Professionalism: number;
    Quality: number;
    Punctuality: number;
    Total: number;
}

export interface IRatingUser {
    Amount: number;
    Average: number;
    Last: IRating;
}
