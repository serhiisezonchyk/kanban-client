import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectAuthData } from '../../store/slices/auth.slice';
import './TaskPage.scss';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
  deleteTask,
  getOneTask,
  updateTask,
} from '../../store/services/task.service';
import dayjs from 'dayjs';

const TaskPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectAuthData);
  const navigate = useNavigate();
  const [task, setTask] = React.useState({});
  const [isTaskLoading, setIsTaskLoading] = React.useState(true);

  const [importance, setImportance] = React.useState(false);
  const [description, setDescription] = React.useState('');
  const [deadlineDate, setDeadlineDate] = React.useState(null);
  const [deadlineTime, setDeadlineTime] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  React.useEffect(() => {
    getOneTask(id).then((data) => {
      setTask(data);
      setImportance(data.importance);

      const deadlineDateTime = dayjs(data.deadline_date);
      setDeadlineDate(deadlineDateTime.format('YYYY-MM-DD'));
      setDeadlineTime(deadlineDateTime.format('HH:mm'));

      setTitle(data.title);
      setDescription(data.description);
      setIsTaskLoading(false);
    });
  }, []);

  const onChange = React.useCallback((description) => {
    setDescription(description);
  }, []);
  const options = React.useMemo(
    () => ({
      autoDownloadFontAwesome: true,
      forceSync: true,
      spellChecker: false,
      autofocus: true,
      placeholder: 'Description...',
      status: true,
      showIcons: ['code', 'table'],
      toolbar: [
        'bold',
        'italic',
        'heading',
        '|',
        'unordered-list',
        'ordered-list',
        'code',
        'table',
        '|',
        'link',
        'image',
        '|',
        'preview',
      ],
    }),
    []
  );
  const handleOnUpdate = (e) => {
    const selectedDateTime = dayjs(`${deadlineDate} ${deadlineTime}`);
    const values = {
      title,
      deadline_date: selectedDateTime,
      description,
    };
    dispatch(updateTask({ id, values }));
  };
  const handleOnDelete = (e) => {
    dispatch(deleteTask({ id: task.id }));
    navigate(-1);
  };
  const handleImportanceClick = () => {
    setImportance(importance=>!importance);
    const values = {
      importance: !importance,
    };
    setTask({ ...task, ...values });
    dispatch(updateTask({ id, values }));
  };
  const isOverdue = dayjs().isAfter(dayjs(task?.deadline_date));
  return (
    !isTaskLoading && (
      <div className='task-container'>
        <div className='task-title-container'>
          <div onClick={handleImportanceClick}>
            {importance ? (
              <AiFillStar className='important' />
            ) : (
              <AiOutlineStar />
            )}
          </div>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={`task-info-container ${isOverdue?'is-overdue':''}`}>
          <div className='table'>
            <table>
              <tbody>
                <tr>
                  <td className='title-col'>Project</td>
                  <td>{task.category.group.lable}</td>
                </tr>
                <tr>
                  <td className='title-col'>User</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                </tr>
                <tr>
                  <td className='title-col'>Created at</td>
                  <td>{dayjs(task.created_at).format('DD/MM/YYYY HH:mm')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='table'>
            <table>
              <tbody>
                <tr>
                  <td className={`title-col ${isOverdue?'is-overdue':''}`}>Deadline</td>
                  <td>
                    <input
                      type='date'
                      value={deadlineDate}
                      min={dayjs().format('YYYY-MM-DD')}
                      onChange={(e) => setDeadlineDate(e.target.value)}
                    />
                    <input
                      type='time'
                      value={deadlineTime}
                      onChange={(e) => setDeadlineTime(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {task.created_at !== task.updated_at && (
          <p className='updated-date'>
            Task was updated at{' '}
            <span>{dayjs(task.updated_at).format('DD/MM/YYYY HH:mm')}</span>
          </p>
        )}
        <div className='description-container'>
          <SimpleMDE
            value={description}
            onChange={onChange}
            options={options}
          />
        </div>
        <div className='buttons'>
          <button onClick={() => navigate(-1, { replace: false })}>Back</button>
          <div>
            <button className='delete' onClick={handleOnDelete}>
              Delete
            </button>
            <button className='update' onClick={handleOnUpdate}>
              Update
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default TaskPage;
