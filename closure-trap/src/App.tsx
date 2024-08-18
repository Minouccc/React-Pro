import { useEffect, useState } from "react";

/* 
  现在 useEffect 的依赖数组是 []，也就是只会执行并保留第一次的 function
  而第一次的 function 引用了当时的 count，形成了闭包
  这就导致了每次执行定时器的时候，都是在 count = 0 的基础上加一
**/

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount(count + 1);
    }, 1000);
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
