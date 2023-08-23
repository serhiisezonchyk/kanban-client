import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './store/store.js';
import Sidebar from './components/sider/Sidebar.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
        <div className='main-container'>
          <Sidebar />
          <App />
        </div>
    </Provider>
  </BrowserRouter>
);
