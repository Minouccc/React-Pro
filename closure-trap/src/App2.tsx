import { useEffect, useState } from "react";

/* 
  这次并没有形成闭包，每次的 count 都是参数传入的上一次的 state
**/

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
