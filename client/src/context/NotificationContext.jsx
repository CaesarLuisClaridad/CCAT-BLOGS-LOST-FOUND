import { createContext, useReducer, useEffect } from "react";

export const NotificationContext = createContext();

export const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notifications: action.payload,
      };
    default: {
      return state;
    }
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, {
    notifications: [],
  });
 
  return (
    <>
      <NotificationContext.Provider value={{ ...state, dispatch }}>
        {children}
      </NotificationContext.Provider>
    </>
  );
};
