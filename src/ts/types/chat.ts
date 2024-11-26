export type MessageTypes =
    | 'message'
    | 'audio'
    | 'image'
    | 'file'
    | 'video'
    | 'file'
    | 'help'
    | 'proposal'
    | 'automatic';

const MESSAGE_STATUS_ARRAY = ['pending', 'sent', 'received', 'read'] as const;

export type MessageStatus = (typeof MESSAGE_STATUS_ARRAY)[number];
