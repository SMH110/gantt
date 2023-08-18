import { Gantt, Tick, XAxis } from "./containers";

function App() {
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Gantt start={1672531200000} end={1680303600000}>
        <XAxis>
          {(ticks: any) => {
            return ticks.map((x: Date, i: number) => (
              <Tick key={i} start={x} alignmentBaseline="hanging"></Tick>
            ));
          }}
        </XAxis>
      </Gantt>
    </div>
  );
}

export default App;
