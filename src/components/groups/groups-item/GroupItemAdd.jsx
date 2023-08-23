import React from 'react';
import './GroupItem.scss';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addGroup } from '../../../store/services/group.service';

const GroupItemAdd = () => {
  const dispatch = useDispatch();
  const [importance, setImportance] = React.useState(false);
  const [lable, setLable] = React.useState('');
  const [description, setDescription] = React.useState('');
  const handleAdd = () => {
    const data = {
      lable,importance,description
    }
    try {
      dispatch(addGroup(data));
    } catch (error) {
    }
  };
  return (
    <div className={`group-item new`}>
      <div className='label-container'>
        <input value={lable} onChange={(e)=>setLable(e.target.value)} placeholder='Lable...' />
        <div onClick={() => setImportance(!importance)}>
          {importance ? (
            <AiFillStar className='important' />
          ) : (
            <AiOutlineStar />
          )}
        </div>
      </div>
      <div className='hl new'></div>
      <div className='content-handler'>
        <textarea value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='Description...' />
      </div>
      <div className='button-form'>
        <button onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default GroupItemAdd;
