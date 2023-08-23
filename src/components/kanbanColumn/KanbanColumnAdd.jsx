import React from 'react';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../store/services/category.service';
const KanbanColumnAdd = ({ isAdding, setIsAdding, group_id }) => {
  const dispatch = useDispatch();
  const [lable, setLable] = React.useState('');
  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleCancel = () => {
    setIsAdding(!isAdding);
  };

  const handleSuccess = () => {
    dispatch(addCategory({group_id, lable}))
    setIsAdding(!isAdding);
  };

  return (
    <div className='add-column' onClick={handleClick}>
      <div className='control-form'>
        <input value={lable} onChange={(e) => setLable(e.target.value)} placeholder='New column..'></input>
        <div className='buttons'>
          <button onClick={handleSuccess}>
            <AiOutlinePlus />
          </button>
          <button onClick={handleCancel}>
            <AiOutlineClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KanbanColumnAdd;
