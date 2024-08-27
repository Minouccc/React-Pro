import { useRef, useState } from "react";
import Modal from "./Modal/Modal";
import "./index.scss";

function App() {
  const [visible, setVisible] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <>
      <button onClick={() => setVisible(true)}>打开</button>
      <Modal
        title={"React进阶实践指南"}
        width={600}
        onText="confirm"
        cancelText="cancel"
        visible={visible}
        onOk={() => {
          console.log(inputRef.current?.value);
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
        onClose={() => {
          if (inputRef.current) {
            inputRef.current.value = "Happy";
          }
          setVisible(false);
        }}
      >
        <div className="feel">
          小册阅读感受：{" "}
          <input
            defaultValue={"Happy"}
            placeholder="写下你的感受"
            ref={inputRef}
          />
        </div>
      </Modal>
    </>
  );
}

export default App;
