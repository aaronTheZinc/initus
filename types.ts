import type { MutableRefObject, Ref, useRef } from "react";

export interface InitusOptions<T> {
  autoSave?: {
    debounce: number;
    save(input: T): void;
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
export interface TNest {
  linkNested: InitusRefLinkFunction;
}

export type InitusCreateNestFunction = (key: string) => TNest;
