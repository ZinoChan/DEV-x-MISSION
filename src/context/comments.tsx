'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CommentsContextType {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentsContext = createContext<CommentsContextType | undefined>(
  undefined
);

interface CommentsContextProviderProps {
  children: ReactNode;
}

export const CommentsContextProvider: React.FC<
  CommentsContextProviderProps
> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <CommentsContext.Provider value={{ isOpen, setOpen }}>
      {children}
    </CommentsContext.Provider>
  );
};

export const useCommentsContext = (): CommentsContextType => {
  const context = useContext(CommentsContext);

  if (context === undefined) {
    throw new Error(
      'useCommentsContext must be used within a CommentsContextProvider'
    );
  }

  return context;
};
