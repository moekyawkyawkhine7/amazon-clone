import { createContext, useReducer } from "react";
import { toast } from "react-hot-toast";
import { ADD_LOCAL_DATA_TO_BASKET, ADD_TO_BASKET, CLEAR_ALL_ITEMS, DESCREASE_ITEM_FROM_BASKET, INCREASE_ITEM_TO_BASKET, REMOVE_FROM_BASKET } from "../actionTypes";

export const BasketContext = createContext(null);

const initialState = {
    items: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case ADD_TO_BASKET:
            toast.success(`${action.payload.title} added to the basket.`);
            let findIndex = state.items.findIndex(_data => _data.id === action.payload.id);
            let addNewItem = [...state.items, { ...action.payload }]; // added new item
            let updateItemQty = state.items.map(_data => ( // changed item's qty if item is already existed
                _data.id === action.payload.id ? {
                    ..._data,
                    qty: _data.qty + action.payload.qty
                } : { ..._data }
            ));
            let modifiedItems = findIndex !== -1 ? updateItemQty : addNewItem;
            // store into localStorage
            localStorage.setItem("items", JSON.stringify(modifiedItems));
            return {
                items: [...modifiedItems]
            };
        case REMOVE_FROM_BASKET: {
            toast.success(`${state.items.filter(_data => _data.id === action.payload.id)[0].title} removed from the basket.`);
            let modifiedItems = state.items.filter(_data => _data.id !== action.payload.id);
            // remove item from localStorage
            localStorage.setItem("items", JSON.stringify(modifiedItems))
            return {
                items: [...modifiedItems]
            }
        }
        case INCREASE_ITEM_TO_BASKET: {
            let modifiedItems = state.items.map(_data => ( // increase item's qty
                _data.id === action.payload.id ? {
                    ..._data,
                    qty: _data.qty + 1
                } : { ..._data }
            ));
            // increase item's qty into localStorage
            localStorage.setItem("items", JSON.stringify(modifiedItems))
            return {
                items: [...modifiedItems]
            }
        }
        case DESCREASE_ITEM_FROM_BASKET: {
            let modifiedItems = state.items.map(_data => ( // descrease item's qty
                _data.id === action.payload.id ? {
                    ..._data,
                    qty: _data.qty - 1
                } : { ..._data }
            ));
            // decrease item's qty into localStorage
            localStorage.setItem("items", JSON.stringify(modifiedItems))
            return {
                items: [...modifiedItems]
            }
        }
        case ADD_LOCAL_DATA_TO_BASKET: {
            return {
                items: action.payload
            }
        }
        case CLEAR_ALL_ITEMS: {
            return {
                items: []
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
