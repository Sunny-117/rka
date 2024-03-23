import { FC, useContext, useEffect, useRef } from "react";
import { KeepAliveContext } from "./context";

const KeepAliveTransfer = (KeepAliveComponent: FC, keepAliveId: string) => {
  return function WrapperComponent(props: Record<string, unknown>) {
    const _ref = useRef<HTMLDivElement | null>(null);
    const { keepAliveStates, setKeepAliveState } = useContext(KeepAliveContext);

    useEffect(() => {
      const state = keepAliveStates[keepAliveId];
      if (state && state.nodes) {
        if (Array.isArray(state.nodes)) {
          state.nodes.forEach((node) => {
            if (_ref.current) {
              _ref.current.appendChild(node);
            }
          });
        }
      } else {
        setKeepAliveState({
          reactElement: <KeepAliveComponent {...props} />,
          keepAliveId,
        });
      }
    }, [keepAliveStates, props, setKeepAliveState]);
    return <div ref={_ref}></div>;
  };
};

export { KeepAliveTransfer };
