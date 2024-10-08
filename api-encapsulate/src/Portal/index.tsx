import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useMemo,
} from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  attach?: HTMLElement | string;
  children: React.ReactNode;
}

const getAttach = (attach: PortalProps["attach"]) => {
  if (typeof attach === "string") {
    return document.querySelector(attach);
  }
  if (typeof attach === "object" && attach instanceof window.HTMLElement) {
    return attach;
  }

  return document.body;
};

const Portal = forwardRef((props: PortalProps, ref) => {
  const { attach, children } = props;

  const container = useMemo(() => {
    const el = document.createElement("div");
    el.className = `portal-wrapper`;
    return el;
  }, []);

  useEffect(() => {
    const parentELement = getAttach(attach);
    parentELement?.appendChild?.(container);

    return () => {
      parentELement?.removeChild?.(container);
    };
  }, [container, attach]);

  useImperativeHandle(ref, () => container);

  return createPortal(children, container);
});

export default Portal;
