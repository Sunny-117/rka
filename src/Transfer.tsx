import { FC, useContext, useEffect, useMemo, useRef } from "react";

import { KeepAliveContext } from "./context";

const KeepAliveTransfer = <P extends Record<string, unknown>>(
  KeepAliveComponent: FC<P>,
  keepAliveId: string
) => {
  const displayName =
    KeepAliveComponent.displayName ||
    KeepAliveComponent.name ||
    "KeepAliveWrappedComponent";

  // WrapperComponent attaches the cached DOM fragment to whichever tree re-mounts it.
  const WrapperComponent: FC<P> = (props) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const context = useContext(KeepAliveContext);

    if (!context) {
      throw new Error("KeepAliveTransfer must be used within <KeepAlive>");
    }

    const { keepAliveStates, register } = context;

    const reactElement = useMemo(
      () => <KeepAliveComponent {...props} />,
      [props]
    );

    useEffect(() => {
      const state = keepAliveStates[keepAliveId];

      if (state?.nodes && containerRef.current) {
        // Re-parent cached DOM nodes into the live container without rerendering.
        state.nodes.forEach((node) => {
          if (containerRef.current && node.parentNode !== containerRef.current) {
            containerRef.current.appendChild(node);
          }
        });
      } else {
        // First mount: register the element so the provider can create and retain its nodes.
        register({
          keepAliveId,
          reactElement,
        });
      }
    }, [keepAliveStates, reactElement, register]);

    return <div ref={containerRef} />;
  };

  WrapperComponent.displayName = `KeepAliveTransfer(${displayName})`;

  return WrapperComponent;
};

export { KeepAliveTransfer };
