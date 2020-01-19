import React, {createContext, useReducer} from 'react';

const context = createContext();

//context for storing the jwt token used for authentication
const ContextState = props => {
    const initialState = {
        token: null
    };

    const [state, dispatch] = useReducer((state, action) => {
        switch(action.type){
            case 'SET_TOKEN':
                return {
                    ...state,
                    token: action.payload
                };
            default:
                return state;
        }
    }, initialState);

    return (<context.Provider value={{
        token: state.token,
        setToken: (token) => {
            dispatch({type: 'SET_TOKEN', payload: token});
        }}
    }>
        {props.children}
        </context.Provider>)
};

export default ContextState;
export {context as Context};