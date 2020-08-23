import React from 'react';
import ReactDOM from 'react-dom';
import gon from 'gon';
import App from './components/App';

export default () => {
  ReactDOM.render(
    <App serverData={gon} />,
    document.getElementById('chat'),
  );
};
