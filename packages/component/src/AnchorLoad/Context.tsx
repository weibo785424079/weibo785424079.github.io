import React from 'react';
import Exector from './Exector';

interface ContextType {
  load: (id: string) => void;
  loadNext: () => void;
  setExpand: (bool: boolean) => void;
  expand: boolean;
  exector: Exector;
}
export const AnchorLoadContext = React.createContext<ContextType>({} as ContextType);

export const AnchorLoadItemContext = React.createContext(null);
