import { Button } from "antd";
import { useRef, useState } from "react";

/* 实现：不同请求，展示最新的结果 */

function App() {
  const requestPool = useRef<number>(0);
  const [data, setData] = useState<Array<number>>([]);
  const fetch = (num: number): Promise<Array<number>> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(
          Array(num)
            .fill({})
            .map((item, index) => {
              return index;
            })
        );
      }, num * 500);
    });
  };
  const getData = (num: number) => {
    requestPool.current += 1;
    const requestId = requestPool.current;
    fetch(num).then((res) => {
      if (requestId === requestPool.current) {
        setData(res);
      }
    });
  };
  return (
    <>
      <Button onClick={() => getData(3)}>request 3 datas</Button>
      <Button onClick={() => getData(6)}>request 6 datas</Button>
      <div>
        {data.map((item, index) => {
          return (
            <div key={index}>
              {item} - 列表数据 {item}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
