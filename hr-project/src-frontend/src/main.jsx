import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import store from './store/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
