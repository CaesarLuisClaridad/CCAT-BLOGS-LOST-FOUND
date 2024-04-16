import {useState} from 'react';
import { UseAuthContext } from './UseAuthContext';
import { toast } from 'react-hot-toast';

export const UseLogin = () => {
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = UseAuthContext();

    const login = async (email, password, username) => {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/user/login`, {
           method: 'POST',
           headers: {
            'Content-Type': 'application/json',
        },
           body: JSON.stringify({email, password, username})
        })

        const json = await response.json();

        if(!response.ok){
            setIsLoading(false);
            toast.error(json.error);
        }

        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type:'LOG_IN', payload: json});
            toast.success("Login successful");
            setIsLoading(false);
        }
    }
    return {login, isLoading};
 }