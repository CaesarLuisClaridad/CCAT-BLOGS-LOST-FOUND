import { useContext } from "react";
import { BlogContext } from "../context/BlogContext";

export const UseBlogContext = () => {
    const context = useContext(BlogContext);

    if(!context){
        throw Error('UseBlogContext must use a inside a BlogContextProvider')
    }

    return context
}