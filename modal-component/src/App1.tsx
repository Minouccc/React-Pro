import Modal from "./Modal";
import "./index.scss";

export default function Index() {
  const handleClick = () => {
    Modal.show({
      content: <p>确定购买《React进阶指南小册》吗</p>,
      title: "《React进阶实践指南》",
      onOk: () => console.log("点击确定"),
      onCancel: () => console.log("点击取消"),
      onClose: () => Modal.hidden(),
    });
  };
  return (
    <div>
      <button onClick={() => handleClick()}>静态方式调用，显示modal</button>
    </div>
  );
}
