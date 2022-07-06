import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>  
  </React.StrictMode>
);
