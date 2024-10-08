import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";

function logMiddleware(func) {
  return function (set, get, store) {
    function newSet(...args) {
      console.log("调用了 set，新的 state：", get());
      return set(...args);
    }

    return func(newSet, get, store);
  };
}

const useXxxStore = create(
  logMiddleware(
    persist(
      (set) => ({
        aaa: "",
        bbb: "",
        updateAaa: (value) => set(() => ({ aaa: value })),
        updateBbb: (value) => set(() => ({ bbb: value })),
      }),
      {
        name: "guang",
      }
    )
  )
);

export default function App() {
  const updateAaa = useXxxStore((state) => state.updateAaa);
  const aaa = useXxxStore((state) => state.aaa);

  useEffect(() => {
    useXxxStore.subscribe((state) => {
      console.log(useXxxStore.getState());
    });
  }, []);

  return (
    <div>
      <input onChange={(e) => updateAaa(e.currentTarget.value)} value={aaa} />
      <Bbb></Bbb>
    </div>
  );
}

function Bbb() {
  return (
    <div>
      <Ccc></Ccc>
    </div>
  );
}

function Ccc() {
  const aaa = useXxxStore((state) => state.aaa);
  return <p>hello, {aaa}</p>;
}
