import CopyToClipboard from "./CopyToClipboard";

function App() {
  return (
    <CopyToClipboard
      text={"神说要有光333"}
      onCopy={() => {
        console.log("done");
      }}
    >
      <div onClick={() => alert(1)}>复制</div>
    </CopyToClipboard>
  );
}

export default App;
