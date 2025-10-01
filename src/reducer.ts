import * as actionTypes from "./actionTypes";
import { KeepAliveRegisterParams, KeepAliveStatesType } from "./context";

export type KeepAliveStateMap = Record<string, KeepAliveStatesType>;

type CreatingAction = {
  type: typeof actionTypes.CREATING;
  payload: KeepAliveRegisterParams;
};

type CreatedAction = {
  type: typeof actionTypes.CREATED;
  payload: { keepAliveId: string; nodes: ChildNode[] };
};

type RefreshingAction = {
  type: typeof actionTypes.REFRESHING;
  payload: { keepAliveId: string };
};

type DroppedAction = {
  type: typeof actionTypes.DROPPED;
  payload: { keepAliveId: string };
};

export type KeepAliveAction =
  | CreatingAction
  | CreatedAction
  | RefreshingAction
  | DroppedAction;

// keepAliveReducer centralises the lifecycle transitions for every cached subtree.
export function keepAliveReducer(
  state: KeepAliveStateMap,
  action: KeepAliveAction
): KeepAliveStateMap {
  switch (action.type) {
    case actionTypes.CREATING: {
      const { keepAliveId, reactElement } = action.payload;
      const existing = state[keepAliveId];
      const version = existing?.version ?? 0;

      // Preserve previously stored DOM nodes when re-registering the same key.
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement,
          status: actionTypes.CREATING,
          nodes: existing?.nodes ?? null,
          version,
        },
      };
    }
    case actionTypes.CREATED: {
      const { keepAliveId, nodes } = action.payload;
      const existing = state[keepAliveId];

      if (!existing) {
        return state;
      }

      // Cache the live DOM nodes so they can be moved back into place instantly when revisiting.
      return {
        ...state,
        [keepAliveId]: {
          ...existing,
          status: actionTypes.CREATED,
          nodes,
        },
      };
    }
    case actionTypes.REFRESHING: {
      const { keepAliveId } = action.payload;
      const existing = state[keepAliveId];

      if (!existing) {
        return state;
      }

      // Clearing nodes forces the component to render fresh content on the next mount.
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement: null,
          status: actionTypes.REFRESHING,
          nodes: null,
          version: existing.version + 1,
        },
      };
    }
    case actionTypes.DROPPED: {
      const { keepAliveId } = action.payload;

      const existing = state[keepAliveId];

      if (!existing) {
        return state;
      }

      // Marking as dropped clears the cache while bumping the version for the next activation.
      return {
        ...state,
        [keepAliveId]: {
          keepAliveId,
          reactElement: null,
          status: actionTypes.DROPPED,
          nodes: null,
          version: existing.version + 1,
        },
      };
    }
    default:
      return state;
  }
}