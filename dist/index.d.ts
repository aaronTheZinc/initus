import { MutableRefObject } from 'react';

interface InitusOptions<T> {
    autoSave?: {
        debounce: number;
        save(input: T): void;
    };
}
declare enum CastTypes {
    NUMBER = "number",
    STRING = "string"
}
interface InitusRefObject {
    key: string;
    ref: MutableRefObject<HTMLInputElement>;
    cast?: CastTypes;
}
type InitusRefLinkFunction = (input: InitusRefObject) => void;

interface InitusReturnType<T> {
    /**
     * Link input to instance
     * @param key
     * @param input
     */
    link: InitusRefLinkFunction;
    read(): T;
}
declare function useInitus<T>(options?: InitusOptions<T>): InitusReturnType<T>;

export { useInitus as default };
