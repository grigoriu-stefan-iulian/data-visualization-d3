// import { ScatterPlot } from "./components";
import { DragAndDropComponent } from "./components/DragAndDrop";
import { DragAndDropMultipleLines } from "./components/DragAndDropMultipleLines/DragAndDropMultipleLines";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      {/* <h1>Hello Scatter Plot</h1> */}
      {/* <ScatterPlot /> */}
      {/* <DragAndDropComponent /> */}
      <DragAndDropMultipleLines />
    </div>
  );
}
