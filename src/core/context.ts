import { Dispatch, ReactElement, createContext } from "react";

type StatusType = 'CREATING' | 'CREATED'

export interface KeepAliveStatesType {
    keepAliveId: string;
    reactElement?: ReactElement; // use to first render
    status?: StatusType;
    nodes?: null | ChildNode[]; // cache
}

export interface KeepAliveStateParams {
    keepAliveId: string;
    reactElement: ReactElement;
}
interface KeepAliveContextType {
    keepAliveStates: Record<string, KeepAliveStatesType>;
    setKeepAliveState: ({ keepAliveId, reactElement }: KeepAliveStateParams) => void
    dispatch: Dispatch<{
        type: StatusType;
        payload: KeepAliveStatesType
    }>
}
export const KeepAliveContext = createContext<KeepAliveContextType>({} as KeepAliveContextType)