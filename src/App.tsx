import { Gantt, XAxis } from "./containers";

function App() {
  return (
    <div className="App">
      <Gantt start={1672531200000} end={1680303600000}>
        <XAxis />
      </Gantt>
    </div>
  );
}

export default App;
