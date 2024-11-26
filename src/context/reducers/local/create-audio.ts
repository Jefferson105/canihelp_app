export const SET_CURRENT_TIME = 'SET_CURRENT_TIME';
export const SET_TOTAL_TIME = 'SET_TOTAL_TIME';
export const SET_SOUND = 'SET_SOUND';
export const SET_PAUSE = 'SET_PAUSE';
export const SET_LOADING = 'SET_LOADING';

export interface IAudioState {
    currentTime: number;
    totalTime: number;
    pause: boolean;
    loading: boolean;
}

const creatAudio = (state: IAudioState, { type, data }) => {
    switch (type) {
        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: data
            };

        case SET_TOTAL_TIME:
            return {
                ...state,
                totalTime: data
            };

        case SET_SOUND:
            return {
                ...state,
                sound: data
            };

        case SET_PAUSE:
            return {
                ...state,
                pause: data
            };

        case SET_LOADING:
            return {
                ...state,
                loading: data
            };

        default:
            return state;
    }
};

export default creatAudio;
