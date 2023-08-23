import React from 'react';
import './KanbanRow.scss';
import dayjs from 'dayjs';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addTask } from '../../store/services/task.service';
const KanbanRowAdd = ({ category_id, setIsAdding }) => {
  const dispatch = useDispatch();

  const currentDateTime = dayjs();
  const [importance, setImportnace] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState('');
  const [selectedTime, setSelectedTime] = React.useState('');
  const handleCancel = () => {
    setIsAdding(false);
  };
  const handleSuccess = () => {
    const selectedDateTime = dayjs(`${selectedDate} ${selectedTime}`);
    
    const newTask = {
      title,
      deadline_date: selectedDateTime,
      importance,
      category_id
    }
    dispatch(addTask(newTask))
    setIsAdding(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()} className={`dragable-item added`}>
      <div className={`card-body`}>
        <div className='card-title'>
          <input
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <span
            className={`importance-indicator ${importance ? 'important' : ''}`}
            onClick={() => setImportnace(!importance)}
          ></span>
        </div>
        <div className='card-dates'>
          <p>Due On:</p>
          <p>
            <input
              type='date'
              value={selectedDate}
              min={currentDateTime.format('YYYY-MM-DD')}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
            <input
              type='time'
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            />
          </p>
        </div>
        <div className=' buttons'>
          <button onClick={handleCancel}>
            <AiOutlineClose />
          </button>
          <button onClick={handleSuccess}>
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanRowAdd;
