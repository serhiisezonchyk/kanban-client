import React from 'react';
import { SimpleMdeReact } from 'react-simplemde-editor';
import './NotesPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getNote, updateNote } from '../../store/services/note.service';
import { selectNote, selectNoteLoading } from '../../store/slices/note.slice';
const NotesPage = () => {
  const dispatch = useDispatch();
  const note = useSelector(selectNote);
  const isLoading = useSelector(selectNoteLoading);

  const [text, setText] = React.useState(isLoading?'':note);

  const onChange = React.useCallback((text) => {
    setText(text);
  }, []);

  const handleUpdateClick = () =>{
    dispatch(updateNote({values:{text}}))
  }
  React.useEffect(() => {
    dispatch(getNote());
  }, []);
  React.useEffect(()=>{
    if(!isLoading){
      setText(note);
    }
  },[isLoading])
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
  return !isLoading&&(
    <div className='notes-container'>
      <SimpleMdeReact value={text} onChange={onChange} options={options} />
      <div className='buttons'>
        <button onClick={handleUpdateClick}>Save</button>
      </div>
    </div>
  );
};

export default NotesPage;
