import React from 'react';
import './Board.scss';

import { DragDropContext } from 'react-beautiful-dnd';
import KanbanColumn from '../kanbanColumn/KanbanColumn';
import { item } from '../testdata';

import GroupInfo from '../group-info/GroupInfo';
import { useParams } from 'react-router-dom';
import KanbanColumnAdd from '../kanbanColumn/KanbanColumnAdd';
import { getGroup } from '../../store/services/group.service';
import { useQuery } from 'react-query';
import { getCategoriesFromGroup } from '../../store/services/category.service';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCategories,
  selectCategoriesLoading,
} from '../../store/slices/category.slice';
import {
  getTasksFromGroup,
  updateTask,
} from '../../store/services/task.service';
import { selectTasks, selectTasksLoading } from '../../store/slices/task.slice';

function Board() {
  const categories = useSelector(selectCategories);
  const isCategoriesLoading = useSelector(selectCategoriesLoading);

  const tasks = useSelector(selectTasks);
  const isTasksLoading = useSelector(selectTasksLoading);

  const [filter, setFilter] = React.useState({ query: '' });
  const [isAddingCol, setIsAddingCol] = React.useState(false);
  const [isAddingRow, setIsAddingRow] = React.useState(false);

  const [isUpdatingGroup, setIsUpdatingGroup] = React.useState(false);

  const { id } = useParams();

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getCategoriesFromGroup(id));
    dispatch(getTasksFromGroup(id));
  }, []);

  const searchResults = React.useMemo(() => {
    if (filter.query === '') return tasks;
    else
      return tasks.filter((item) =>
        item.title.toLowerCase().includes(filter.query.toLowerCase())
      );
  }, [tasks, filter.query]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId !== destination.droppableId) {
      const values = {
        category_id: +destination.droppableId,
      };
      dispatch(updateTask({ id: draggableId, values }));
    }
  };

  return (
    <div
      onClick={() => {
        setIsAddingRow(false);
        setIsAddingCol(false);
      }}
      className='board-page'
    >
      <GroupInfo
        group_id={id}
        filter={filter}
        setFilter={setFilter}
        isAdding={isAddingCol}
        setIsAdding={setIsAddingCol}
        isUpdatingGroup={isUpdatingGroup}
        setIsUpdatingGroup={setIsUpdatingGroup}
      />

      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={() => {
          setIsAddingRow(false);
          setIsAddingCol(false);
        }}
      >
        {!isCategoriesLoading && (
          <div className='board'>
            {isAddingCol && (
              <KanbanColumnAdd
                isAdding={isAddingCol}
                setIsAdding={setIsAddingCol}
                group_id={id}
              />
            )}
            {isTasksLoading ||
              categories?.map((col, index) => (
                <KanbanColumn
                  key={col.id}
                  droppableId={col.id}
                  lable={col.lable}
                  index={index}
                  searchable_tasks={searchResults}
                  setIsAdding={setIsAddingRow}
                  isAdding={isAddingRow}
                />
              ))}
          </div>
        )}
      </DragDropContext>
    </div>
  );
}

export default Board;
