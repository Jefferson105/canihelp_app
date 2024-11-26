export const SET_NAME = 'SET_NAME';
export const SET_USER = 'SET_USER';
export const SET_MESSAGE = 'SET_MESSAGE';

const creatEditInfo = (state, { type, data }) => {
    switch (type) {
        case SET_NAME:
            return {
                ...state,
                Name: data
            };

        case SET_USER:
            return {
                ...state,
                UserName: data
            };

        case SET_MESSAGE:
            return {
                ...state,
                Message: data
            };

        default:
            return state;
    }
};

export default creatEditInfo;
