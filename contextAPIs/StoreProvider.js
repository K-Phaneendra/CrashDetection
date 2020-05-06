import React, { createContext, useState, useEffect } from "react";
import { loginStatus } from "../constants/dataSets";
import { _retrieveData } from "../services/AsyncStorage";

export const Store = createContext();

const initialState = {
  currentLoginStatus: loginStatus.NOT_LOGGEDIN,
};

const StoreProvider = (props) => {
  const [state, setState] = useState(initialState);

  const setCurrentLoginStatus = (status) => {
    const stateClone = { ...state };
    stateClone.currentLoginStatus = status;
    setState(stateClone);
  };

  const stateManipulators = {
    setCurrentLoginStatus,
  };

  const checkIfUserLoggedIn = async () => {
    const loggedinUserId = await _retrieveData('userId')
    if (!loggedinUserId.isError && loggedinUserId.value !== null) {
      setCurrentLoginStatus(loginStatus.SUCCESS)
    } else {
      setCurrentLoginStatus(loginStatus.FAILED)
    }
  }

  useEffect(() => {
    checkIfUserLoggedIn()
  }, [])

  const providerValue = { ...state, ...stateManipulators };
  return (
    <Store.Provider value={providerValue}>
      {props.children}
    </Store.Provider>
  );
};

export default StoreProvider;
