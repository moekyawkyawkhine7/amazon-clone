import { createContext, useReducer } from "react";

export const ExampleContext = createContext(null);

const initialState = {
    title: "",
    description: ""
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TITLE":
            return {
                title: action.payload.title,
            };
        default:
            return state;
    }
};

const ExampleProvider = (props) => {
    const value = useReducer(reducer, initialState);
    return (
        <ExampleContext.Provider value={value}>
            {props.children}
        </ExampleContext.Provider>
    );
};

export default ExampleProvider;
