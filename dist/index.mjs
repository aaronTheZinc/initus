var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// index.ts
import { useState as useState2, useEffect as useEffect3 } from "react";

// hooks/index.ts
import { useEffect as useEffect2, useState } from "react";

// hooks/useDidMountEffect.tsx
import { useEffect, useRef } from "react";
var useDidMountEffect = (func, deps) => {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current)
      func();
    else
      didMount.current = true;
  }, deps);
};

// hooks/index.ts
function useDebounce(value, delay = 2e3) {
  const [debouncedValue, setDebouncedValue] = useState();
  useEffect2(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value]);
  return debouncedValue;
}

// index.ts
function useInitus(options) {
  const [inputRefs, setInputRefs] = useState2([]);
  const [nests, setNests] = useState2();
  const [data, setData] = useState2({});
  const debounceData = useDebounce(data);
  useDidMountEffect(() => {
    var _a;
    (_a = options == null ? void 0 : options.autoSave) == null ? void 0 : _a.save(data);
  }, [debounceData]);
  function onInputChange({ key, event }) {
    setData((prev) => __spreadProps(__spreadValues({}, prev), { [key]: event.target.value }));
  }
  const link = (input) => {
    setInputRefs((prev) => {
      const exists = prev.some((ref) => ref.key === input.key);
      if (exists)
        return prev;
      if (options == null ? void 0 : options.autoSave) {
        input.ref.current.addEventListener(
          "input",
          (event) => onInputChange({ key: input.key, event })
        );
      }
      return [...prev, input];
    });
  };
  const read = () => data;
  useEffect3(() => {
    return () => {
      inputRefs.forEach(({ ref }) => {
      });
    };
  }, []);
  return {
    link,
    read
    // createNest,
  };
}
export {
  useInitus as default
};
