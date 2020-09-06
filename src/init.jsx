import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import socket from 'socket.io-client';
import App from './components/App';
import rootReducer from './slices';
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
const io = socket();
io.on('newMessage', ({ data }) => store.dispatch({ type: 'messagesBox/addMessage', payload: data }));
io.on('newChannel', ({ data }) => store.dispatch({ type: 'channelsBox/addChannel', payload: data }));
io.on('renameChannel', ({ data }) => store.dispatch({ type: 'channelsBox/renameChannel', payload: data }));
io.on('removeChannel', ({ data }) => {
  store.dispatch({ type: 'channelsBox/removeChannel', payload: data });
  store.dispatch({ type: 'messagesBox/removeMessages', payload: data });
});
// ------------------------------------------------------------------------
export default () => {
  const nickname = Cookies.get('nickname');
  ReactDOM.render(
    <Context.Provider value={{ nickname }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>,
    document.getElementById('chat'),
  );
};
