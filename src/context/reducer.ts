import { rootState } from '@context/state';
import { Logger } from '@services/logger';
import { IState } from '@ts/interfaces/state';

const logger = new Logger('Context');

export type ActionType =
    | Partial<IState>
    | ((state: IState) => Partial<IState>)
    | 'reset';

export default (state: IState = rootState, action: ActionType) => {
    if (typeof action === 'function') {
        const updatedFields = action(state);

        logger.log(`FIELDS = [${Object.keys(updatedFields).join(',')}]`);

        return {
            ...state,
            ...updatedFields
        };
    }

    if (typeof action === 'object' && Object?.keys(action)?.length) {
        logger.log(`FIELDS = [${Object.keys(action).join(',')}]`);
        return {
            ...state,
            ...Object(action)
        };
    }

    if (action === 'reset')
        return {
            ...rootState,
            info: {
                ...rootState.info,
                firstAccess: false,
                storageChecked: true
            },
            categories: state.categories
        };

    console.warn('Dispatch must receive a function, an object or a string');

    return state;
};
