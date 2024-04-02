import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch(action.type) {
        case 'LOG_IN':
            return {
                user: action.payload
            }
        case 'LOG_OUT':
            return{
                user: null
            }
        case 'UPDATE_INFORMATION':
                return {
                  ...state, 
                  user: action.payload 
        }
        default:
            return state;
    }
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AuthReducer, {
        user: null
    })


    //to check if the localstorage has a user, to keep login or to keep logout
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user){
            dispatch({type: 'LOG_IN', payload: user});
        }    
    }, [])

    console.log('AuthContextState', state)
    
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}