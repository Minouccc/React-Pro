import { useEffect, useRef, useState } from "react";

export default function App() {
  const [className, setClassName] = useState("aaa");

  useEffect(() => {
    setTimeout(() => setClassName("bbb"), 2000);
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    const targetNode = containerRef.current!;

    const callback = function (mutationsList: MutationRecord[]) {
      console.log(mutationsList);
    };

    const observer = new MutationObserver(callback);

    observer.observe(targetNode, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ["className"],
    });
  }, []);

  return (
    <div>
      <div id="container" ref={containerRef}>
        <div className={className}>
          {className === "aaa" ? (
            <div>aaa</div>
          ) : (
            <div>
              <p>bbb</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
