// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import './i18n.jsx';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import socket from 'socket.io-client';
import App from './components/App';
import LanguageControlButtons from './components/LanguageControlButtons';
import rootReducer from './slices';
import Context from './context';

// Cookies.remove('nickname');

export default (dataFromServer) => {
  const { messages, channels, currentChannelId } = dataFromServer;
  const preloadedState = {
    messagesBox: {
      messages,
    },
    channelsBox: {
      channels,
      currentChannelId,
    },
  };
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
  });
  // ------------------------------------------------------------------------
  const io = socket();
  io.on('newMessage', ({ data }) => store.dispatch({ type: 'messagesBox/addMessage', payload: data }));
  io.on('newChannel', ({ data }) => store.dispatch({ type: 'channelsBox/addChannel', payload: data }));
  io.on('renameChannel', ({ data }) => store.dispatch({ type: 'channelsBox/renameChannel', payload: data }));
  io.on('removeChannel', ({ data }) => store.dispatch({ type: 'channelsBox/removeChannel', payload: data }));
  // ------------------------------------------------------------------------
  const nickname = Cookies.get('nickname');
  if (!nickname) store.dispatch({ type: 'modalWindows/openModal', payload: { type: 'identification', channelId: null } });
  render(
    <Context.Provider value={{ nickname }}>
      <Provider store={store}>
        <App />
      </Provider>
    </Context.Provider>,
    document.getElementById('chat'),
  );
  // ------------------------------------------------------------------------
  render(
    <Provider store={store}>
      <LanguageControlButtons />
    </Provider>,
    document.getElementById('lang-control'),
  );
};
