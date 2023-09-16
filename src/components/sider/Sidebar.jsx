import React from 'react';
import './Sidebar.scss';
import logoImage from '../../assets/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, selectIsAuth } from '../../store/slices/auth.slice';
import { Link } from 'react-router-dom';
import { ACCOUNT_ROUTE, GROUPS_ROUTE, NOTES_ROUTE } from '../../utils/consts';
const Sidebar = () => {
  const [close, setClose] = React.useState(true);

  const toggleSidebar = () => {
    setClose(!close);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  const isAuth = useSelector(selectIsAuth);
  if (!isAuth) return;

  return (
    <div className={`sidebar ${close ? 'close':''}`}>
      <div>
        <Link to={GROUPS_ROUTE} className='logo'>
          <img src={logoImage}></img>
          <div className='logo-name'>
            <span>Air</span>Plan
          </div>
        </Link>
        <ul className='side-menu'>
          <li>
            <Link to={ACCOUNT_ROUTE}>
              <i className='bx bxs-user-account'></i>My account
            </Link>
          </li>
          <li>
            <Link to={GROUPS_ROUTE}>
              <i className='bx bx-chalkboard'></i>Projects
            </Link>
          </li>
          <li>
            <Link to={NOTES_ROUTE}>
              <i className='bx bx-edit-alt'></i> Notes
            </Link>
          </li>
        </ul>
        <ul className='side-menu'>
          <li>
            <a onClick={handleLogout} className='logout'>
              <i className='bx bx-log-out-circle'></i>logout
            </a>
          </li>
        </ul>
      </div>

      <div>
        <ul className='side-menu'>
          <li>
            <a onClick={toggleSidebar} className='toogle'>
              <i
                className={close ? 'bx bx-chevron-right' : 'bx bx-chevron-left'}
              ></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
