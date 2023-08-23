import React from 'react';
import './KanbanRow.scss';

import { Draggable } from 'react-beautiful-dnd';
import { item } from '../testdata';
import { useNavigate } from 'react-router-dom';
import { TASK_ROUTE } from '../../utils/consts';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/services/task.service';
function KanbanRow({ item, index }) {
  const dispatch = useDispatch();
  const toggleImportance = (e) => {
    e.stopPropagation();
    const values = {
      importance:!item.importance,
    }
    dispatch(updateTask({id:item.id,values}))
  };
  const navigate = useNavigate();
  const isOverdue = dayjs().isAfter(dayjs(item?.deadline_date));
  return (
    <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
      {(provided, snapshot) => (
        <div
          onClick={()=>navigate(TASK_ROUTE + '/' + item.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`dragable-item ${snapshot.isDragging ? 'dragged' : ''} ${isOverdue?'overdue':''}`}
        >
          <div className={`card-body `}>
            <div className='card-title' >
              <p>{item.title}</p>
              <span
                className={`importance-indicator ${
                  item.importance ? 'important' : ''
                }`}
                onClick={(e) => toggleImportance(e)}
              ></span>
            </div>
            <div className='card-dates'>
              <p>
                Start On: <span>{dayjs(item.created_at).format('DD/MM/YYYY HH:mm')}</span>
              </p>
              <p>
                Due On:{' '}
                <span className={`is-deadline ${isOverdue?'is-overdue':''}`}>
                  {item.deadline_date?dayjs(item.deadline_date).format('DD/MM/YYYY HH:mm'): ' -'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default React.memo(KanbanRow);
// export default KanbanRow;
