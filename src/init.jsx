import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import gon from 'gon';
import App from './components/App';
import rootReducer from './slices/index';
import Identifier from './components/Identifier';
import Context from './components/Context';

// Cookies.remove('nickname');

const middleware = getDefaultMiddleware({
  immutableCheck: false,
  serializableCheck: false,
  thunk: true,
});

const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});
// ------------------------------------------------------------------------
const renderIdentifier = () => {
  ReactDOM.render(<Identifier />, document.querySelector('nav'));
};

const renderChat = (nickname) => {
  ReactDOM.render(
    <Context.Provider value={{ nickname }}>
      <Provider store={store}>
        <App serverData={gon} />
      </Provider>
    </Context.Provider>,
    document.getElementById('chat'),
  );
};
// ------------------------------------------------------------------------
export default () => {
  const nickname = Cookies.get('nickname');
  if (nickname) renderChat(nickname);
  else renderIdentifier();
};
