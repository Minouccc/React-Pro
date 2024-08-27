import {
  MouseEvent,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import ReactDOM from "react-dom";

type DialogProps = PropsWithChildren<{
  visible: boolean;
  width?: number;
  onClose?: (e: MouseEvent<HTMLDivElement>) => void;
  closeCb?: () => void;
}>;

/* 控制弹窗隐藏以及动画效果 */
const controlShow = (
  f1: React.Dispatch<React.SetStateAction<boolean>>,
  f2: React.Dispatch<React.SetStateAction<boolean>>,
  value: boolean,
  timer: number
) => {
  f1(value);
  return setTimeout(() => {
    f2(value);
  }, timer);
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { children, width, visible, onClose, closeCb } = props;
  const [modalShow, setModalShow] = useState<boolean>(visible);
  const [modalShowAsync, setModalShowAsync] = useState<boolean>(visible);

  const renderChildren = useMemo(() => {
    return ReactDOM.createPortal(
      <div className="dialog" style={{ display: modalShow ? "block" : "none" }}>
        <div
          className="dialog-container"
          style={{ opacity: modalShowAsync ? 1 : 0 }}
        >
          <div className="dialog-wrap" style={{ width: width + "px" }}>
            {children}
          </div>
        </div>
        <div
          className="dialog-container mask"
          onClick={onClose}
          style={{ opacity: modalShowAsync ? 0.6 : 0 }}
        ></div>
      </div>,
      document.body
    );
  }, [modalShow, modalShowAsync]);

  useEffect(() => {
    let timer;
    if (visible) {
      /* 打开弹窗，需要先让 */
      timer = controlShow(setModalShow, setModalShowAsync, visible, 30);
    } else {
      timer = controlShow(setModalShowAsync, setModalShow, visible, 1000);
    }
    return function () {
      timer && clearTimeout(timer);
    };
  }, [visible]);

  /* 执行关闭弹窗后的回调函数 closeCb */
  useEffect(() => {
    !modalShow && typeof closeCb === "function" && closeCb();
  }, [modalShow]);

  return renderChildren;
};

export default Dialog;
