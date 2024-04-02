import { createContext, useReducer, useEffect } from 'react';

export const BlogContext = createContext();

export const BlogReducer = (state, action) => {
    switch(action.type){
        case 'SET_BLOG':
            return {
                blogs: action.payload
            }
        case 'CREATE_BLOG':
            if (!Array.isArray(state.blogs)) {
                console.error('state.blogs is not an array:', state.blogs);
                return { ...state, blogs: [action.payload] }; // Reset to just the new blog
            }
            return {
                blogs: [action.payload, ...state.blogs]
            }
        case 'DELETE_BLOG':
            return{
                blogs: state.blogs.filter((b) => b._id !== action.payload._id)
            }
         case 'UPDATE_LIKES':
            return {
                blogs: state.blogs.map(blog => (blog._id === action.payload._id ? action.payload : blog))     
        }
        case 'UPDATE_BLOG':
            return {
                blogs: state.blogs.map(blog => (blog._id === action.payload._id ? action.payload : blog))
            }
        default: 
            return state
    }
}

export const BlogContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(BlogReducer, {
        blogs: []
    })

    return (
        <>
           <BlogContext.Provider value={{...state, dispatch}}>
                {children}
           </BlogContext.Provider>
        </>
    )
}