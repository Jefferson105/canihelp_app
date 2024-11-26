export const SET_VIEWABLES = 'SET_VIEWABLES';
export const SET_AUDIOS = 'SET_AUDIOS';
export const SET_EXPANDED_MEDIA = 'SET_EXPANDED_MEDIA';
export const SHOW_CAMERA = 'SHOW_CAMERA';
export const SHOW_PICKER = 'SHOW_PICKER';
export const SET_RECORDING = 'SET_RECORDING';
export const SET_REF = 'SET_REF';
export const SET_ID = 'SET_ID';
export const ADD_MESSAGE_LINES = 'ADD_MESSAGE_LINES';
export const FINISH_MESSAGES_LOADING = 'FINISH_MESSAGES_LOADING';

const AConversationReducer = (state, { type, data }) => {
    switch (type) {
        case SET_EXPANDED_MEDIA:
            return {
                ...state,
                expandedMedia: data
            };

        case SET_AUDIOS:
            return {
                ...state,
                audios: {
                    ...state.audios,
                    [data.url]: data.audio
                }
            };

        case SET_VIEWABLES:
            return {
                ...state,
                viewables: [
                    ...data.filter((id) => state.viewables.indexOf(id) === -1),
                    ...state.viewables
                ]
            };

        case SHOW_CAMERA:
            return {
                ...state,
                showCamera: data
            };

        case SHOW_PICKER:
            return {
                ...state,
                showPicker: data
            };

        case SET_RECORDING:
            return {
                ...state,
                recording: data
            };

        case SET_REF:
            return {
                ...state,
                ref: data
            };

        case SET_ID:
            return {
                ...state,
                id: data
            };

        case ADD_MESSAGE_LINES:
            return {
                ...state,
                messagesLines: {
                    ...state.messagesLines,
                    [data.id]: data.lines
                }
            };

        case FINISH_MESSAGES_LOADING:
            return {
                ...state,
                messagesFiniLoading: true
            };

        default:
            return state;
    }
};

export default AConversationReducer;
