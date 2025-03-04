import React, { createContext } from 'react';

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const [Token, setToken] = React.useState(undefined);

  const defaultContext = {
    Token,
    setToken,
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
};
