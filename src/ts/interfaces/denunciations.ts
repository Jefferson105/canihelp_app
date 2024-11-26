export interface IDenunciation {
    _id: string;
    SenderID: string;
    ReceiverID: string;
    Type: 'User' | 'Post';
    Title: string;
    Description: string;
    ResourceID: string;
    CreatedAt: Date;
}
