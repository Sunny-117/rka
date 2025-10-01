import { useContext } from "react";

import { KeepAliveContext } from "./context";

// useKeepAlive exposes the provider controls while safeguarding against missing context.
export function useKeepAlive() {
  const context = useContext(KeepAliveContext);

  if (!context) {
    throw new Error("useKeepAlive must be used within <KeepAlive>");
  }

  return context;
}
