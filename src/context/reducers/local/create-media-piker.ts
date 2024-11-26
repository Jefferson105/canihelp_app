import { IAsset } from '@services/media';

export const SET_PICK = 'SET_PICK';
export const SET_PICKED = 'SET_PICKED';
export const SET_PHOTOS = 'SET_PHOTOS';
export const REMOVE_PICKED = 'REMOVE_PICKED';
export const PICKS_LOADING = 'PICKS_LOADING';
export const SET_PAGINATION = 'SET_PAGINATION';
export const SET_VIEWABLES = 'SET_VIEWABLES';
export const SET_ALBUNS = 'SET_ALBUNS';
export const MAX_ASSET_SIZE = 120000000;
//const MAX_VIDEO_DURATION_SECONDS = 120;

export interface IPicks {
    List: IAsset[] | { name: string; press?: boolean }[];
    PicksList: IAsset[];
    Pagination: {
        page: number;
        size: number;
        next: boolean;
    };
    viewables: string[];
    loading: boolean;
    albuns: string[];
}

const creatMediaPiker = (state: IPicks, { type, data }) => {
    switch (type) {
        case SET_PHOTOS:
            return {
                ...state,
                List: data
            };

        case SET_PICK:
            return {
                ...state,
                List: state.List.map((p) => {
                    if (p.name === data.name)
                        return {
                            ...p,
                            picked: data.picked ? true : false
                        };
                    else return p;
                })
            };

        case SET_PICKED:
            return {
                ...state,
                PicksList: [...state.PicksList, ...data]
            };

        case REMOVE_PICKED:
            return {
                ...state,
                PicksList: state.PicksList.filter(
                    (item) => item.name !== data.name
                )
            };

        case PICKS_LOADING:
            return {
                ...state,
                loading: data
            };

        case SET_PAGINATION:
            return {
                ...state,
                Pagination: {
                    ...state.Pagination,
                    ...data
                }
            };

        case SET_VIEWABLES:
            return {
                ...state,
                viewables: data
            };

        case SET_ALBUNS:
            return {
                ...state,
                albuns: data
            };

        default:
            return state;
    }
};

export default creatMediaPiker;
