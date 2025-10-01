import { FC, PropsWithChildren, useCallback, useMemo, useReducer } from "react";

import * as actionTypes from "./actionTypes";
import { keepAliveReducer, KeepAliveStateMap } from "./reducer";
import {
  KeepAliveContext,
  KeepAliveRegisterParams,
  KeepAliveStatesType,
} from "./context";

// KeepAlive provides the cache provider that records and renders preserved react subtrees.
const KeepAlive: FC<PropsWithChildren> = ({ children }) => {
  const [keepAliveStates, dispatch] = useReducer(
    keepAliveReducer,
    {} as KeepAliveStateMap
  );

  // register stores a react element definition so it can be rendered into the hidden cache container.
  const register = useCallback(
    ({ keepAliveId, reactElement }: KeepAliveRegisterParams) => {
      dispatch({
        type: actionTypes.CREATING,
        payload: {
          keepAliveId,
          reactElement,
        },
      });
    },
    []
  );

  // refresh clears cached nodes for a key so the component will render anew next time it mounts.
  const refresh = useCallback((keepAliveId: string) => {
    dispatch({
      type: actionTypes.REFRESHING,
      payload: { keepAliveId },
    });
  }, []);

  // drop completely removes the cached entry, freeing memory until the component is registered again.
  const drop = useCallback((keepAliveId: string) => {
    dispatch({
      type: actionTypes.DROPPED,
      payload: { keepAliveId },
    });
  }, []);

  const providerValue = useMemo(
    () => ({
      keepAliveStates,
      register,
      refresh,
      drop,
    }),
    [keepAliveStates, register, refresh, drop]
  );

  return (
    <KeepAliveContext.Provider value={providerValue}>
      {children}
      {Object.values(keepAliveStates).map(
        ({
          keepAliveId,
          reactElement,
          nodes,
          version,
        }: KeepAliveStatesType) => {
          if (!reactElement) {
            return null;
          }

          return (
            <div
              key={`${keepAliveId}-${version}`}
              ref={(node) => {
                // When the hidden container first mounts we collect its DOM nodes to re-use later.
                if (node && !nodes) {
                  dispatch({
                    type: actionTypes.CREATED,
                    payload: {
                      keepAliveId,
                      nodes: [...node.childNodes],
                    },
                  });
                }
              }}
            >
              {reactElement}
            </div>
          );
        }
      )}
    </KeepAliveContext.Provider>
  );
};

export { KeepAlive };
