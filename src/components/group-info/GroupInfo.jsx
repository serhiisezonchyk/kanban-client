import React from 'react';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './GroupInfo.scss';
import SearchLine from '../searchLine/SearchLine';
import {
  deleteGroup,
  getGroup,
  updateGroup,
} from '../../store/services/group.service';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BiSolidEditAlt } from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
const GroupInfo = ({
  group_id,
  filter,
  setFilter,
  isAdding,
  setIsAdding,
  isUpdatingGroup,
  setIsUpdatingGroup,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lable, setLable] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [importance, setImportance] = React.useState(false);

  const [group, setGroup] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    getGroup(group_id).then((data) => {
      setGroup(data);
      setLable(data.lable);
      setDescription(data.description);
      setImportance(data.importance);
      setIsLoading(false);
    });
  }, []);

  const handleAddClick = (e) => {
    e.stopPropagation();
    setIsAdding(!isAdding);
  };

  const handleUpdateClick = () => {
    const values = {
      lable,
      description,
    };
    setGroup({ ...group, ...values });
    dispatch(updateGroup({ id: group_id, values }));
    setIsUpdatingGroup(!isUpdatingGroup);
  };
  const handleDeleteClick = () => {
    dispatch(deleteGroup({ id: group_id }));
    setIsUpdatingGroup(!isUpdatingGroup);
    navigate(-1);
  };
  const handleImportanceChange = () => {
    setImportance(!importance);
    const values = {
      importance: !importance,
    };
    setGroup({ ...group, ...values });
    dispatch(updateGroup({ id: group_id, values }));
  };
  return (
    !isLoading && (
      <div
        className='group-form'
        onDoubleClick={() => setIsUpdatingGroup(!isUpdatingGroup)}
      >
        <div className='lable-form'>
          {isUpdatingGroup ? (
            <input
              className='lable-input'
              value={lable}
              placeholder='Lable...'
              onChange={(e) => setLable(e.target.value)}
            />
          ) : (
            <p>{group.lable}</p>
          )}

          <div
            onClick={() => {
              handleImportanceChange();
            }}
          >
            {group.importance ? (
              <AiFillStar className='important' />
            ) : (
              <AiOutlineStar />
            )}
          </div>
        </div>
        <div>
          {isUpdatingGroup ? (
            <input
              value={description}
              placeholder='Description...'
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <p>{group.description}</p>
          )}
        </div>
        <div>
          {isUpdatingGroup ? (
            <>
              <button
                className='cancel'
                onClick={() => setIsUpdatingGroup(!isUpdatingGroup)}
              >
                Cancel
              </button>
              <button className='update' onClick={handleUpdateClick}>
                <BiSolidEditAlt />
              </button>
              <button className='delete' onClick={handleDeleteClick}>
                <AiOutlineDelete />
              </button>
            </>
          ) : (
            <button disabled={isAdding} onClick={handleAddClick}>
              + ADD
            </button>
          )}
          <div className='vl'></div>
          <SearchLine filter={filter} setFilter={setFilter} />
        </div>
        <div className='hl'></div>
      </div>
    )
  );
};

export default React.memo(GroupInfo);
