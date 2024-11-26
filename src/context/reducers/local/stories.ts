export const SET_INDEX = 'SET_INDEX';
export const SET_SLIDING = 'SET_SLIDING';
export const SET_LOADING_VIEW = 'SET_LOADING_VIEW';
export const SET_LOAD_IMAGE = 'SET_LOAD_IMAGE';
export const SET_REF = 'SET_REF';

const AStoriesReducer = (state, { type, data }) => {
    switch (type) {
        case SET_INDEX:
            return {
                ...state,
                activeIndex: data
            };

        case SET_SLIDING:
            return {
                ...state,
                isSliding: data
            };

        case SET_LOAD_IMAGE:
            return {
                ...state,
                imagesLoaded: [data, ...state.imagesLoaded]
            };

        case SET_LOADING_VIEW:
            return {
                ...state,
                loadingView: data
            };

        case SET_REF:
            return {
                ...state,
                listRef: data
            };

        default:
            return state;
    }
};

export default AStoriesReducer;
