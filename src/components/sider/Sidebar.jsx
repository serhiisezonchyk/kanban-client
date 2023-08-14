import React from 'react';
import './Sidebar.scss';
import logoImage from '../../assets/logo.png';
const Sidebar = ({ close, toggleSidebar,activeComponent, handleSidebarItemClick }) => {
  return (
    <div className={`sidebar ${close&&'close'}`}>
      <div>
        <a href='' className='logo'>
          <img src={logoImage}></img>
          <div className='logo-name'>
            <span>Air</span>Plan
          </div>
        </a>
        <ul className='side-menu'>
          <li className={activeComponent==='account'&&'active'}>
            <a onClick={() => handleSidebarItemClick('account')}>
              <i className='bx bxs-user-account'></i>My account
            </a>
          </li>
          <li className={activeComponent==='board'&&'active'}>
            <a onClick={() => handleSidebarItemClick('board')}>
              <i className='bx bx-chalkboard'></i>Projects
            </a>
          </li>
          <li className={activeComponent==='notes'&&'active'}>
            <a onClick={() => handleSidebarItemClick('notes')}>
              <i className='bx bx-edit-alt'></i> Notes{' '}
            </a>
          </li>
        </ul>
        <ul className='side-menu'>
          <li>
            <a href='#' className='logout'>
              <i className='bx bx-log-out-circle'></i>logout
            </a>
          </li>
        </ul>
      </div>

      <div>
        <ul className='side-menu'>
          <li>
            <a onClick={toggleSidebar} className='toogle'>
              <i className={close?'bx bx-chevron-right':'bx bx-chevron-left'}></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
