import { createContext, useReducer } from "react";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "../actionTypes";

export const BasketContext = createContext(null);

const initialState = {
    items: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            return {
                items: [...state.items, { ...action.payload }]
            };

        case REMOVE_FROM_BASKET: {
            return {
                items: state.items.filter(_data => _data.id !== action.payload.id)
            }
        }
        default:
            return state;
    }
};

const BasketProvider = (props) => {
    const value = useReducer(reducer, initialState);
    return (
        <BasketContext.Provider value={value}>
            {props.children}
        </BasketContext.Provider>
    );
};

export default BasketProvider;
