import React from 'react';
import Sidebar from '../../components/sider/Sidebar';
import Board from '../../components/board/Board';
import './Main.scss';
import Account from '../../components/account/Account';
import Notes from '../../components/notes/Notes';
const Main = () => {
  const [activeComponent, setActiveComponent] = React.useState('board');
  const [close, setClose] = React.useState(true);

  const handleSidebarItemClick = (component) => {
    setActiveComponent(component);
  };

  const toggleSidebar = () => {
    setClose(!close);
  };
  return (
    <div className='App'>
      <Sidebar
        close={close}
        toggleSidebar={toggleSidebar}
        activeComponent={activeComponent}
        handleSidebarItemClick={handleSidebarItemClick}
      />
      <div className={`content ${close ? 'closed' : ''}`}>
        {activeComponent === 'board' && <Board />}
        {activeComponent === 'account' && <Account />}
        {activeComponent === 'notes' && <Notes />}
      </div>
    </div>
  );
};

export default Main;
