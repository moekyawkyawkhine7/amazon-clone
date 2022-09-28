import { createContext, useReducer } from "react";
import { ADD_TO_BASKET, DESCREASE_ITEM_FROM_BASKET, INCREASE_ITEM_TO_BASKET, REMOVE_FROM_BASKET } from "../actionTypes";

export const BasketContext = createContext(null);

const initialState = {
    items: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            let findIndex = state.items.findIndex(_data => _data.id === action.payload.id);
            return {
                items: findIndex !== -1 ? state.items.map(_data => ( // changed item's qty
                    _data.id === action.payload.id ? {
                        ..._data,
                        qty: _data.qty + action.payload.qty
                    } : { ..._data }
                )) : [...state.items, { ...action.payload }] // added new item
            };

        case REMOVE_FROM_BASKET: {
            return {
                items: state.items.filter(_data => _data.id !== action.payload.id)
            }
        }
        case INCREASE_ITEM_TO_BASKET: {
            return {
                items: state.items.map(_data => ( // increase item's qty
                    _data.id === action.payload.id ? {
                        ..._data,
                        qty: _data.qty + 1
                    } : { ..._data }
                ))
            }
        }
        case DESCREASE_ITEM_FROM_BASKET: {
            return {
                items: state.items.map(_data => ( // descrease item's qty
                    _data.id === action.payload.id ? {
                        ..._data,
                        qty: _data.qty - 1
                    } : { ..._data }
                ))
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
