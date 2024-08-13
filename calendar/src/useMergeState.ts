import {
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

function useMergeState<T>(
  defaultStateValue: T,
  props?: {
    defaultValue?: T;
    value?: T;
    onChange?: (value: T) => void;
  }
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const { defaultValue, value: propsValue, onChange } = props || {};

  const isFirstRender = useRef(true);

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      // 受控组件
      return propsValue!;
    } else if (defaultValue !== undefined) {
      // 非受控组件
      return defaultValue!;
    } else {
      // 当 propsValue 和 defaultValue(即props用户没传)
      return defaultStateValue;
    }
  });

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!);
    }

    isFirstRender.current = false;
  }, [propsValue]);

  const mergedValue = propsValue === undefined ? stateValue : propsValue;

  function isFunction(value: unknown): value is Function {
    return typeof value === "function";
  }

  const setState = useCallback(
    (value: SetStateAction<T>) => {
      let res = isFunction(value) ? value(stateValue) : value;

      if (propsValue === undefined) {
        setStateValue(res);
      }
      onChange?.(res);
    },
    [stateValue]
  );

  return [mergedValue, setState];
}
