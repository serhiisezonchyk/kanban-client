import React from "react";
import "./KanbanColumn.scss";

import { Droppable } from "react-beautiful-dnd";
import KanbanRow from "../kanbanRow/KanbanRow";
import ProgressBar from "./progress/ProgressBar";

function KanbanColumn(props) {
  const { title, droppableId, index, item } = props;
  const [items, setItems] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("ASC");
  const [sortedItems, setSortedItems] = React.useState([]);

  React.useEffect(() => {
    if (item) {
      const filteredItems = props.item.filter(
        (i) => i.categoryId === droppableId
      );
      setItems(filteredItems);
      setSortedItems(
        filteredItems.sort(function (a, b) {
          if (a.info > b.info) {
            return 1;
          }
          if (a.info < b.info) {
            return -1;
          }
          return 0;
        })
      );
    }
  }, [item]);
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "#8dcefd61" : "white",
    padding: grid,
    width: 250,
    marginLeft: "5px",
    borderRadius: "5px",
    height:isDraggingOver ? "95%" : "95%",
  });

  const handleSearch = () => {
    // Perform search logic based on searchQuery
    // Update items and sortedItems state with search results
  };

  const handleSort = () => {
    if (searchQuery === "ASC") {
      setSearchQuery("DESC");
      const data = sortedItems.sort(function (a, b) {
        if (a.info > b.info) {
          return -1;
        }
        if (a.info < b.info) {
          return 1;
        }
        return 0;
      });
      setSortedItems(data);
    } else {
      setSearchQuery("ASC");
      const data = sortedItems.sort(function (a, b) {
        if (a.info > b.info) {
          return 1;
        }
        if (a.info < b.info) {
          return -1;
        }
        return 0;
      });
      setSortedItems(data);
    }
  };
  return (
    <div>
      <div className="column">
        <h3>{title}</h3>
        <div>
          <button className="button-sort" onClick={handleSort}>
            {searchQuery === "ASC" ? (
              <img src="https://cdn-icons-png.flaticon.com/128/25/25243.png" alt=""/>
            ) : (
              <img src="https://cdn-icons-png.flaticon.com/128/25/25330.png" alt=""/>
            )}
          </button>
        </div>
      </div>


      <ProgressBar max={props.item.length} value = {items.length}/>

      <Droppable key={index} droppableId={`${droppableId}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {sortedItems.map((item, index) => (
              <KanbanRow key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

// export default React.memo(KanbanColumn);
export default KanbanColumn;
