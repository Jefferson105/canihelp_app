import { rootState } from '@context/state';

//UseRequest
const mockedRequestData = {
    list: jest.fn((arg = []) => arg),
    pagination: jest.fn(),
    mutate: jest.fn(),
    addPage: jest.fn(),
    error: jest.fn(),
    loading: jest.fn((arg = false) => arg),
    fetching: jest.fn(),
    page: jest.fn()
};

jest.mock('@hooks/request', () => {
    return jest.fn(() => ({
        data: {
            list: mockedRequestData?.list(),
            pagination: mockedRequestData?.pagination
        },
        mutate: jest.fn((args) => mockedRequestData?.mutate(args)),
        addPage: mockedRequestData?.addPage(),
        error: mockedRequestData?.error(),
        loading: mockedRequestData?.loading(),
        fetching: mockedRequestData?.fetching(),
        page: mockedRequestData?.page()
    }));
});

jest.mock('@hooks/request-archive-combine', () => {
    return jest.fn(() => ({
        data: {
            list: mockedRequestData?.list(),
            pagination: mockedRequestData?.pagination
        },
        mutate: jest.fn((args) => mockedRequestData?.mutate(args)),
        addPage: mockedRequestData?.addPage(),
        error: mockedRequestData?.error(),
        loading: mockedRequestData?.loading(),
        fetching: mockedRequestData?.fetching(),
        page: mockedRequestData?.page()
    }));
});

//UseDispatch
const mockedDispatch = jest.fn((fn) => fn);

//UseSelector
const mockedContext = {
    categories: jest.fn((arg = rootState.categories) => arg),
    conversations: jest.fn((arg = rootState.conversations) => arg),
    createPost: jest.fn((arg = rootState.createPost) => arg),
    post: jest.fn((arg = []) => arg),
    hasUnreadFinished: jest.fn((arg = { list: [] }) => arg),
    hasUnreadProposals: jest.fn((arg = { list: [] }) => arg),
    help: jest.fn((arg = rootState.createHelp) => arg),
    helps: jest.fn((arg = { list: [] }) => arg),
    helpsProgress: jest.fn((arg = rootState.helpsProgress) => arg),
    info: jest.fn(
        (
            arg = {
                isConnected: true
            }
        ) => arg
    ),
    layout: jest.fn(
        (
            arg = {
                boxConfirm: true
            }
        ) => arg
    ),
    location: jest.fn((arg = []) => arg),
    messages: jest.fn((arg = []) => arg),
    posts: jest.fn((arg = rootState.createPost) => arg),
    profile: jest.fn((arg = { list: [] }) => arg),
    proposal: jest.fn((arg = { list: [] }) => arg),
    proposals: jest.fn((arg = { list: [] }) => arg),
    register: jest.fn((arg = rootState.register) => arg),
    registerPro: jest.fn((arg = rootState.registerPro) => arg),
    search: jest.fn((arg = rootState.search) => arg),
    stories: jest.fn((arg = { list: [] }) => arg),
    postsList: jest.fn((arg = { list: [{ _id: 'fakeId' }] }) => arg),
    //verification: jest.fn((arg = rootState) => arg),
    user: jest.fn((arg = { _id: 'testeoctupus' }) => arg),
    unreadNotifications: jest.fn((arg = { _id: 'testeoctupus' }) => arg)
};

jest.mock('@context/index', () => {
    return {
        useSelector: jest.fn(() => {
            const state = {
                categories: mockedContext?.categories(),
                conversations: mockedContext?.conversations(),
                createPost: mockedContext?.createPost(),
                post: mockedContext?.post(),
                hasUnreadFinished: mockedContext?.hasUnreadFinished(),
                hasUnreadProposals: mockedContext?.hasUnreadProposals(),
                help: mockedContext?.help(),
                helps: mockedContext?.helps(),
                helpsProgress: mockedContext?.helpsProgress(),
                info: mockedContext?.info(),
                layout: mockedContext?.layout(),
                location: mockedContext?.location(),
                messages: mockedContext?.messages(),
                posts: mockedContext?.posts(),
                postsList: mockedContext?.postsList(),
                profile: mockedContext?.profile(),
                proposal: mockedContext?.proposal(),
                proposals: mockedContext?.proposals(),
                register: mockedContext?.register(),
                registerPro: mockedContext?.registerPro(),
                search: mockedContext?.search(),
                stories: mockedContext?.stories(),
                unreadNotifications: mockedContext?.unreadNotifications(),
                user: mockedContext?.user()
                //verification: mockedContext?.verification()
            };
            return state;
        }),
        useDispatch: jest.fn(() => mockedDispatch)
    };
});

export { mockedContext, mockedRequestData, mockedDispatch };
