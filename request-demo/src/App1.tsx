import React from "react";
import { Button } from "antd";

/* 不同请求，并发请求 */

const App: React.FC = () => {
  const fetch = (num: number): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(num);
      }, 1000 + (num % 2 === 0 ? 2000 : 0));
    });
  };

  // requestQueue 函数，限制并发数量
  const requestQueue = (concurrency: number) => {
    return (urls: Array<() => Promise<number>>): Promise<number[]> => {
      let result: number[] = []; // 存储所有请求的结果
      let curIndex = 0; // 请求的下标
      let activeCount = 0; // 当前活跃请求的计数

      return new Promise((resolve, reject) => {
        const dequeue = () => {
          if (curIndex >= urls.length) return;

          const index = curIndex; // 保留当前的索引
          const url = urls[curIndex];
          curIndex++; // 在这里递增

          activeCount++;
          url()
            .then((data) => {
              console.log(data, "data");
              result[index] = data;
            })
            .finally(() => {
              activeCount--;
              if (curIndex < urls.length) {
                // url未请求完，继续下一个请求
                dequeue();
              }
              if (activeCount === 0) {
                // 无活跃请求，表明所有请求都已结束，返回结果
                resolve(result);
              }
            });
        };

        while (curIndex < urls.length && activeCount < concurrency) {
          dequeue();
        }
      });
    };
  };

  const enqueue = requestQueue(2);
  const task1 = () => fetch(1);
  const task2 = () => fetch(2);
  const task3 = () => fetch(3);
  const task4 = () => fetch(4);
  const task5 = () => fetch(5);
  const task6 = () => fetch(6);

  const test = async () => {
    const data = await enqueue([task1, task2, task3, task4, task5, task6]);
    console.log("data", data);
  };

  return <Button onClick={test}>测试</Button>;
};

export default App;
