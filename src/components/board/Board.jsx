import React from 'react';
import styles from './Board.module.css';

import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { category, item } from '../testdata';
import SearchLine from '../searchLine/SearchLine';
import CustomModal from '../Modal/CustomModal';

function Board() {
  const [items, setItems] = React.useState(item);
  const [filter, setFilter] = React.useState({ query: '' });
  const [modal, setModal] = React.useState(true);
  const searchResults = React.useMemo(() => {
    if (filter.query === '') return items;
    else
      return items.filter((item) =>
        item.info.toLowerCase().includes(filter.query.toLowerCase())
      );
  }, [items, filter.query]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      items.find((item) => {
        if (item.id == draggableId) {
          item.categoryId = +destination.droppableId;
          setItems([...items]);
        }
      });
    }
  };

  return (
    <>
      {/* <CustomModal visible={modal} setVisible={setModal}>
        <h1>hello</h1>
        <button>Click</button>
      </CustomModal> */}
      <SearchLine filter={filter} setFilter={setFilter} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.board}>
          {category.map((col, index) => (
            <KanbanColumn
              key={col.id}
              droppableId={col.id}
              title={col.name}
              index={index}
              item={searchResults}
            />
          ))}
        </div>
      </DragDropContext>
    </>
  );
}

export default Board;
