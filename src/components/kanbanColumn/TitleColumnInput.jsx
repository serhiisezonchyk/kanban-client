import React from 'react';
import { BiEditAlt } from 'react-icons/bi';
import { ImCancelCircle } from 'react-icons/IM';
import { useDispatch } from 'react-redux';
import { deleteCategory, updateCategory } from '../../store/services/category.service';
import { AiOutlineDelete } from 'react-icons/ai';
const TitleColumnInput = ({ id, value, setIsUpdating }) => {
  const dispatch = useDispatch();
  const [lable, setLable] = React.useState(value);
  const handleCancel = () => {
    setIsUpdating(false);
  };
  const handleOk = () => {
    const values ={
        lable,
    }
    dispatch(updateCategory({id, values}))
    setIsUpdating(false);
  };
  const handleDelete=()=>{
    dispatch(deleteCategory({ id: id }));

  }
  return (
    <div className='column-update-form'>
      <input value={lable} placeholder="Lable.." onChange={(e) => setLable(e.target.value)} />
      <button onClick={handleCancel}>
        <ImCancelCircle />
      </button>
      <button onClick={handleDelete}>
        <AiOutlineDelete />
      </button>
      <button onClick={handleOk}>
        <BiEditAlt />
      </button>
    </div>
  );
};

export default TitleColumnInput;
