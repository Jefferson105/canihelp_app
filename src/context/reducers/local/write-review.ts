export const SET_PROF = 'SET_PROF';
export const SET_QUAL = 'SET_QUAL';
export const SET_AGI = 'SET_AGI';
export const SET_PUNC = 'SET_PUNC';
export const SET_CORD = 'SET_CORD';
export const SET_PRICE = 'SET_PRICE';
export const SET_TITLE = 'SET_TITLE';
export const SET_DESC = 'SET_DESC';

const writeReviewReducer = (
    state,
    { type, data }: { type; data: number | string }
) => {
    switch (type) {
        case SET_PROF:
            return {
                ...state,
                Professionalism: data
            };

        case SET_QUAL:
            return {
                ...state,
                Quality: data
            };

        case SET_AGI:
            return {
                ...state,
                Agility: data
            };

        case SET_PUNC:
            return {
                ...state,
                Punctuality: data
            };

        case SET_CORD:
            return {
                ...state,
                Cordiality: data
            };

        case SET_PRICE:
            return {
                ...state,
                Price: data
            };

        case SET_TITLE:
            return {
                ...state,
                Title: data
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

export default writeReviewReducer;
