"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var initus_package_exports = {};
__export(initus_package_exports, {
  default: () => useInitus
});
module.exports = __toCommonJS(initus_package_exports);
var import_react3 = require("react");

// hooks/index.ts
var import_react2 = require("react");

// hooks/useDidMountEffect.tsx
var import_react = require("react");
var useDidMountEffect = (func, deps) => {
  const didMount = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (didMount.current)
      func();
    else
      didMount.current = true;
  }, deps);
};

// hooks/index.ts
function useDebounce(value, delay = 2e3) {
  const [debouncedValue, setDebouncedValue] = (0, import_react2.useState)();
  (0, import_react2.useEffect)(() => {
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
  const [inputRefs, setInputRefs] = (0, import_react3.useState)([]);
  const [nests, setNests] = (0, import_react3.useState)();
  const [data, setData] = (0, import_react3.useState)({});
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
  (0, import_react3.useEffect)(() => {
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
