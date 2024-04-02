import { UseAuthContext } from "./UseAuthContext";
import { UseBlogContext } from "./UseBlogContext";
import { UseNotificationContext } from "./UseNotification";

export const UseLogout = () => {
    const { dispatch } = UseAuthContext();
    const {dispatch: Blogdispatch } = UseBlogContext();
    
    const logout = () => {
        localStorage.removeItem('user');
        
        dispatch({type: 'LOG_OUT'})
        Blogdispatch({type: 'SET_BLOG', payload: null})
       
    }

    return {logout}
}