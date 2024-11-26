import {
    SET_EDIT,
    SET_FOCUS,
    SET_CAMERA,
    SET_TEXT,
    SET_IMAGES,
    SET_VIDEOS,
    SET_POST_LOC,
    SET_LOADING,
    SET_SUGGESTIONS,
    SET_SUGGESTIONS_LOADING,
    SET_SELECTION,
    SET_MARKEDS,
    SET_INFO,
    ADD_MARKED,
    REMOVE_MARKED,
    SET_SMALL_IMAGE
} from '@context/types';

import { createPost as initialData } from '@context/state';

const createPost = (state = initialData, { type, data }) => {
    switch (type) {
        case SET_EDIT:
            return {
                ...state,
                edit: data
            };

        case SET_FOCUS:
            return {
                ...state,
                textareaOnFocus: data
            };
        case SET_CAMERA:
            return {
                ...state,
                showCamera: data
            };

        case SET_IMAGES:
            return {
                ...state,
                Images: data
            };

        case SET_SMALL_IMAGE:
            return {
                ...state,
                SmallImage: data
            };

        case SET_VIDEOS:
            return {
                ...state,
                Videos: data
            };

        case SET_TEXT:
            return {
                ...state,
                Text: data
            };

        case SET_POST_LOC:
            return {
                ...state,
                Location: data
            };

        case SET_LOADING:
            return {
                ...state,
                loading: data
            };

        case SET_SUGGESTIONS:
            return {
                ...state,
                suggestions: data
            };

        case SET_SUGGESTIONS_LOADING:
            return {
                ...state,
                isSuggestionsLoading: data
            };

        case SET_SELECTION:
            return {
                ...state,
                selection: data
            };

        case SET_MARKEDS:
            return {
                ...state,
                Markeds: data
            };

        case SET_INFO:
            return {
                ...state,
                info: data
            };

        case ADD_MARKED:
            return {
                ...state,
                Markeds: [...state.Markeds, data]
            };

        case REMOVE_MARKED:
            return {
                ...state,
                Markeds: state.Markeds.filter((m) => m.id !== data)
            };

        default:
            return state;
    }
};

export default createPost;
