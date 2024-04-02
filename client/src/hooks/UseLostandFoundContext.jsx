import { useContext } from "react";
import { LostandFoundContext } from "../context/LostandFound";

export const UseLostandFoundContext = () => {
    const context = useContext(LostandFoundContext);

    if(!context){
        throw Error('UseLostandFoundContext must use a inside a BlogContextProvider')
    }

    return context
}