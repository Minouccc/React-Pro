import React, { useRef } from "react";
import useHover from "./hooks/useHover";
// import { useHover } from "ahooks";

export default () => {
  const ref = useRef<HTMLDivElement>(null);
  const isHovering = useHover(ref);
  return <div ref={ref}>{isHovering ? "hover" : "leaveHover"}</div>;
};
