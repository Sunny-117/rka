# Architecture Improvements Overview

This document highlights the key enhancements introduced in the updated `rkajs` implementation and how they offer a more robust developer experience compared to the previous version.

## 1. Stronger State Management Model

- **Deterministic lifecycle actions** – the reducer now understands four explicit action types (`CREATING`, `CREATED`, `REFRESHING`, `DROPPED`), replacing the implicit status mutations from the original version.
- **Strictly typed keep-alive map** – each cache entry now guarantees `reactElement`, `nodes`, and `status` fields, which eliminates the prevalence of `undefined` checks and makes the state transitions easier to reason about in TypeScript projects.
- **Programmatic lifecycle controls** – the provider exposes `register`, `refresh`, and `drop` APIs so consumers can opt into cache invalidation or refresh flows, enabling richer UI patterns.

## 2. Safer Context Consumption

- The `KeepAliveContext` is initialised with `null` and both `useKeepAlive` and `KeepAliveTransfer` guard against a missing provider, surfacing actionable errors during development instead of failing silently.
- The bundled `useKeepAlive` hook offers a typed, ergonomic entry point for interacting with the keep-alive runtime without manually importing the context object.

## 3. Leaner Rendering Path

- The transfer component memoises the wrapped element and only appends DOM nodes that are not already connected to the rendered container, preventing redundant DOM operations.
- The provider defers cache hydration until the host element is attached, avoiding the repeated creation side effects that existed in the previous `console.log` driven implementation.

## 4. Documentation & Example Alignment

- The README now reflects the expanded API surface, including usage guidance for the new `useKeepAlive` hook and action-based cache control.
- The example application demonstrates the new controls so developers can verify the behaviour in a realistic routing scenario.

Collectively, these changes make `rkajs` easier to integrate, more predictable under TypeScript, and ready for advanced cache management use cases.
