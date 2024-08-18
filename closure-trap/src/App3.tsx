import { Reducer, useEffect, useReducer } from "react";

/* 
  和用 setState 传入函数的方案类似，还可以用 useReducer 来解决
  因为它是 dispatch 一个 action，不直接引用 state，所以也不会形成闭包
**/

interface Action {
  type: "add" | "minus";
  num: number;
}

function reducer(state: number, action: Action) {
  switch (action.type) {
    case "add":
      return state + action.num;
    case "minus":
      return state - action.num;
  }
}

function App() {
  const [count, dispatch] = useReducer<Reducer<number, Action>>(reducer, 0);

  useEffect(() => {
    setInterval(() => {
      dispatch({ type: "add", num: 1 });
    }, 1000);
  }, []);

  return (
    <>
      <div>{count}</div>
    </>
  );
}

export default App;
