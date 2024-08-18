import { useEffect, useRef, useState } from "react";

/* 
  通过 useRef 创建 ref 对象，保存执行的函数，每次渲染更新 ref.current 的值为最新函数。
  这样，定时器执行的函数里就始终引用的是最新的 count。

  useEffect 只跑一次，保证 setIntervel 不会重置，是每秒执行一次。
  执行的函数是从 ref.current 取的，这个函数每次渲染都会更新，引用着最新的 count。
**/

function App() {
  const [count, setCount] = useState(0);

  const updateCount = () => {
    setCount(count + 1);
  };
  const ref = useRef(updateCount);
  ref.current = updateCount;

  useEffect(() => {
    const timer = setInterval(() => {
      ref.current();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
