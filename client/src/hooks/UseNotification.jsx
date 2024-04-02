import { NotificationContext } from "../context/NotificationContext";
import { useContext } from "react";

export const UseNotificationContext = () => {
    const context = useContext(NotificationContext);

    if(!context){
        throw Error("useNotificationContext must be used within a NotificationProvider")
    }

    return context;
}

