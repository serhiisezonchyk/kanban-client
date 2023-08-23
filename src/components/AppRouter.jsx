import React from 'react';
import { Routes, Route, Navigate, Router } from 'react-router-dom';
import { authRoutes, publicRoutes } from '../routes';
import { LOGIN_ROUTE } from '../utils/consts';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../store/slices/auth.slice';
import Sidebar from './sider/Sidebar';

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} exact />
      ))}
      <Route path='*' element={<Navigate to={LOGIN_ROUTE} />} />
    </Routes>
  );
};

export default AppRouter;
