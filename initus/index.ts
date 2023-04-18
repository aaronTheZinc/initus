import { useMemo, useState, Ref, useEffect, useCallback } from "react";
import { InitusOptions, InitusRefLinkFunction, InitusRefObject } from "./types";
import useDebounce, { useTrigger } from "./debounce";

interface InitusReturnType<T> {
  /**
   * Link input to instance
   * @param key
   * @param input
   */
  link: InitusRefLinkFunction;
  read(): T;
}

export default function useInitus<T>(
  options?: InitusOptions<T>
): InitusReturnType<T> {
  const [inputRefs, setInputRefs] = useState<InitusRefObject[]>([]);

  const handleAutosave = useCallback((data) => {
    options?.autoSave?.save(data);
  }, []);

  const { sendSignal } = useTrigger(
    handleAutosave,
    options?.autoSave?.debounce
  );

  const link: InitusRefLinkFunction = useCallback(
    (input) => {
      setInputRefs((prev) => {
        const exists = prev.some((ref) => ref.key === input.key);
        if (exists) return prev;
        if (options.autoSave) {
          input.ref.current.addEventListener("input", function () {
            const data = read();
            console.log(data);
          });
        }
        return [...prev, input];
      });
    },
    [inputRefs]
  );

  const read = useCallback(() => {
    return inputRefs.reduce(
      (prev, next) => {
        return { ...prev, [next.key]: next.ref.current.value };
      },
      { default: true }
    ) as T;
  }, [inputRefs]);

  //listener lifeCycles
  useEffect(() => {
    return () => {
      inputRefs.forEach(({ ref }) => {
        ref.current.removeEventListener("input", sendSignal);
      });
    };
  }, []);

  return {
    link,
    read,
  };
}
