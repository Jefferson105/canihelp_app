import { joinNumberInput } from '@utils/currency';

export const ADD_SERVICE = 'ADD_SERVICE';
export const DELETE_SERVICE = 'DELETE_SERVICE';
export const NAME_SERVICE = 'NAME_SERVICE';
export const PRICE_SERVICE = 'PRICE_SERVICE';

const creatEditService = (state, { type, data }) => {
    const Services = state.Services;

    switch (type) {
        case ADD_SERVICE:
            return {
                ...state,
                Services: [
                    ...state.Services,
                    {
                        Name: '',
                        Price: 0
                    }
                ]
            };

        case DELETE_SERVICE:
            return {
                ...state,
                Services: state.Services.filter((_, i) => i !== data)
            };

        case NAME_SERVICE:
            Services[data.index].Name = data.name;

            return {
                ...state,
                Services
            };

        case PRICE_SERVICE:
            const val = joinNumberInput(String(data.price));

            if (val.length > 9) return state;

            Services[data.index].Price = val;

            return {
                ...state,
                Services
            };

        default:
            return state;
    }
};

export default creatEditService;
