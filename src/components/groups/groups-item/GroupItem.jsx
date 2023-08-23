import React from 'react';
import './GroupItem.scss';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Navigate, useNavigate } from 'react-router-dom';
import { BOARD_LINK } from '../../../utils/consts';
import dayjs from 'dayjs';

const GroupItem = ({ group }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`group-item ${group.importance === true ? 'important' : ''}`}
      onClick={() => navigate(BOARD_LINK + '/' + group.id)}
    >
      <div className='label-container'>
        <p>{group.lable}</p>
        <div>
          {group.importance ? (
            <AiFillStar className='important' />
          ) : (
            <AiOutlineStar />
          )}
        </div>
      </div>
      <div className='hl'></div>
      <div className='content-handler'>
        <p>&emsp;{group.description}</p>
      </div>
      <div className='footer'>
        <p>
          Created at: <span>{dayjs(group.created_at).format('DD/MM/YYYY HH:mm')}</span>
        </p>
      </div>
    </div>
  );
};

export default GroupItem;
