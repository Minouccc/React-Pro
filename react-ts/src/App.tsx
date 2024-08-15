interface AaaProps {
  name: string;
  // content: React.ReactElement;
  content: React.ReactNode;
}

const Aaa: React.FunctionComponent<AaaProps> = (props) => {
  return (
    <div>
      aaa, {props.name}
      {props.content}
    </div>
  );
};

function App() {
  return (
    <div>
      {/* <Aaa name="guang" content={<button>xxx</button>}></Aaa> */}
      <Aaa name="guang" content={null}></Aaa>
    </div>
  );
}

export default App;
