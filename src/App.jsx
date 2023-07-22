import Board from './components/board/Board';
import Auth from './pages/auth/Auth';
import './App.css';
import SiderPanel from './components/sider/SiderPanel';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
