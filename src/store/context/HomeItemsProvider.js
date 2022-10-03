import { createContext, useReducer } from "react";
import { FILTER_CAT, SET_ALL_ITEMS } from "../actionTypes";

export const HomeItemsContext = createContext(null);

const initialState = {
    items: [],
    oriItems: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_ALL_ITEMS:
            let productsData= action.payload.productsData;
            return {
                items: action.payload.searchData ? productsData.filter(_item => _item.title.toLowerCase().includes(action.payload.searchData.toLowerCase())) : productsData,
                oriItems: productsData
            };
        case FILTER_CAT: {
            let modifiedItems= [...state.oriItems];
            if(action.payload.cat !== "all")
                modifiedItems= modifiedItems.filter(_data => _data.category === action.payload.cat);
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
