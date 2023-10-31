import { useState } from "react";

import "./styles.css";

const widgets = [
  {
    id: 1,
    name: "Widget 1",
  },
  {
    id: 2,
    name: "Widget 2",
  },
  {
    id: 3,
    name: "Widget 3",
  },
  {
    id: 4,
    name: "Widget 4",
  },
];

const widgetTypeReduced = widgets.reduce((accumulator, currentItem) => {
  return { ...accumulator, [currentItem.id]: currentItem };
}, {});

export function DragAndDropComponent() {
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const handleOnDrag = (e, widgetType) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleOnDrop = (e) => {
    const widgetType = e.dataTransfer.getData("widgetType");

    setSelectedWidgets([...selectedWidgets, Number(widgetType)]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleOnDelete = (widgetIndex) => {
    return () =>
      setSelectedWidgets((state) =>
        state.filter((_, index) => widgetIndex !== index),
      );
  };

  return (
    <div className="drag-and-drop-component">
      <div className="widgets-container">
        {widgets.map((item) => (
          <div
            key={item.id}
            className="widget"
            draggable
            onDragStart={(e) => handleOnDrag(e, item.id)}
          >
            {item.name}
          </div>
        ))}
      </div>
      <div
        className="drop-area"
        onDrop={handleOnDrop}
        onDragOver={handleDragOver}
      >
        {selectedWidgets.map((widgetType, index) => (
          <WidgetItem
            key={index}
            index={index}
            widgetType={widgetType}
            handleOnDelete={handleOnDelete}
          />
        ))}
      </div>
    </div>
  );
}

function WidgetItem({ index, widgetType, handleOnDelete }) {
  return (
    <div className="dropped-widget">
      {widgetTypeReduced[widgetType].name}
      <button onClick={handleOnDelete(index)}>Delete</button>
    </div>
  );
}
