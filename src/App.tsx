import { Gantt, Tick, XAxis } from "./containers";
import { Row } from "./containers/row";
import { Activity } from "./containers/activity";
import Plot from "./containers/plot";
import Group from "./containers/group";

function App() {
  return (
    <div className="App" style={{ marginTop: 10 }}>
      <Gantt
        start={new Date(2023, 0, 1).getTime()}
        end={new Date(2023, 2, 3).getTime()}
      >
        <XAxis height={35}>
          {(ticks: any) => {
            return ticks.map((x: Date, i: number) => (
              <Tick key={i} start={x} alignmentBaseline="hanging"></Tick>
            ));
          }}
        </XAxis>
        <Plot style={{ border: "1px solid #ccc" }}>
          <Group id="1">
            <Row>
              <Activity
                start={new Date(2023, 0, 1).getTime()}
                end={new Date(2023, 0, 6).getTime()}
                fill="lightblue"
                stroke="#000"
              />
              <Activity
                start={new Date(2023, 0, 6, 2).getTime()}
                end={new Date(2023, 0, 8).getTime()}
                fill="lightblue"
                stroke="#000"
              />
            </Row>
            <Row>
              <Activity
                start={new Date(2023, 0, 1).getTime()}
                end={new Date(2023, 0, 6).getTime()}
                fill="lightblue"
                stroke="#000"
              />
              <Activity
                start={new Date(2023, 0, 6, 2).getTime()}
                end={new Date(2023, 0, 8).getTime()}
                fill="lightblue"
                stroke="#000"
                height={50}
              />
            </Row>
          </Group>
        </Plot>
      </Gantt>
    </div>
  );
}

export default App;
