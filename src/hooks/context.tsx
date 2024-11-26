import React, { createContext, useContext } from 'react';

type reducerType = [unknown, Function];

export const StateContext = createContext<reducerType>([{}, Function]);

interface IProviderProps {
    reducer: reducerType;
    children: React.ReactElement;
}

export const StateProvider = ({ reducer, children }: IProviderProps) => (
    <StateContext.Provider value={reducer}>{children}</StateContext.Provider>
);

// eslint-disable-next-line react-hooks/rules-of-hooks
export const getState = (): any => useContext(StateContext);
