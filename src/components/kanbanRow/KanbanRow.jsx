import React from "react";
import styles from "./KanbanRow.module.css";

import { Draggable } from "react-beautiful-dnd";
import { Card } from "antd";
// q: what is soli

function KanbanRow({ item, index }) {
  const grid = 8;
  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid/2,
    margin: `0 0 ${grid}px 0`,
    background: isDragging ? "#d5d5d5" : "#b5b5b536",
    borderRadius: "5px",
    ...draggableStyle,
  });
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <div className={styles.cardBody}> 
            <p>{item.info}</p>
          </div>
        </div>
      )}
    </Draggable>
  );
}

// export default React.memo(KanbanRow);
export default KanbanRow;
