import { FC, PropsWithChildren, useCallback, useReducer } from "react";
import * as actionTypes from "./actionTypes";
import { keepAliveReducer } from "./reducer";
import { KeepAliveContext, KeepAliveStateParams } from "./context";

const KeepAlive: FC<PropsWithChildren> = ({ children }) => {
  const [keepAliveStates, dispatch] = useReducer(
    keepAliveReducer,
    {},
    (state) => {
      return state;
    }
  );
  const setKeepAliveState = useCallback(
    ({ keepAliveId, reactElement }: KeepAliveStateParams) => {
      console.log(keepAliveStates, keepAliveId);
      if (!keepAliveStates[keepAliveId]) {
        dispatch({
          type: actionTypes.CREATING,
          payload: {
            keepAliveId,
            reactElement,
          },
        });
      }
    },
    [keepAliveStates]
  );

  return (
    <KeepAliveContext.Provider
      value={{ keepAliveStates, setKeepAliveState, dispatch }}
    >
      {children}
      {Object.values(keepAliveStates).map(({ keepAliveId, reactElement }) => {
        return (
          <div
            key={keepAliveId}
            ref={(node) => {
              if (node && !keepAliveStates[keepAliveId].nodes) {
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
      })}
    </KeepAliveContext.Provider>
  );
};

export { KeepAlive };
