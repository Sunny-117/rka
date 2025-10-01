import { createContext, ReactElement } from "react";

import * as actionTypes from "./actionTypes";

// StatusType mirrors the reducer action phases so consumers can react to cache state if needed.
export type StatusType =
  | typeof actionTypes.CREATING
  | typeof actionTypes.CREATED
  | typeof actionTypes.REFRESHING
  | typeof actionTypes.DROPPED;

export interface KeepAliveStatesType {
  keepAliveId: string;
  reactElement: ReactElement | null;
  status: StatusType;
  nodes: ChildNode[] | null;
  version: number;
}

export interface KeepAliveRegisterParams {
  keepAliveId: string;
  reactElement: ReactElement;
}

export interface KeepAliveContextType {
  keepAliveStates: Record<string, KeepAliveStatesType>;
  register: (params: KeepAliveRegisterParams) => void;
  drop: (keepAliveId: string) => void;
  refresh: (keepAliveId: string) => void;
}

// The context starts as null so hooks can throw descriptive errors when misused outside the provider.
export const KeepAliveContext = createContext<KeepAliveContextType | null>(null);