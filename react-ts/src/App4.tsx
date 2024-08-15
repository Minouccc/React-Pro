import {
  CSSProperties,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactNode,
} from "react";

type CccProps = PropsWithChildren<{
  content: ReactNode;
  color: CSSProperties["color"];
  styles?: CSSProperties;
  //   clickHandler: MouseEventHandler<HTMLDivElement>;
  clickHandler: (e: MouseEvent<HTMLDivElement>) => void;
}>;
// interface CccProps {
//   content: ReactNode;
//   children: ReactNode;
// }
function Ccc(props: CccProps) {
  return (
    <div style={{ color: props.color }} onClick={props.clickHandler}>
      ccc,{props.content}
      {props.children}
    </div>
  );
}

function App() {
  return (
    <div>
      <Ccc
        content={333}
        color="yellow"
        styles={{ backgroundColor: "blue" }}
        clickHandler={(e) => {
          console.log(e);
        }}
      >
        <div>777</div>
      </Ccc>
    </div>
  );
}

export default App;
