//Blocks
const mockedSetBlock = jest.fn();

jest.mock('@context/actions/blocks', () => {
    return {
        setBlock: jest.fn((args) => mockedSetBlock(args))
    };
});

//Categories
const mockedRelationSpecialty = jest.fn();
const mockedgetCategories = jest.fn();
const mockedSaveSpecialty = jest.fn();
const mockedSetCategory = jest.fn();

jest.mock('@context/actions/categories', () => {
    return {
        relationSpecialty: jest.fn((args) => mockedRelationSpecialty(args)),
        getCategories: jest.fn((args) => mockedgetCategories(args)),
        saveSpecialty: jest.fn((args) => mockedSaveSpecialty(args)),
        setCategory: jest.fn((args) => mockedSetCategory(args))
    };
});

//Chat
const mockedSendQueueMessages = jest.fn();
const mockedStoreQueueMessage = jest.fn();
const mockedRemoveQueueMessage = jest.fn();
const mockedSendMessageOffline = jest.fn();
const mockedSendMessage = jest.fn();
const mockedReadMessages = jest.fn();
const mockedArchiveConversation = jest.fn();
const mockedDeleteConversation = jest.fn();

jest.mock('@context/actions/chat', () => {
    return {
        sendQueueMessages: jest.fn((args) => mockedDeleteConversation(args)),
        storeQueueMessage: jest.fn((args) => mockedDeleteConversation(args)),
        removeQueueMessage: jest.fn((args) => mockedDeleteConversation(args)),
        sendMessageOffline: jest.fn((args) => mockedDeleteConversation(args)),
        sendMessage: jest.fn((args) => mockedDeleteConversation(args)),
        readMessages: jest.fn((args) => mockedDeleteConversation(args)),
        archiveConversation: jest.fn((args) => mockedDeleteConversation(args)),
        deleteConversation: jest.fn((args) => mockedDeleteConversation(args))
    };
});

//Contacts
const mockedToggleContact = jest.fn();

jest.mock('@context/actions/contacts', () => {
    return {
        toggleContact: jest.fn((args) => mockedToggleContact(args))
    };
});

//CreatePost
const mockedPublishPost = jest.fn();
const mockedCreatePost = jest.fn();
const mockedCameraOnClose = jest.fn();
const mockedOnAddVideo = jest.fn();
const mockedOnCameraCaptureImg = jest.fn();
const mockedOnCameraCaptureVideo = jest.fn();
const mockedOnAddAttach = jest.fn();
const mockedRemoveImage = jest.fn();
const mockedRemoveVideo = jest.fn();
const mockedCreateOption = jest.fn();
const mockedCreateOptionBody = jest.fn();
const mockedAddMark = jest.fn();
const mockedRemoveMark = jest.fn();

jest.mock('@context/actions/local/create-post', () => {
    return {
        createPost: jest.fn((args) => mockedCreatePost(args)),
        publishPost: jest.fn((args) => mockedPublishPost(args)),
        cameraOnClose: jest.fn((args) => mockedCameraOnClose(args)),
        onAddVideo: jest.fn((args) => mockedOnAddVideo(args)),
        onCameraCaptureImg: jest.fn((args) => mockedOnCameraCaptureImg(args)),
        onCameraCaptureVideo: jest.fn((args) =>
            mockedOnCameraCaptureVideo(args)
        ),
        onAddAttach: jest.fn((args) => mockedOnAddAttach(args)),
        removeImage: jest.fn((args) => mockedRemoveImage(args)),
        removeVideo: jest.fn((args) => mockedRemoveVideo(args)),
        createOption: jest.fn((args) => mockedCreateOption(args)),
        createOptionBody: jest.fn((args) => mockedCreateOptionBody(args)),
        addMark: jest.fn((args) => mockedAddMark(args)),
        removeMark: jest.fn((args) => mockedRemoveMark(args))
    };
});

//Help
const mockedCreateHelp = jest.fn();
const mockedRejectHelp = jest.fn();
const mockedCloseHelp = jest.fn();
const mockedCreateIndividualProposal = jest.fn();
const mockedCreateHelpProposal = jest.fn();
const mockedUpdateHelpProposal = jest.fn();
const mockedSetHelpData = jest.fn();
const mockedMarkProposalAsRead = jest.fn();
const mockedMarkHelpProposalAsRead = jest.fn();
const mockedCloseProposal = jest.fn();
const mockedUpdateProposal = jest.fn();

jest.mock('@context/actions/help', () => {
    return {
        createHelp: jest.fn((args) => mockedCreateHelp(args)),
        rejectHelp: jest.fn((args) => mockedRejectHelp(args)),
        closeHelp: jest.fn((args) => mockedCloseHelp(args)),
        createIndividualProposal: jest.fn((args) =>
            mockedCreateIndividualProposal(args)
        ),
        createHelpProposal: jest.fn((args) => mockedCreateHelpProposal(args)),
        updateHelpProposal: jest.fn((args) => mockedUpdateHelpProposal(args)),
        setHelpData: jest.fn((args) => mockedSetHelpData(args)),
        markProposalAsRead: jest.fn((args) => mockedMarkProposalAsRead(args)),
        markHelpProposalAsRead: jest.fn((args) =>
            mockedMarkHelpProposalAsRead(args)
        ),
        closeProposal: jest.fn((args) => mockedCloseProposal(args)),
        updateProposal: jest.fn((args) => mockedUpdateProposal(args))
    };
});

// Info
const mockedLogin = jest.fn();
const mockedMutateRealm = jest.fn();
const mockedMutateApi = jest.fn();
const mockedSetPushData = jest.fn();
const mockedRecoveryPassword = jest.fn();
const mockedLogout = jest.fn();

jest.mock('@context/actions/info', () => {
    return {
        login: jest.fn((args) => mockedLogin(args)),
        mutateApi: jest.fn((args) => mockedMutateApi(args)),
        setPushData: jest.fn((args) => mockedSetPushData(args)),
        logout: jest.fn((args) => mockedLogout(args)),
        mutateRealm: jest.fn((args) => mockedMutateRealm(args))
    };
});
//Layout
const mockedBoxConfirm = jest.fn();
const mockedBoxReport = jest.fn();
const mockedAddToast = jest.fn();
const mockedRemoveToast = jest.fn();

jest.mock('@context/actions/layout', () => {
    return {
        boxConfirm: jest.fn((args) => mockedBoxConfirm(args)),
        boxReport: jest.fn((args) => mockedBoxReport(args)),
        addToast: jest.fn((args) => mockedAddToast(args)),
        removeToast: jest.fn((args) => mockedRemoveToast(args))
    };
});

//Location
const mockedUpdateLocation = jest.fn();
const mockedSearchLocation = jest.fn();
const mockedWatchLocation = jest.fn();
const mockedUserGeoLocation = jest.fn();
const mockedGetFixedLocation = jest.fn();
const mockedGetUserLocation = jest.fn();

jest.mock('@context/actions/location', () => {
    return {
        updateLocation: jest.fn((args) => mockedUpdateLocation(args)),
        searchLocation: jest.fn((args) => mockedSearchLocation(args)),
        watchLocation: jest.fn((args) => mockedWatchLocation(args)),
        userGeoLocation: jest.fn((args) => mockedUserGeoLocation(args)),
        getFixedLocation: jest.fn((args) => mockedGetFixedLocation(args)),
        getUserLocation: jest.fn((args) => mockedGetUserLocation(args))
    };
});

//Profile
const mockedAddPortfolio = jest.fn();
const mockedRemovePortfolio = jest.fn();
const mockedFollowProfile = jest.fn();

jest.mock('@context/actions/profile', () => {
    return {
        addPortfolio: jest.fn((args) => mockedAddPortfolio(args)),
        removePortfolio: jest.fn((args) => mockedRemovePortfolio(args)),
        followProfile: jest.fn((args) => mockedFollowProfile(args))
    };
});

//Ratings
const mockedCreateRating = jest.fn();

jest.mock('@context/actions/ratings', () => {
    return {
        createRating: jest.fn((args) => mockedCreateRating(args))
    };
});

// Register
const mockedCheckEmail = jest.fn();
const mockedCheckUserName = jest.fn();
const mockedSendEmailToken = jest.fn();
const mockedCheckEmailToken = jest.fn();
const mockedUpdateRegister = jest.fn();
const mockedSendCellPhoneToken = jest.fn();
const mockedCheckCellPhoneToken = jest.fn();
const mockedRegisterUser = jest.fn();

jest.mock('@context/actions/register', () => {
    return {
        checkEmail: jest.fn((args) => mockedCheckEmail(args)),
        checkUsername: jest.fn((args) => mockedCheckUserName(args)),
        sendEmailToken: jest.fn((args) => mockedSendEmailToken(args)),
        checkEmailToken: jest.fn((args) => mockedCheckEmailToken(args)),
        updateRegister: jest.fn((args) => mockedUpdateRegister(args)),
        sendCellPhoneToken: jest.fn((args) => mockedSendCellPhoneToken(args)),
        checkCellPhoneToken: jest.fn((args) => mockedCheckCellPhoneToken(args)),
        registerUser: jest.fn((args) => mockedRegisterUser(args))
    };
});

//Social
const mockedsetPostsFilter = jest.fn();
const mockedgetPost = jest.fn();
const mockedpostsIterator = jest.fn();
const mockededitPost = jest.fn();
const mockeddeletePost = jest.fn();
const mockedlikePost = jest.fn();
const mockedhandleCommentsCounter = jest.fn();
const mockedcreateComment = jest.fn();
const mockeddeleteComment = jest.fn();
const mockededitComment = jest.fn();
const mockedviewStory = jest.fn();

jest.mock('@context/actions/social', () => {
    return {
        setPostsFilter: jest.fn((args) => mockedsetPostsFilter(args)),
        postsIterator: jest.fn((args) => mockedpostsIterator(args)),
        editPost: jest.fn((args) => mockededitPost(args)),
        deletePost: jest.fn((args) => mockeddeletePost(args)),
        likePost: jest.fn((args) => mockedlikePost(args)),
        handleCommentsCounter: jest.fn((args) =>
            mockedhandleCommentsCounter(args)
        ),
        createComment: jest.fn((args) => mockedcreateComment(args)),
        deleteComment: jest.fn((args) => mockeddeleteComment(args)),
        editComment: jest.fn((args) => mockededitComment(args)),
        viewStory: jest.fn((args) => mockedviewStory(args))
    };
});

//User
const mockedUpdateUser = jest.fn();
const mockedSearchUsers = jest.fn();

jest.mock('@context/actions/user', () => {
    return {
        updateUser: jest.fn((args) => mockedUpdateUser(args)),
        searchUsers: jest.fn((args) => mockedSearchUsers(args))
    };
});

export {
    mockedLogin,
    mockedMutateRealm,
    mockedCheckEmail,
    mockedCheckUserName,
    mockedSendEmailToken,
    mockedCheckEmailToken,
    mockedUpdateRegister,
    mockedSendCellPhoneToken,
    mockedCheckCellPhoneToken,
    mockedRegisterUser,
    mockedDeleteConversation,
    mockedSendQueueMessages,
    mockedStoreQueueMessage,
    mockedRemoveQueueMessage,
    mockedSendMessageOffline,
    mockedSendMessage,
    mockedReadMessages,
    mockedArchiveConversation,
    mockedSetBlock,
    mockedBoxConfirm,
    mockedBoxReport,
    mockedPublishPost,
    mockedCreatePost,
    mockedCameraOnClose,
    mockedOnAddVideo,
    mockedOnCameraCaptureImg,
    mockedOnCameraCaptureVideo,
    mockedOnAddAttach,
    mockedRemoveImage,
    mockedRemoveVideo,
    mockedCreateOption,
    mockedCreateOptionBody,
    mockedAddMark,
    mockedRemoveMark,
    mockedRelationSpecialty,
    mockedSearchUsers,
    mockedUpdateUser,
    mockedToggleContact,
    mockedCreateHelp,
    mockedRejectHelp,
    mockedCloseHelp,
    mockedCreateIndividualProposal,
    mockedCreateHelpProposal,
    mockedUpdateHelpProposal,
    mockedSetHelpData,
    mockedMarkProposalAsRead,
    mockedMarkHelpProposalAsRead,
    mockedCloseProposal,
    mockedUpdateProposal,
    mockedMutateApi,
    mockedSetPushData,
    mockedRecoveryPassword,
    mockedLogout,
    mockedAddToast,
    mockedRemoveToast,
    mockedgetCategories,
    mockedSaveSpecialty,
    mockedSetCategory,
    mockedUpdateLocation,
    mockedSearchLocation,
    mockedWatchLocation,
    mockedUserGeoLocation,
    mockedGetFixedLocation,
    mockedGetUserLocation,
    mockedAddPortfolio,
    mockedRemovePortfolio,
    mockedFollowProfile,
    mockedCreateRating,
    mockedgetPost,
    mockedpostsIterator,
    mockededitPost,
    mockeddeletePost,
    mockedlikePost,
    mockedhandleCommentsCounter,
    mockedcreateComment,
    mockeddeleteComment,
    mockededitComment,
    mockedviewStory,
    mockedsetPostsFilter
};
