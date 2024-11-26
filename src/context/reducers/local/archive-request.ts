export const SET_DATA = 'SET_DATA';
export const ADD_PAGE = 'ADD_PAGE';
export const SET_LOADING = 'SET_LOADING';
export const SET_FETCHING = 'SET_FETCHING';
export const SET_ERROR = 'SET_ERROR';

const archiveReducer = (state, { type, data }) => {
    switch (type) {
        case SET_DATA:
            return {
                ...state,
                data
            };

        case ADD_PAGE:
            return {
                ...state,
                page: state.page + 1
            };

        case SET_LOADING:
            return {
                ...state,
                loading: data
            };

        case SET_FETCHING:
            return {
                ...state,
                fetching: data
            };

        case SET_ERROR:
            return {
                ...state,
                error: data
            };

        default:
            return state;
    }
};

export default archiveReducer;
