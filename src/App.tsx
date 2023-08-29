import { Gantt, Tick, XAxis } from "./containers";
import Plot from "./containers/plot";

function App() {
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Gantt start={1672531200000} end={1680303600000}>
        <XAxis height={35}>
          {(ticks: any) => {
            return ticks.map((x: Date, i: number) => (
              <Tick key={i} start={x} alignmentBaseline="hanging"></Tick>
            ));
          }}
        </XAxis>
        <Plot style={{ border: "1px solid #ccc" }} />
      </Gantt>
    </div>
  );
}

export default App;
