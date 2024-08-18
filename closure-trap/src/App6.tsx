import { useEffect, useLayoutEffect, useRef, useState } from "react";

/* 
  文档不建议直接在渲染过程中改 ref.current 
  在 useLayoutEffect 里更新 ref.current 的值，它是在 dom 操作完之后同步执行的，比 useEffect 更早
**/

function useInterval(fn: Function, delay?: number | null) {
  const callbackFn = useRef(fn);

  useLayoutEffect(() => {
    callbackFn.current = fn;
  });

  useEffect(() => {
    const timer = setInterval(() => callbackFn.current(), delay || 0);
    return () => clearInterval(timer);
  }, []);
}

function App() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };

  const updateCount2 = () => {
    setCount2(count2 + 1);
  };

  useInterval(updateCount, 1000);
  useInterval(updateCount2, 2000);

  return (
    <>
      <div>{count}</div>
      <div>{count2}</div>
    </>
  );
}

export default App;
