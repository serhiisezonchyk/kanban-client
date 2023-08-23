import React from 'react';
import './KanbanColumn.scss';

import { Droppable } from 'react-beautiful-dnd';
import KanbanRow from '../kanbanRow/KanbanRow';
import ProgressBar from './progress/ProgressBar';
import KanbanRowAdd from '../kanbanRow/KanbanRowAdd';
import TitleColumnInput from './TitleColumnInput';
import { AiOutlineSortAscending, AiOutlineSortDescending } from 'react-icons/ai';
import dayjs from 'dayjs';

function KanbanColumn({ lable, droppableId, index, searchable_tasks, isAdding, setIsAdding }) {
  const [columnTasks, setColumnTasks] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('ASC');
  const [sortedItems, setSortedItems] = React.useState([]);
  const [isUpdating, setIsUpdating] = React.useState(false);
  React.useEffect(() => {
    if (searchable_tasks) {
      const filteredItems = searchable_tasks.filter(
        (i) => i.category_id === droppableId
      );
      setColumnTasks(filteredItems);
      setSortedItems(
        filteredItems.sort(function (a, b) {
          if (a.title > b.title) {
            return 1;
          }
          if (a.title < b.title) {
            return -1;
          }
          return 0;
        })
      );
    }
  }, [searchable_tasks]);
  const grid = 8;
  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? '#8dcefd61' : 'white',
    padding: grid,
    width: 250,
    marginLeft: '5px',
    borderRadius: '5px',
    height: isDraggingOver ? '95%' : '95%',
  });

  const handleSort = (e) => {
    if (searchQuery === 'ASC') {
      setSearchQuery('DESC');
      const data = sortedItems.sort((a, b) => {
        const dateA = a.deadline_date ? dayjs(a.deadline_date) : null;
        const dateB = b.deadline_date ? dayjs(b.deadline_date) : null;
  
        if (!dateA && !dateB) return 0;
        if (!dateA) return -1;
        if (!dateB) return 1;
  
        return dateB.diff(dateA);
      });
      setSortedItems(data);
    } else {
      setSearchQuery('ASC');
      const data = sortedItems.sort((a, b) => {
        const dateA = a.deadline_date ? dayjs(a.deadline_date) : null;
        const dateB = b.deadline_date ? dayjs(b.deadline_date) : null;
  
        if (!dateA && !dateB) return 0;
        if (!dateA) return 1;
        if (!dateB) return -1;
  
        return dateA.diff(dateB);
      });
      setSortedItems(data);
    }
  };
  return (
    <div className='col' onClick={() => setIsAdding(false)}>
      <div className='column' onDoubleClick={()=>setIsUpdating(!isUpdating)}>
        {isUpdating?<TitleColumnInput id={droppableId} value={lable} setIsUpdating={setIsUpdating}/>:<>
        <h3>{lable}</h3>
        <div>
          <button className='button-sort' onClick={handleSort}>
            {searchQuery === 'ASC' ? (
              <AiOutlineSortAscending/>
            ) : (
             <AiOutlineSortDescending/>
            )}
          </button>
        </div></>}

      </div>
      <ProgressBar max={searchable_tasks?.length} value={columnTasks?.length} />
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
            {index === 0 &&
              (isAdding ? (
                <KanbanRowAdd category_id={droppableId} setIsAdding={setIsAdding}/>
              ) : (
                <div
                  className='add-form'
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAdding(true);
                  }}
                >
                  +Add
                </div>
              ))}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default React.memo(KanbanColumn);
