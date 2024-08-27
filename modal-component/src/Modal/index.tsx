import { useEffect, useState } from "react";
import M_Modal, { ModalProps } from "./Modal";
import { createRoot, Root } from "react-dom/client";

type InternalModalType = typeof M_Modal;

interface modalType extends InternalModalType {
  show: (props: ModalProps) => void;
  hidden: () => void;
}
const Modal = M_Modal as modalType;

type SetShowType = React.Dispatch<React.SetStateAction<boolean>>;
interface ModalManager {
  setShow: null | SetShowType;
  mounted: boolean;
  hidden: () => void;
  destory: () => void;
}

let ModalContainer: any = null;
let root: Root;
const modelSysbol = Symbol("$$__model__Container_hidden");

/* 静态属性show——控制 */
Modal.show = function (config: ModalProps) {
  /* 如果modal已经存在了，那么就不需要第二次show */
  if (ModalContainer) return;
  const props = { ...config, visible: true };
  const container: any = (ModalContainer = document.createElement("div"));
  /* 创建一个管理者，管理modal状态 */
  const manager: ModalManager = (container[modelSysbol] = {
    setShow: null,
    mounted: false,
    hidden() {
      const { setShow } = manager;
      setShow && setShow(false);
    },
    destory() {
      /* 卸载组件 */
      setTimeout(() => {
        root && root.unmount();
      }, 0);
      //   ReactDOM.unmountComponentAtNode(container);
      /* 移除节点 */
      document.body.removeChild(container);
      /* 置空元素 */
      ModalContainer = null;
    },
  });

  const ModelApp = (props: ModalProps) => {
    const [show, setShow] = useState(false);
    manager.setShow = setShow;
    const { visible, ...trueProps } = props;
    useEffect(() => {
      /* 加载完成，设置状态 */
      manager.mounted = true;
      setShow(visible!);
    }, []);

    return (
      <Modal
        {...trueProps}
        closeCb={() => manager.mounted && manager.destory()}
        visible={show}
      />
    );
  };
  /* 插入到body中 */
  document.body.appendChild(container);
  /* 渲染React元素 */
  //   ReactDOM.render(<ModelApp {...props} />, container);
  root = createRoot(container);
  root.render(<ModelApp {...props} />);
  //   return manager;
};

/* 静态属性——hidden控制隐藏 */
Modal.hidden = function () {
  if (!ModalContainer) return;
  /* 如果存在 ModalContainer 那么隐藏 ModalContainer  */
  ModalContainer[modelSysbol] && ModalContainer[modelSysbol].hidden();
};

export default Modal;
