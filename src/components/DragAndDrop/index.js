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
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedItem = selectedWidgets.find(
      (item) => item.id === draggedItemId,
    );

    if (draggedItem) {
      const boundingClientRect = e.target.getBoundingClientRect();
      const mouseY = e.clientY - boundingClientRect.top;

      // Calculate the index based on the mouse position and varying item heights
      const index = selectedWidgets.reduce(
        (acc, item, i) => {
          const itemTop = acc.totalHeight;
          const itemBottom =
            itemTop + boundingClientRect.height / selectedWidgets.length; // Assuming equal heights

          acc.totalHeight = itemBottom;

          if (mouseY >= itemTop && mouseY <= itemBottom) {
            acc.index = i;
          }

          return acc;
        },
        { index: -1, totalHeight: 0 },
      ).index;

      // Move the dragged item to the calculated index
      const updatedItems = selectedWidgets.filter(
        (item) => item.id !== draggedItemId,
      );
      updatedItems.splice(index, 0, draggedItem);
      setSelectedWidgets(updatedItems);
    }
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
            handleOnDrag={handleOnDrag}
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

function WidgetItem({ index, widgetType, handleOnDelete, handleOnDrag }) {
  return (
    <div
      draggable
      onDragStart={(e) => handleOnDrag(e, widgetType)}
      className="dropped-widget"
    >
      {widgetTypeReduced[widgetType].name}
      <button onClick={handleOnDelete(index)}>Delete</button>
    </div>
  );
}
