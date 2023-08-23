import {LOGIN_ROUTE, REGISTRATION_ROUTE, BOARD_LINK, GROUPS_ROUTE, ACCOUNT_ROUTE, NOTES_ROUTE, TASK_ROUTE} from './utils/consts';
import Login from './pages/auth/Auth';
import Registration from './pages/registration/Registration';
import Board from './components/board/Board'
import GroupPage from './pages/group/GroupPage';
import AccountPage from './pages/account/AccountPage';
import NotesPage from './pages/notes/NotesPage';
import TaskPage from './pages/item/TaskPage';
export const authRoutes = [
  {
    path: BOARD_LINK + "/:id",
    Component: Board,
  },
  {
    path: GROUPS_ROUTE,
    Component: GroupPage,
  },
  {
    path: ACCOUNT_ROUTE,
    Component: AccountPage,
  },
  {
    path: NOTES_ROUTE,
    Component: NotesPage,
  },
  {
    path: TASK_ROUTE + "/:id",
    Component: TaskPage,
  },
];

export const publicRoutes = [

  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Registration,
  },
];
