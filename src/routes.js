import { MAIN_ROUTE, LOGIN_ROUTE } from './utils/consts';
import Main from './pages/main/Main';
import Login from './pages/auth/Auth';
// export const authRoutes = [
//   {
//     path: SUPERUSER_ROUTE,
//     Component: SuperuserPage,
//   },
// ];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: Main,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
];
