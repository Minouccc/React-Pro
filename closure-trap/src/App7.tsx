import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

/* 
  App6 的 useInterval 没有返回 clean 函数，调用者不能停止定时器
  所以我们再加一个 ref 来保存 clean 函数，然后返回
**/

function useInterval(fn: Function, delay?: number | null) {
  const ref = useRef(fn);

  useLayoutEffect(() => {
    ref.current = fn;
  });

  const cleanUpFnRef = useRef<Function>();

  const clean = useCallback(() => {
    cleanUpFnRef.current?.();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => ref.current(), delay || 0);
    cleanUpFnRef.current = () => {
      clearInterval(timer);
    };
    return clean;
  }, []);

  return clean;
}

function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  const clearInterval = useInterval(updateCount, 1000);

  return (
    <>
      <div>{count}</div>
      <div onClick={clearInterval}>clear</div>
    </>
  );
}

export default App;
