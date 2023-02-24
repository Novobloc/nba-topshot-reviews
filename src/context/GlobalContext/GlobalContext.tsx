import React, { useReducer, useContext } from "react";
import { GlobalReducer } from "./GlobalReducer";
import { initialState } from "./initialState";

export const GlobalContext = React.createContext(initialState);

export const GlobalProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  function setAppLoading(data: any) {
    dispatch({
      type: "SET_LOADING",
      payload: data
    });
  }

  const value = {
    ...state,
    setAppLoading
  };

  return <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>;
};

export const useGlobalContext = () => useContext(GlobalContext);
