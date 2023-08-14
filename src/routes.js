import { MAIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from './utils/consts';
import Main from './pages/main/Main';
import Login from './pages/auth/Auth';
import Registration from './pages/registration/Registration';
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
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
];
