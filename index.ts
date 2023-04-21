import { useMemo, useState, Ref, useEffect, useCallback } from "react";
import {
  InitusCreateNestFunction,
  InitusOptions,
  InitusRefLinkFunction,
  InitusRefObject,
} from "./types";
import useDebounce, { useDidMountEffect, useTrigger } from "./hooks";

interface InitusReturnType<T> {
  /**
   * Link input to instance
   * @param key
   * @param input
   */
  link: InitusRefLinkFunction;
  // createNest(key: string): void;
  read(): T;
}

export default function useInitus<T>(
  options?: InitusOptions<T>
): InitusReturnType<T> {
  const [inputRefs, setInputRefs] = useState<InitusRefObject[]>([]);
  const [nests, setNests] = useState();
  const [data, setData] = useState<T>({} as T);
  const debounceData = useDebounce(data);

  useDidMountEffect(() => {
    options?.autoSave?.save(data);
  }, [debounceData]);

  function onInputChange({ key, event }: { key: string; event: any }) {
    setData((prev) => ({ ...prev, [key]: event.target.value }));
  }

  const link: InitusRefLinkFunction = (input) => {
    setInputRefs((prev) => {
      const exists = prev.some((ref) => ref.key === input.key);
      if (exists) return prev;
      if (options?.autoSave) {
        input.ref.current.addEventListener("input", (event) =>
          onInputChange({ key: input.key, event })
        );
      }
      return [...prev, input];
    });
  };

  const read = () => data;

  //listener lifeCycles
  useEffect(() => {
    return () => {
      inputRefs.forEach(({ ref }) => {
        // ref.current.removeEventListener("input", onInputChange);
      });
    };
  }, []);

  return {
    link,
    read,
    // createNest,
  };
}
