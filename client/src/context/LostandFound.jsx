import { createContext, useReducer, useEffect } from "react";

export const LostandFoundContext = createContext();

export const LostandFoundReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEM":
      return {
        item: action.payload,
      };

    case "CREATE_ITEM":
      if(!Array.isArray(state.items)){
        console.error("Invalid")
        return {item: [action.payload, ...state.item]};
      }
     
    case "DELETE_ITEM":
      return {
        item: state.item.filter((i) => i._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const LostandFoundContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(LostandFoundReducer, {
    item: [],
  });

  return (
    <>
      <LostandFoundContext.Provider value={{ ...state, dispatch }}>
        {children}
      </LostandFoundContext.Provider>
    </>
  );
};
