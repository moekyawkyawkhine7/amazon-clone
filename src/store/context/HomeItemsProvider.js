import { createContext, useReducer } from "react";
import { SEARCH_DATA, SET_ALL_ITEMS } from "../actionTypes";

export const HomeItemsContext = createContext(null);

const initialState = {
    items: [],
    oriItems: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ALL_ITEMS:
            return {
                items: action.payload,
                oriItems: action.payload
            };
        case SEARCH_DATA: {
            let modifiedItems = state.oriItems.filter(_item => _item.title.toLowerCase().includes(action.payload.searchData.toLowerCase()));
            return {
                ...state,
                items: modifiedItems
            }
        }
        default:
            return state;
    }
};

const HomeItemsProvider = (props) => {
    const value = useReducer(reducer, initialState);
    return (
        <HomeItemsContext.Provider value={value}>
            {props.children}
        </HomeItemsContext.Provider>
    );
};

export default HomeItemsProvider;
