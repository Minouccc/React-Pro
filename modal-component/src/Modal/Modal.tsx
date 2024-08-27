import { MouseEvent, PropsWithChildren, ReactNode } from "react";
import Dialog from "../Dialog";

export type ModalProps = {
  visible?: boolean | null | undefined;
  width?: number;
  content?: ReactNode;
  footer?: ReactNode;
  title?: string;
  onText?: string;
  cancelText?: string;
  onOk?: (e: MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: MouseEvent<HTMLButtonElement>) => void;
  onClose?: (e: MouseEvent<HTMLDivElement>) => void;
  closeCb?: () => void;
};

const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const {
    visible = false,
    title,
    children,
    content,
    footer,
    onText,
    cancelText,
    width = 500,
    onOk = (e) => {
      console.log("onOk", e);
    },
    onCancel = (e) => {
      console.log("onCancel", e);
    },
    onClose = (e) => {
      console.log("onClose", e);
    },
    closeCb,
  } = props;
  const renderTop = () => {
    return (
      <>
        <div className="modal-top">
          <p>{title}</p>
          <div
            className="modal-top-closed"
            onClick={(e) => {
              onClose(e);
            }}
          >
            X
          </div>
        </div>
      </>
    );
  };
  const renderContent = () => {
    return (
      <>
        <div className="modal-content">
          {content ? content : children ? children : null}
        </div>
      </>
    );
  };
  const renderFooter = () => {
    return (
      <>
        {footer ? (
          footer
        ) : (
          <div className="modal-bottom">
            <div className="modal-bottom-btn-box">
              <button
                className="btn"
                onClick={(e) => {
                  onOk(e);
                }}
              >
                {onText || "确定"}
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  onCancel(e);
                }}
              >
                {cancelText || "取消"}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <Dialog
        visible={visible || false}
        width={width}
        onClose={onClose}
        closeCb={closeCb}
      >
        {renderTop()}
        {renderContent()}
        {renderFooter()}
      </Dialog>
    </>
  );
};

export default Modal;
