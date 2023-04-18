import type { MutableRefObject, Ref, useRef } from "react";

export interface InitusOptions<T> {
  autoSave?: {
    debounce: number;
    save(input: T);
  };
}

export enum CastTypes {
  NUMBER = "number",
  STRING = "string",
}

export interface InitusRefObject {
  key: string;
  ref: MutableRefObject<HTMLInputElement>;
  cast?: CastTypes;
}
export type InitusRefLinkFunction = (input: InitusRefObject) => void;
