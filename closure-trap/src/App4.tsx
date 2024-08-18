import { useEffect, useState } from "react";

/* 
  但有的时候，是必须要用到 state 的，也就是肯定会形成闭包
  比如这里，console.log 的 count 就用到了外面的 count，形成了闭包，但又不能把它挪到 setState 里去写
  依赖数组加上了 count，这样 count 变化的时候重新执行 effect，那执行的函数引用的就是最新的 count 值
  这种解法是能解决闭包陷阱的，但在这里并不合适
  因为 effect 里跑的是定时器，每次都重新跑定时器，那定时器就不是每 1s 执行一次了
**/

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(count);
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, [count]);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
