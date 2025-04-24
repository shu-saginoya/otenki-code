export const cursorMap = {
  auto: "cursor-auto",
  default: "cursor-default",
  none: "cursor-none",
  "context-menu": "cursor-context-menu",
  help: "cursor-help",
  pointer: "cursor-pointer",
  progress: "cursor-progress",
  wait: "cursor-wait",
  text: "cursor-text",
  move: "cursor-move",
  notAllowed: "cursor-not-allowed",
} as const;

export type Cursor = keyof typeof cursorMap;

export const pointerEventsMap = {
  auto: "pointer-events-auto",
  none: "pointer-events-none",
} as const;

export type PointerEvents = keyof typeof pointerEventsMap;
