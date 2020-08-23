import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './components/App';
import gon from 'gon';

const mountNode = document.getElementById('chat');
ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  mountNode);