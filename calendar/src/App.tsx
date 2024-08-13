import dayjs from "dayjs";
import Calendar from "./Calendar";

function App() {
  return (
    <div className="App">
      <Calendar
        value={dayjs("2023-11-08")}
        locale="en-US"
        onChange={(date) => {
          alert(date.format("YYYY-MM-DD"));
        }}
      ></Calendar>
    </div>
  );
}

export default App;
