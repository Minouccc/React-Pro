import { useCallback, useMemo, useRef, useState } from "react";

function App() {
  const [num, setNum] = useState<number>();

  // 保存dom引用 参数需要传null
  //   const ref = useRef<HTMLDivElement>(null);

  // 而保存别的内容的时候，不能传 null
  const ref = useRef<{ num: number }>();
  ref.current = { num: 2 };

  const fn = useCallback<() => number>(() => {
    return 666;
  }, []);

  const obj = useMemo<{ aaa: number }>(() => {
    return {
      aaa: 1,
    };
  }, []);

  return <div></div>;
}

export default App;
