export const SET_TOTAL = 'SET_TOTAL';
export const SET_DESC = 'SET_DESC';

const writeClientReviewReducer = (state, { type, data }) => {
    switch (type) {
        case SET_TOTAL:
            return {
                ...state,
                Total: data
            };

        case SET_DESC:
            return {
                ...state,
                Description: data
            };

        default:
            return state;
    }
};

export default writeClientReviewReducer;
