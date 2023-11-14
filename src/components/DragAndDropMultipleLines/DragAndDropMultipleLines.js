import React, { useState } from "react";
// DraggableItem.js

const DraggableItem = ({ id, content, onDragStart }) => {
  const handleDragStart = (e) => {
    onDragStart(e, id);
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      style={{ border: "1px solid black", margin: "8px", padding: "8px" }}
    >
      {content}
    </div>
  );
};

// DroppableArea.js
// import React from 'react';

const DroppableArea = ({ onDrop, onDragOver, children }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedItemId = e.dataTransfer.getData("text/plain");
    onDrop(droppedItemId);
  };

  const allowDrop = (e) => {
    e.preventDefault();
    onDragOver(e);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={allowDrop}
      style={{
        display: "flex",
        flexWrap: "wrap",
        border: "2px dashed black",
        padding: "16px",
      }}
    >
      {children}
    </div>
  );
};

// DragAndDropMultipleLines.js
// import DraggableItem from "./DraggableItem";
// import DroppableArea from "./DroppableArea";

export const DragAndDropMultipleLines = () => {
  const [items, setItems] = useState([
    { id: "item1", content: "Item 1" },
    { id: "item2", content: "Item 2" },
    { id: "item3", content: "Item 3" },
    { id: "item4", content: "Item 4" },
    { id: "item5", content: "Item 5" },
    { id: "item6", content: "Item 6" },
    { id: "item7", content: "Item 7" },
    { id: "item8", content: "Item 8" },
    { id: "item9", content: "Item 9" },
    { id: "item10", content: "Item 10" },
    // ... more items
  ]);

  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData("text/plain", itemId);
  };

  const handleDrop = (droppedItemId) => {
    const updatedItems = items.map((item) =>
      item.id === droppedItemId ? { ...item, order: 0 } : item,
    );
    setItems(updatedItems);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    const draggedItemId = e.dataTransfer.getData("text/plain");
    const draggedItem = items.find((item) => item.id === draggedItemId);

    if (draggedItem) {
      const mouseY = e.clientY;
      const index = items.findIndex((item) => item.id === draggedItemId);

      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      const newIndex = Math.floor(mouseY / 100); // Adjust this value based on your item height
      updatedItems.splice(newIndex, 0, draggedItem);

      setItems(updatedItems);
    }
  };

  return (
    <div>
      <DroppableArea onDrop={handleDrop} onDragOver={handleDragOver}>
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            content={item.content}
            onDragStart={handleDragStart}
          />
        ))}
      </DroppableArea>
    </div>
  );
};

export default DragAndDropMultipleLines;
