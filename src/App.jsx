import { useDispatch } from 'react-redux';
import AppRouter from './components/AppRouter';
import React from 'react';
import { check } from './store/services/user.service';
function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(check());
  }, []);

  return <AppRouter />;
}

export default App;
