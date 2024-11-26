import { IState } from '@ts/interfaces/state';

export const blocks = {
    list: [],
    loading: false,
    fetched: false
};

export const categories = [];

export const chat = {
    list: [],
    archiveds: [],
    messages: [],
    new: null,
    fetched: false,
    loading: false,
    isSendingQueueMessages: false
};

export const contacts = {
    list: [],
    loading: false,
    fetched: false
};

export const createHelp = null;

export const createPost = {
    edit: null,
    textareaOnFocus: null,
    showCamera: null,
    Images: [],
    Videos: [],
    Text: '',
    Location: null,
    loading: null,
    suggestions: null,
    isSuggestionsLoading: false,
    selection: null,
    Markeds: [],
    info: null
};

export const help = {
    list: [],
    archiveds: []
};

export const info = {
    isConnected: true,
    onlineUsers: [],
    checkingAuth: true,
    firstAccess: true
};

export const pendingMessages = [];

export const location = {
    loading: true,
    notFound: false,
    from: null,
    coords: null
};

export const layout = {
    boxConfirm: null,
    boxReport: null,
    toast: []
};

export const notifications = {
    list: [],
    pagination: {}
};

export const social = {
    list: [],
    page: 0,
    distance: 50,
    next: true,
    location: null,
    filter: false,
    notification: false,
    help: false,
    from: 'default',
    category: null,
    hasNewPost: false,
    toTop: false
};

export const stories = {
    list: [],
    loading: false,
    fetched: false
};

export const profile = null;

export const ratings = {
    list: [],
    loading: false,
    lastSearch: null
};

export const register = null;

export const registerPro = {
    category: null,
    subs: [],
    specialties: [],
    tags: []
};

export const search = {
    category: null,
    subCategory: null,
    location: null,
    notFound: false,
    professionals: [],
    nearProviders: [],
    pagination: null,
    page: 0,
    distance: 50,
    maxDistance: 120,
    loading: false,
    online: false,
    review: false
};

export const user = null;

export const rootState: IState = {
    categories,
    createPost,
    createHelp,
    info,
    layout,
    social,
    pendingMessages,
    profile,
    register,
    registerPro,
    search,
    user
};
